import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Typography, Button } from '@mui/material';

import Message from '../../../components/Message';
import Loader from '../../../components/Loader';
import FormContainer from '../../../components/FormContainer';
import { register } from '../../../actions/userActions';
import { container, centeredContainer, inputContainer, submitButton } from './styles';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error } = userRegister;
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register(name, email, password));
            navigate('/');
        }
    };

    return (
        <FormContainer>
            {loading && <Loader />}
            <Box sx={container}>
                <Typography variant={'h6'}>{'Sign Up'}</Typography>
                <TextField sx={inputContainer} placeholder={'Name'} onChange={event => setName(event.target.value)}></TextField>
                <TextField sx={inputContainer} placeholder={'Email'} onChange={event => setEmail(event.target.value)}></TextField>
                <TextField sx={inputContainer} placeholder={'Password'} onChange={event => setPassword(event.target.value)}></TextField>
                <TextField sx={inputContainer} placeholder={'Confirm Password'} onChange={event => setConfirmPassword(event.target.value)}></TextField>
                <Button sx={submitButton} onClick={handleRegister}>{'Register'}</Button>
                {error && <Message variant={'alert-danger'}>{error}</Message>}
                {message && <Message variant={'alert-danger'}>{message}</Message>}
                <Box sx={centeredContainer}>
                    <Typography variant={'subtitle2'} >{'Already have an account?'}</Typography>
                    <Link to='/login' >
                        <Typography variant={'subtitle2'} >{'Sign In here'}</Typography>
                    </Link>
                </Box>
            </Box>
        </FormContainer>
    );
};

export default Register;