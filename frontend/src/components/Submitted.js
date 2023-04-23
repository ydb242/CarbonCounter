import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import OrangeButton from "./OrangeButton";
import SelectComponent from "./SelectComponent";

var type="";

export default function Submitted() {


  return (
    <div
      className="getStartedPage"
      style={{
        height: "100%",
        background:
          "linear-gradient(119.36deg, #ECFFFD 0%, rgba(236, 255, 253, 0.85) 100%)",
      }}
    >
      <Navbar />
      <div  style={{
          margin: "100px 20px",
          borderRadius: 50,
          padding: "50px 20px",
          background:
            "linear-gradient(180deg, rgba(17, 89, 118, 0.97) -3.55%, rgba(19, 77, 100, 0.81) 100%)",
        }}>
<div
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: 32,
            marginBottom: 50,
          }}
        >
          Submitted Successfully
        </div>
        <Link style={{textDecoration:"none"}} to="/track"><OrangeButton name="Track Another" /> </Link>:
      </div>
    </div>
  );
}
