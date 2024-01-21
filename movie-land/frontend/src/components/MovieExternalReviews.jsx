import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Review from "./Review";

const MovieExternalReviews = ({ movie }) => {
  const [externalReviews, setExternalReviews] = useState([]);
  const [movieId, setMovieId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = "9fb6637ddeead8c95f6b9d2c728ae2f6";

  useEffect(() => {
    const fetchMovieId = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie.name}`
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
  }, [movie]);

  useEffect(() => {
    const fetchExternalReviews = async () => {
      if (movieId) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
          );

          setExternalReviews(
            response.data.results.sort(
              (review1, review2) =>
                new Date(review2.created_at) - new Date(review1.created_at)
            )
          );
        } catch (error) {
          setError(
            error.message || "An error occurred while fetching reviews."
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchExternalReviews();
  }, [movieId]);

  return (
    <>
      <Typography
        paddingTop={"10px"}
        variant="h5"
        fontWeight={"bold"}
        textAlign={"start"}
      >
        MovieLand External Reviews
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        externalReviews.map((review) => (
          <li key={review.id}>
            <Review
              userName={review.author}
              content={review.content}
              rating={review.author_details.rating}
              createAt={review.created_at}
            ></Review>
          </li>
        ))
      )}
    </>
  );
};

export default MovieExternalReviews;
