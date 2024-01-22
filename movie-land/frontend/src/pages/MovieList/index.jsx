import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMovies } from '../../actions/movieActions';
import Movie from '../../components/Movie';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import MovieFilter from '../../components/MovieFilter';

const MovieList = () => {
  const dispatch = useDispatch();
  const movieList = useSelector(state => state.movieList);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const { loading, error, movies } = movieList;

  useEffect(() => {
    dispatch(listMovies(''));
  }, [dispatch]);

  useEffect(() => {
    setFilteredMovies(movieList.movies);
  }, [movieList]);

  const handleFilterChange = searchTerm => {
    const filtered =
      searchTerm === ''
        ? movies
        : movies?.filter(movie =>
          movie.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) || [];

    setFilteredMovies(filtered);
  };

  return (
    <>
      <MovieFilter onFilterChange={handleFilterChange} />
      {loading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        filteredMovies &&
        filteredMovies.map((movie, index) => (
          <Movie propMovie={movie} key={index} />
        ))
      )}
    </>
  );
};

export default MovieList;
