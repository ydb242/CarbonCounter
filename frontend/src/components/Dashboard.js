import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChartComp from "./ChartComp";
import Navbar from "./Navbar";
import OrangeButton from "./OrangeButton";
import SelectComponent from "./SelectComponent";

var type = "";

export default function Dashboard() {
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
      <div
        style={{
          margin: "100px 20px 50px 20px",
          borderRadius: 30,
          padding: "50px 20px",
          background:
            "linear-gradient(180deg, rgba(17, 89, 118, 0.97) -3.55%, rgba(19, 77, 100, 0.81) 100%)",
        }}
      >
        <div
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: 32,
          }}
        >
          <div
            style={{
              height: 50,
              margin: "auto",
              background: "#DEEEEC",
              borderRadius: 50,
              color: "black",
              fontWeight: 700,
              fontSize: 18,
              lineHeight: "50px",
              letterSpacing: "0.11em",
            }}
          >
            Daily Limit : XXXXX
          </div>
          <br />
          <div
            style={{
              height: 50,
              margin: "auto",
              background: "#DEEEEC",
              borderRadius: 50,
              color: "black",
              fontWeight: 700,
              fontSize: 18,
              lineHeight: "50px",
              letterSpacing: "0.11em",
            }}
          >
            Rewards Earned : X
          </div>
        </div>
      </div>
      <ChartComp/>
    </div>
  );
}
