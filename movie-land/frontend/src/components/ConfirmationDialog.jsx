import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Paper, Typography, Box, Button } from "@mui/material";

import { deleteMovie } from "../actions/movieActions";
import Loader from "./Loader";
import Message from './Message';

const DeleteConfirmationDialog = ({ isOpen, close, movieId }) => {
    const dispatch = useDispatch();
    const movieDelete = useSelector((state) => state.movieDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
    } = movieDelete;

    const handleClick = () => {
        dispatch(deleteMovie(movieId));
        close();
    };

    const handleCancel = () => {
        close();
    };

    return (
        <Dialog open={isOpen} onClose={close}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant={'h6'}>{'Are you sure that you want to delete the movie?'}</Typography>
                <Box>
                    <Button onClick={handleClick}>{'Yes'}</Button>
                    <Button onClick={handleCancel}>{'No'}</Button>
                </Box>
                {loadingDelete && <Loader />}
                {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            </Paper>
        </Dialog>);
};

export default DeleteConfirmationDialog;