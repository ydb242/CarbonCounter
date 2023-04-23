import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import OrangeButton from "./OrangeButton";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <OrangeButton onClick={() => loginWithRedirect()} name="Login With Google"/>
};

export default LoginButton;