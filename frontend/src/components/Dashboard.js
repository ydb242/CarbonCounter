import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChartComp from "./ChartComp";
import Navbar from "./Navbar";
import OrangeButton from "./OrangeButton";
import SelectComponent from "./SelectComponent";
import addButton from "../images/add_button.png";
import { useAuth0 } from "@auth0/auth0-react";

var type = "";

export default function Dashboard() {
  const [label, setLabel] = useState([]);
  const [vals, setVals] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    console.log("after", user, isAuthenticated, isLoading);

    const fetchData = async () => {
      const data = await fetch(
        "http://54.224.229.31:5000/users/getTimeSeriesData?email=" + user.email
      );
      const json = await data.json();
      console.log("json",json,json['res']['a']);
      setLabel(json['res']['a'])
      setVals(json['res']['b'])
      // return json;
    };

    if (isAuthenticated) {
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
  }, [isAuthenticated]);
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
          margin: "50px 20px",
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
            Daily Limit : 100 pounds  
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
            Rewards Earned : 3,000
          </div>
        </div>
      </div>
      <ChartComp data={label} values={vals} />

      <Link to="/track">
        <img style={{ marginTop: 10 }} src={addButton} />
      </Link>
    </div>
  );
}
