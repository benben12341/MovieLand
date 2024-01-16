import { Box } from "@mui/material";
import LoginByGoogle from "../../components/LoginByGoogle";
import LogoutByGoogle from "../../components/LogoutByGoogle";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <LoginByGoogle />
      <LogoutByGoogle />
    </Box>
  );
};

export default Login;
