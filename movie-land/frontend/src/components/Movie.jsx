import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const Movie = ({ movie }) => {
  return (
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
  );
};

export default Movie;
