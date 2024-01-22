import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import LogoutByGoogle from "./LogoutByGoogle";
import { useAuth } from "../context/AuthContext";

const StyledNavbar = styled.nav`
  z-index: 999;
  padding: 20px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  border-bottom: 5px solid #f2f2f2;
  border-radius: 0 0 15px 15px;
  background-color: rgb(30, 153, 139);
  position: sticky;
  top: 0;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  h1 {
    color: #ffffff;
  }
  margin-left: 16px;
  text-decoration: none;
  padding: 6px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { isAuthenticatedWithGoogle } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <StyledNavbar>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <StyledLink to="/">
          <img src="\favicon.ico" alt="Logo" height={40} width={40} />
          <h1>MovieLand</h1>
        </StyledLink>
      </Box>
      {userInfo ? (
        <>
        <StyledLink to="/profile" style={{paddingLeft: '70%'}}>
            <h1>Profile</h1>
          </StyledLink>
          <Button
            sx={{
              backgroundColor: isAuthenticatedWithGoogle ? "unset" : "#f99f0e",
              color: "white",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: isAuthenticatedWithGoogle ? "unset" : "#ab7216",
              },
            }}
            onClick={handleLogout}
          >
            {isAuthenticatedWithGoogle ? <LogoutByGoogle /> : "Logout"}
          </Button>
        </>
      ) : (
        <StyledLink to="/login">
          <Button
            sx={{
              backgroundColor: "#f99f0e",
              color: "white",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#ab7216",
              },
            }}
          >
            Sign In
          </Button>
        </StyledLink>
      )}
    </StyledNavbar>
  );
};

export default Navbar;