import { Box, Typography, Fab, Tooltip } from "@mui/material";
import MovieList from "../MovieList";

const Home = () => {
  return (
    <Box>
      <Typography variant={"h3"} sx={{ padding: "20px" }}>
        Movie List
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <MovieList />
      </Box>
    </Box>
  );
};

export default Home;
