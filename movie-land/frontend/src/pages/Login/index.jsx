import { Box, Divider } from "@mui/material";
import LoginByGoogle from "../../components/LoginByGoogle";
import LogoutByGoogle from "../../components/LogoutByGoogle";

import SelfLogin from "./components/SelfLogin";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: 'center',
        gap: "20px",
      }}
    >
      <SelfLogin />
      <Divider sx={{ width: '100%' }} />
      <LoginByGoogle />
      <LogoutByGoogle />
    </Box>
  );
};

export default Login;
