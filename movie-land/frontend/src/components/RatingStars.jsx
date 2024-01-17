import styled from "@emotion/styled";
import React from "react";

const StyledStart = styled.span`
  font-size: x-large;
  &.filled {
    color: gold;
  }
  &.empty {
    color: lightgray;
  }
`;

const RatingStars = ({ rating }) => {
  const MAX_STARS = 10;

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= MAX_STARS; i++) {
      stars.push(
        <StyledStart key={i} className={`${i <= rating ? "filled" : "empty"}`}>
          ★
        </StyledStart>
      );
    }

    return stars;
  };

  return <div className="rating-stars">{renderStars()}</div>;
};

export default RatingStars;
