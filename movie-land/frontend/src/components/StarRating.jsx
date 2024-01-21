import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Box from "@mui/material/Box";

const StarRating = ({ initialRating, onRatingChange, readOnly }) => {
  const [rating, setRating] = useState(initialRating || 0);

  const handleStarClick = (value) => {
    if (!readOnly) {
      setRating(value);
      onRatingChange(value);
    }
  };

  const renderStar = (value, index) => {
    const filled = value <= rating;

    return (
      <span
        key={index}
        onClick={() => handleStarClick(value)}
        style={{
          cursor: readOnly ? "default" : "pointer",
        }}
      >
        {filled ? (
          <StarIcon style={{ fill: "#FFD700" }} />
        ) : (
          <StarBorderIcon color="primary" />
        )}
      </span>
    );
  };

  return (
    <Box>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) =>
        renderStar(value, index)
      )}
    </Box>
  );
};

export default StarRating;
