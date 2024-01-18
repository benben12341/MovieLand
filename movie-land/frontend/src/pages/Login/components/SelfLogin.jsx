import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Typography, Button } from '@mui/material';

import Message from '../../../components/Message';
import Loader from '../../../components/Loader';
import FormContainer from '../../../components/FormContainer';
import { login } from '../../../actions/userActions';
import { container, centeredContainer, inputContainer, submitButton } from './styles';

const SelfLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <FormContainer>
            {loading && <Loader />}
            <Box sx={container}>
                <Typography variant={'h6'}>{'Sign in with your credentials'}</Typography>
                <TextField sx={inputContainer} placeholder={'Email'} onChange={event => setEmail(event.target.value)}></TextField>
                <TextField sx={inputContainer} placeholder={'Password'} onChange={event => setPassword(event.target.value)}></TextField>
                <Button sx={submitButton} onClick={handleLogin}>{'Login'}</Button>
                {error && <Message variant={'alert-danger'}>{error}</Message>}
                <Box sx={centeredContainer}>
                    <Typography variant={'subtitle2'} >{'Don\'t have an account?'}</Typography>
                    <Link to='/register' >
                        <Typography variant={'subtitle2'} >{'Sign Up here'}</Typography>
                    </Link>
                </Box>
            </Box>
        </FormContainer>
    );
};

export default SelfLogin;
