import GoogleLogin from "react-google-login";

const clientId =
  "640622037841-rmcrulj2s0ecud57vip8rvk9fjrfs225.apps.googleusercontent.com";

const LoginByGoogle = () => {
  const onSuccess = (result) => {
    console.log("Login Success!, Current User: ", result.profileObj);
  };

  const onFailure = (result) => {
    console.log("Login Failed!, Result: ", result);
  };

  return (
    <div className="signInButton">
      <GoogleLogin
        buttonText="Google Login"
        clientId={clientId}
        offline={true}
        onFailure={onFailure}
        onSuccess={onSuccess}
        uxMode="redirect"
      />
    </div>
  );
};

export default LoginByGoogle;
