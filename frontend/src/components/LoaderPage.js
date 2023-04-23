import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function LoaderPage() {
  
    const { user, isAuthenticated, isLoading } = useAuth0();


  const navigate = useNavigate()
  

  useEffect(() => {
    // async function makeRequest() {
    //   console.log("before");

    //   await delay(2000);

      console.log("after",user, isAuthenticated, isLoading);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      };

      fetch("http://54.224.229.31:5000/users/create", requestOptions).then(
        (response) => response.json()
      );
      if(isAuthenticated){
        navigate('/track')
      }
    

    // makeRequest();
  }, [isAuthenticated]);
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        "-ms-transform": "translateY(-50%)",
        transform: " translateY(-50%)",
        left: "40%",
      }}
    >
      <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
}
