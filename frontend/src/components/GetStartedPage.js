import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "./Login";
import OrangeButton from "./OrangeButton";

const rectStyle = {
  width: 308,
  height: 273,
  margin: "100px auto",
  display: "inline-block",
  background:
    "linear-gradient(180deg, rgba(17, 89, 118, 0.97) -3.55%, rgba(19, 77, 100, 0.81) 100%)",
  boxShadow: "0 4px 80px rgba(0, 0, 0, 0.18)",
  borderRadius: 45,
};

const getstarted = {
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: 32,
  marginTop: 60,
  textAlign: "center",
  letterSpacing: " 0.07em",
  color: "#FFFFFF",
};

export default function GetStartedPage() {
  return (
    <div
      className="getStartedPage"
      style={{
        height: "100%",
        background:
          "linear-gradient(119.36deg, #ECFFFD 0%, rgba(236, 255, 253, 0.85) 100%)",
      }}
    >
      <div style={rectStyle}>
        <div style={getstarted}>Get Started</div>
        <div style={{marginTop:40}}>
          {/* <Link to="/track" style={{ textDecoration: "none" }}>
            <OrangeButton name="Google" />
          </Link> */}
          <LoginButton/>
        </div>
      </div>
    </div>
  );
}
