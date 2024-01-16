import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import styled from "styled-components";

const StyledNavbar = styled.nav`
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
  return (
    <StyledNavbar>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <StyledLink to="/">
          <img src="\favicon.ico" alt="Logo" height={40} width={40} />
          <h1>MovieLand</h1>
        </StyledLink>
      </Box>
      <StyledLink to="/login">
        <h1>Sign In</h1>
      </StyledLink>
    </StyledNavbar>
  );
};

export default Navbar;
