import { Box, Typography } from "@mui/material";
import Movie from "../../components/Movie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMovies } from "../../actions/movieActions";
import CircularProgress from "@mui/material/CircularProgress";

const Home = () => {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieList);
  const { loading, error, movies } = movieList;
  useEffect(() => {
    dispatch(listMovies(""));
  }, []);

  return (
    <Box>
      <Typography variant={"h3"} sx={{ padding: "20px" }}>
        Movie List
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          movies.map((movie, index) => <Movie movie={movie} />)
        )}
      </Box>
    </Box>
  );
};

export default Home;
