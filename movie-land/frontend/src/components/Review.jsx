import { Box, Stack, Typography } from "@mui/material";
import StarRating from "./StarRating";

const Review = ({ userName, createAt, rating, content }) => {
  return (
    <Box sx={{ textAlign: "start" }}>
      <Stack spacing={1} direction={"row"} alignItems={"center"}>
        <Typography variant="h4">{userName} |</Typography>
        <Typography variant="h5">
          {new Date(createAt).toLocaleString()}
        </Typography>
      </Stack>
      <StarRating
        style={{ display: "flex", alignItems: "center" }}
        initialRating={rating}
        readOnly={true}
      />
      <Typography paragraph>
        {content.length <= 700 ? content : content.substr(0, 700) + "..."}
      </Typography>
    </Box>
  );
};

export default Review;
