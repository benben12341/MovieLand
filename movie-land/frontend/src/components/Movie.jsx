import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import MovieReviews from "./MovieReviews";

const ExpandMore = styled((props) => {
  const { expand, text, ...other } = props;
  return (
    <Stack spacing={1} direction={"row"} alignItems={"center"}>
      <Typography>{text}</Typography> <IconButton {...other} />
    </Stack>
  );
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Movie = ({ movie }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ display: "flex", flexDirection: "column", width: 800 }}>
      <Box
        sx={{
          flexDirection: "row",
          display: "flex",
          gap: "20px",
        }}
      >
        <CardMedia
          sx={{ height: 300, width: 300, borderRadius: "4px" }}
          image={movie.image}
          title={movie.name}
          component="img"
        />
        <CardContent
          sx={{ display: "flex", flexDirection: "row", gap: "20px" }}
        >
          <Box sx={{ width: "60%" }}>
            <Typography gutterBottom variant="h5" component="div">
              {movie.name}
            </Typography>
            <Typography sx={{ textAlign: "left" }} color="text.secondary">
              {movie.summary}
            </Typography>
          </Box>
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
      </Box>
      <CardActions disableSpacing sx={{ justifyContent: "end" }}>
        <ExpandMore
          text="Expand To Reviews"
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <MovieReviews movieTitle={movie.name} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Movie;
