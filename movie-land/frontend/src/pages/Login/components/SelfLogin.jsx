import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    TextField,
    Typography,
    Button,
    CircularProgress,
} from "@mui/material";

import Message from "../../../components/Message";
import FormContainer from "../../../components/FormContainer";
import { login } from "../../../actions/userActions";
import {
    container,
    centeredContainer,
    inputContainer,
    submitButton,
} from "./styles";
import { useAuth } from "../../../context/AuthContext";

const SelfLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    const { setAuthenticatedWithGoogle } = useAuth();

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        setAuthenticatedWithGoogle(false);
    };

    return (
        <FormContainer>
            {loading ? (
                <CircularProgress />
            ) : (
                <Box sx={container}>
                    <Typography>{'Sign in with your credentials'}</Typography>
                    <TextField sx={inputContainer} placeholder={'Email'} onChange={event => setEmail(event.target.value)}></TextField>
                    <TextField sx={inputContainer} placeholder={'Password'} onChange={event => setPassword(event.target.value)}></TextField>
                    <Button sx={submitButton} onClick={handleLogin}>{'Login'}</Button>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Typography variant={'subtitle2'} >{'Don\'t have an account yet?'}</Typography>
                        <Link to="/register" >
                            <Typography variant={'subtitle2'} >{'Sign Up here'}</Typography>
                        </Link>
                    </Box>
                    {error && <Message variant="alert-danger">{error}</Message>}
                </Box>
            )}
        </FormContainer>
    );
};

export default SelfLogin;
