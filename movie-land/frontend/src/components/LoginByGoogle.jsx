import GoogleLogin from "react-google-login";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin } from "../actions/userActions";
import { useAuth } from "../context/AuthContext";

const clientId =
  "640622037841-rmcrulj2s0ecud57vip8rvk9fjrfs225.apps.googleusercontent.com";

const LoginByGoogle = () => {
  const { isAuthenticatedWithGoogle, setAuthenticatedWithGoogle } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const onFailure = (result) => {
    console.log("Login Failed!, Result: ", result);
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleLogin = async (response) => {
    const { tokenId } = response;
    dispatch(googleLogin(tokenId));
    setAuthenticatedWithGoogle(true);
  };

  return (
    <div className="signInButton">
      <GoogleLogin
        buttonText="Google Login"
        clientId={clientId}
        offline={true}
        onFailure={onFailure}
        onSuccess={handleLogin}
      />
    </div>
  );
};

export default LoginByGoogle;
