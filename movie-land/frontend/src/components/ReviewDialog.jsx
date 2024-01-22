import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import RatingStars from "./StarRating";

const useStyles = makeStyles((theme) => ({
  customDialog: {
    width: "100%",
    margin: "auto",
    "& .MuiPaper-root": {
      width: "100%",
    },
  },
}));

const ReviewDialog = ({ open, onClose, onSubmit }) => {
  const classes = useStyles();

  const [review, setReview] = useState("");
  const [starRate, setStarRate] = useState(0);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleDialogClose = () => {
    setReview("");
    onClose();
  };

  const handleFormSubmit = () => {
    onSubmit(starRate, review);
    handleDialogClose();
  };

  const handleRatingChange = (newRating) => {
    setStarRate(newRating);
  };

  return (
    <Dialog
      classes={{ paper: classes.customDialog }}
      open={open}
      onClose={handleDialogClose}
      maxWidth="sm"
    >
      <DialogTitle>Add a Review</DialogTitle>
      <DialogContent>
        <Box sx={{ paddingBottom: "20px" }}>
          <Typography fontWeight={"bold"}>Star Rating</Typography>
          <RatingStars
            readOnly={false}
            initialRating={0}
            onRatingChange={handleRatingChange}
          ></RatingStars>
        </Box>
        <Box>
          <Typography fontWeight={"bold"}>Review</Typography>
          <TextField
            autoFocus
            margin="dense"
            id="review"
            label="Your Review"
            type="text"
            multiline
            fullWidth
            rows={10}
            value={review}
            onChange={handleReviewChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDialog;
