import { useState } from 'react';
import { Box, Stack, Card, CardContent, CardMedia, CardActions, Typography, Collapse, IconButton, Divider} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import MovieExternalReviews from './MovieExternalReviews';
import AddCommentIcon from '@mui/icons-material/AddComment';

import { useSelector, useDispatch } from 'react-redux';
import ReviewDialog from './ReviewDialog';
import { createMovieReview } from '../actions/movieActions';
import { useAuth } from '../context/AuthContext';
import { listMovieDetails } from '../actions/movieActions';
import { useEffect } from 'react';
import Review from './Review';
import MovieEdit from "../pages/MovieEdit";

const ExpandMore = styled((props) => {
  const { expand, text, ...other } = props;
  return (
    <Stack
      spacing={1}
      direction={'row'}
      alignItems={'center'}
      marginLeft={'auto'}
    >
      <Typography>{text}</Typography> <IconButton {...other} />
    </Stack>
  );
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Movie = ({ propMovie }) => {
  const dispatch = useDispatch();
  const { isAuthenticatedWithGoogle } = useAuth();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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

  const handleToggleEditDialog = () => {
    setIsEditDialogOpen(x => !x);
  };

  const handleToggleDeleteDialog = () => {
    setIsDeleteDialogOpen(x => !x);
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
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 800,
          marginBottom: '10px',
        }}
      >
        <Box
          sx={{
            flexDirection: 'row',
            display: 'flex',
            gap: '20px',
          }}
        >
          <CardMedia
            sx={{ height: 300, width: '30%', borderRadius: '4px' }}
            image={currentMovie.image}
            title={currentMovie.name}
            component='img'
          />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              width: '70%',
            }}
          >
            <Box sx={{ width: '60%', wordWrap: 'break-word' }}>
              <Typography gutterBottom variant='h5' component='div'>
                {currentMovie.name}
              </Typography>
              <Typography sx={{ textAlign: 'left' }} color='text.secondary'>
                {currentMovie.summary}
              </Typography>
            </Box>
            <Typography
              component='div'
              variant='body1'
              color='text.primary'
              sx={{
                textAlign: 'left',
                width: '40%',
              }}
            >
              <Box fontWeight='fontWeightBold'>
                Rating:
                <Typography display='inline'>
                  {' '}
                  {parseFloat(currentMovie.rating).toFixed(2)}
                </Typography>
              </Box>
              <Box fontWeight='fontWeightBold'>
                Genre:
                <Typography display='inline'> {currentMovie.genre}</Typography>
              </Box>
              <Box fontWeight='fontWeightBold'>
                Director:
                <Typography display='inline'>
                  {' '}
                  {currentMovie.director}
                </Typography>
              </Box>
              <Box fontWeight='fontWeightBold'>
                Writer:
                <Typography display='inline'> {currentMovie.writer}</Typography>
              </Box>
            </Typography>
          </CardContent>
        </Box>
        <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
          {userInfo && (
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <Typography>Add Review</Typography>
              <IconButton onClick={handleOpenReviewDialog}>
                <AddCommentIcon></AddCommentIcon>
              </IconButton>
            </Stack>
          )}
          <ExpandMore
            text='Expand To See Reviews'
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
          <IconButton onClick={handleToggleEditDialog}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleToggleDeleteDialog}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography
              display={!currentMovie.reviews.length ? 'none' : 'inherit'}
              variant='h5'
              fontWeight={'bold'}
              textAlign={'start'}
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
              className={!currentMovie.reviews.length ? 'display-none' : ''}
              sx={{ width: '100%' }}
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
