import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, Divider, Stack } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import MovieExternalReviews from "./MovieExternalReviews";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReviewDialog from "./ReviewDialog";
import { createMovieReview } from "../actions/movieActions";
import { useAuth } from "../context/AuthContext";
import { listMovieDetails } from "../actions/movieActions";
import { useEffect } from "react";
import Review from "./Review";

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

const Movie = ({ propMovie }) => {
  const dispatch = useDispatch();
  const { isAuthenticatedWithGoogle } = useAuth();

  const [currentMovie, setCurrentMovie] = useState(propMovie);
  const [expanded, setExpanded] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [movieIdToUpdate, setMovieIdToUpdate] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const movieCreateReview = useSelector((state) => state.movieCreateReview);
  const { success: successMovieReview } = movieCreateReview;

  const movieDetails = useSelector((state) => state.movieDetails);
  const { movie } = movieDetails;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenReviewDialog = () => {
    setReviewDialogOpen(true);
  };

  const handleCloseReviewDialog = () => {
    setReviewDialogOpen(false);
  };

  useEffect(() => {
    setCurrentMovie(propMovie);
  }, [propMovie]);

  useEffect(() => {
    if (
      expanded ||
      (successMovieReview && currentMovie._id === movieIdToUpdate)
    ) {
      dispatch(listMovieDetails(currentMovie._id));
    }
  }, [dispatch, successMovieReview, expanded]);

  useEffect(() => {
    if (movie) {
      if (currentMovie._id === movie._id) {
        setCurrentMovie(movie);
      }
    }
  }, [movie]);

  const handleReviewSubmit = async (starRate, review) => {
    dispatch(
      createMovieReview(
        currentMovie._id,
        { rating: starRate, comment: review },
        isAuthenticatedWithGoogle
      )
    );
    setMovieIdToUpdate(currentMovie._id);
    handleCloseReviewDialog();
  };

  return (
    <>
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
            image={currentMovie.image}
            title={currentMovie.name}
            component="img"
          />
          <CardContent
            sx={{ display: "flex", flexDirection: "row", gap: "20px" }}
          >
            <Box sx={{ width: "60%" }}>
              <Typography gutterBottom variant="h5" component="div">
                {currentMovie.name}
              </Typography>
              <Typography sx={{ textAlign: "left" }} color="text.secondary">
                {currentMovie.summary}
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
                <Typography display="inline"> {currentMovie.rating}</Typography>
              </Box>
              <Box fontWeight="fontWeightBold">
                Genre:
                <Typography display="inline"> {currentMovie.genre}</Typography>
              </Box>
              <Box fontWeight="fontWeightBold">
                Director:
                <Typography display="inline">
                  {" "}
                  {currentMovie.director}
                </Typography>
              </Box>
              <Box fontWeight="fontWeightBold">
                Writer:
                <Typography display="inline"> {currentMovie.writer}</Typography>
              </Box>
            </Typography>
          </CardContent>
        </Box>
        <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
          {userInfo && (
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Typography>Add Review</Typography>
              <IconButton onClick={handleOpenReviewDialog}>
                <AddCommentIcon></AddCommentIcon>
              </IconButton>
            </Stack>
          )}
          <ExpandMore
            text="Expand To See Reviews"
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
            <Typography
              display={!currentMovie.reviews.length ? "none" : "inherit"}
              variant="h5"
              fontWeight={"bold"}
              textAlign={"start"}
            >
              MovieLand Users Reviews
            </Typography>
            {currentMovie.reviews.map((review) => (
              <li key={review._id}>
                <Review
                  userName={review.user.name}
                  content={review.comment}
                  createAt={review.createdAt}
                  rating={review.rating}
                />
              </li>
            ))}
            <Divider
              className={!currentMovie.reviews.length ? "display-none" : ""}
              sx={{ width: "100%" }}
            />
            <MovieExternalReviews movie={currentMovie} />
          </CardContent>
        </Collapse>
      </Card>
      <ReviewDialog
        open={reviewDialogOpen}
        onClose={handleCloseReviewDialog}
        onSubmit={handleReviewSubmit}
      />
    </>
  );
};

export default Movie;
