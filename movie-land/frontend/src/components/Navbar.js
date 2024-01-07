import { BiCameraMovie } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <BiCameraMovie size="40px" />
          <h1>MovieLand</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
