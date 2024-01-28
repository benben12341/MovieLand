import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMovies } from '../../actions/movieActions';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  CircularProgress,
} from '@mui/material';
import MovieFilter from '../../components/MovieFilter';
import Movie from '../../components/Movie';

const MovieList = () => {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieList);
  const { loading, movies } = movieList;
  const movieDelete = useSelector((state) => state.movieDelete);
  const { success: successDelete } = movieDelete;

  const [isMineMovies, setIsMineMovies] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listMovies(''));
  }, [dispatch]);

  const handleFilterChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleChange = ({ target: { checked } }) => {
    setIsMineMovies(checked);
  };

  const filterBySearchTerm = movies =>
    movies?.filter(movie =>
      movie?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filterMyMovies = (movies) =>
    isMineMovies
      ? movies?.filter(movie => movie.createdBy === userInfo.id)
      : movies;

  const displayMovies = filterBySearchTerm(filterMyMovies(movies));

  useEffect(() => {
    successDelete && dispatch(listMovies(''));
  }, [successDelete]);

  return (
    <>
      <Stack
        direction={'row'}
        spacing={1}
        width='100%'
        justifyContent={'center'}
      >
        <MovieFilter onFilterChange={handleFilterChange} />
        {userInfo && (
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} checked={isMineMovies} />
            }
            label='my movies'
          />
        )}
      </Stack>
      {loading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        displayMovies &&
        displayMovies.map((movie, index) => (
          <Movie propMovie={movie} key={index} />
        ))
      )}
    </>
  );
};

export default MovieList;
