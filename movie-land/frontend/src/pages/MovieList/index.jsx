import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { listMovies } from "../../actions/movieActions";
import CircularProgress from "@mui/material/CircularProgress";

const MovieList = () => {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieList);
  const { loading, error, movies } = movieList;
  useEffect(() => {
    dispatch(listMovies(""));
  }, [dispatch]);

  return (
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
        movies.map((movie, index) => (
          <Card sx={{ display: "flex", height: 400, width: 800 }}>
            <CardMedia image={movie.image} title={movie.name} component="img" />
            <CardContent
              sx={{
                display: "flex",
                gap: "20px",
              }}
            >
              <div style={{ width: "60%" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.name}
                </Typography>
                <Typography sx={{ textAlign: "left" }} color="text.secondary">
                  {movie.summary}
                </Typography>
              </div>
              <Typography
                component="div"
                variant="body1"
                color="text.primary"
                sx={{
                  textAlign: "left",
                }}
              >
                <Box fontWeight="fontWeightBold">
                  Rating:
                  <Typography display="inline"> {movie.rating}</Typography>
                </Box>
                <Box fontWeight="fontWeightBold">
                  Genre:
                  <Typography display="inline"> {movie.genre}</Typography>
                </Box>
                <Box fontWeight="fontWeightBold">
                  Director:
                  <Typography display="inline"> {movie.director}</Typography>
                </Box>
                <Box fontWeight="fontWeightBold">
                  Writer:
                  <Typography display="inline"> {movie.writer}</Typography>
                </Box>
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default MovieList;
