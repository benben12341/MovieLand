import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import RatingStars from "./RatingStars";

const MovieReviews = ({ movieTitle }) => {
  const [reviews, setReviews] = useState([]);
  const [movieId, setMovieId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = "9fb6637ddeead8c95f6b9d2c728ae2f6";

  useEffect(() => {
    const fetchMovieId = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}`
        );
        const firstResult = response.data.results[0];
        if (firstResult) {
          setMovieId(firstResult.id);
        } else {
          setError("No movie found with that title.");
        }
      } catch (error) {
        setError(
          error.message || "An error occurred while fetching the movie ID."
        );
      }
    };

    fetchMovieId();
  }, [movieTitle]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (movieId) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
          );

          setReviews(response.data.results);
        } catch (error) {
          setError(
            error.message || "An error occurred while fetching reviews."
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <>
      <Typography variant="h5" fontWeight={"bold"} textAlign={"start"}>
        Movie Reviews
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        reviews.map((review) => (
          <li key={review.id}>
            <Box sx={{ textAlign: "start" }}>
              <Stack spacing={1} direction={"row"} alignItems={"center"}>
                <Typography variant="h4">{review.author} |</Typography>
                <Typography variant="h5">
                  {new Date(review.created_at).toLocaleString()}
                </Typography>
              </Stack>
              <RatingStars
                style={{ display: "flex", alignItems: "center" }}
                rating={review.author_details.rating}
              />
              <Typography paragraph>
                {review.content.length <= 700
                  ? review.content
                  : review.content.substr(0, 700) + "..."}
              </Typography>
            </Box>
          </li>
        ))
      )}
    </>
  );
};

export default MovieReviews;
