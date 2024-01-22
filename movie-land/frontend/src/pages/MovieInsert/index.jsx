import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Paper, Grid, Typography } from '@mui/material';

import GenresSelect from './components/GenresSelect';
import ImageInput from './components/ImageInput';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { MOVIE_CREATE_RESET } from '../../constants/movieConstants';
import { createMovie } from '../../actions/movieActions';

const Movie = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const movieCreate = useSelector((state) => state.movieCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, movie: createdMovie } = movieCreate;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [inputs, setInputs] = useState({
        name: '',
        image: null,
        summary: '',
        genre: '',
        director: '',
        writer: '',
    });

    const { name, director, writer, summary, genre } = inputs;

    const onChange = (event, fieldName) => {
        setInputs({ ...inputs, [fieldName]: event.target.value });
    };

    const handleImageChange = (image) => {
        setInputs({ ...inputs, ['image']: image });
    };

    const handleSubmit = () => {
        dispatch(createMovie(inputs));
    };

    useEffect(() => {
        console.log({userInfo});
        if (!userInfo) navigate('/');

        dispatch({ type: MOVIE_CREATE_RESET });
        if (successCreate) navigate('/');
        // if (successCreate)
            // navigate(`/movie/${createdMovie._id}/edit`);
    }, [dispatch, userInfo, navigate, successCreate, createdMovie]);

    return (
        <Container>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant={'h5'} sx={{ marginBottom: '10px' }}>Movie Details</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth label={'Movie Name'} value={name} onChange={(event) => onChange(event, 'name')} variant={'outlined'} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label={'Director'} value={director} onChange={event => onChange(event, 'director')} variant={'outlined'} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label={'Writer'} value={writer} onChange={event => onChange(event, 'writer')} variant={'outlined'} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label={'Summary'} multiline rows={4} value={summary} onChange={event => onChange(event, 'summary')} variant={'outlined'} />
                    </Grid>
                    <Grid item xs={12}>
                        <GenresSelect value={genre} onChange={event => onChange(event, 'genre')} />
                    </Grid>
                    <Grid item xs={12}>
                        <ImageInput onChange={handleImageChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant={'contained'} color={'primary'} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        </Container>
    );
};

export default Movie;
