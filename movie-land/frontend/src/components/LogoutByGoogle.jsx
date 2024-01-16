import { GoogleLogout } from "react-google-login";

const clientId =
  "640622037841-rmcrulj2s0ecud57vip8rvk9fjrfs225.apps.googleusercontent.com";

const LogoutByGoogle = () => {
  const onLogoutSuccess = (result) => {
    console.log("Logout Success!");
  };

  return (
    <div className="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText={"Google Logout"}
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
  );
};

export default LogoutByGoogle;
