import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import OrangeButton from "./OrangeButton";
import SelectComponent from "./SelectComponent";

var type = "";
var data = {};
var current = "type";

export default function Track() {
  const [selectedValues, setSelectedValues] = useState([
    ["Type", "Transport", "Devices"],
  ]);
  const [val, setVal] = useState(0);

  function onSelect(params) {
    console.log(params, params.target.value);
    let newfield = [];
    switch (params.target.value) {
      case "devices":
        console.log("before devices", current);

        if (current != "type") {
            var arr = selectedValues;
            arr.splice(1, (selectedValues.length)-1);
            setSelectedValues(arr);
            console.log("change",selectedValues);
        }
          data = {};
          type = "devices";
          newfield = ["Choose a Device", "AC", "Phone", "Heater"];
          data["type"] = "devices";
          console.log(data);
        
        break;

      case "transport":
        console.log("before transport", current);
        if (current != "type") {
          var arr = selectedValues;
          arr.splice(1, (selectedValues.length)-1);

          // arr.splice(arr.length-1, 1);
          setSelectedValues(arr);
          console.log("change",selectedValues);

      }
          data = {};

          data["type"] = "transport";
          type = "transport";

          newfield = ["Choose a Vehicle", "Car", "Bus", "Flight"];
          console.log(data);
        break;

      case "car":
      case "bus":
      case "flight":
        data["vehicle"] = current;
        break;

      case "ac":
      case "phone":
      case "heater":
        data["devices"] = current;
        break;

      default:
        break;
    }
    current = params.target.value;

    console.log("after", current);
    setSelectedValues([...selectedValues, newfield]);
    console.log("change end",selectedValues);
    setVal(0);

    // current = params.target.value
  }

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

      <form
        style={{
          margin: "100px 20px",
          borderRadius: 50,
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
            marginBottom: 50,
          }}
        >
          Add Data
        </div>
        {selectedValues.map((input, index) => {
          if (input.length > 0) {
            return (
              <SelectComponent
                onSelect={onSelect}
                name={input[0]}
                options={input}
                id={input[0]}
              />
            );
          } else {
            console.log("type", type);
            if (type == "devices") {
              return (
                <div>
                  <label
                    style={{ color: "white", marginRight: 10, fontWeight: 700 }}
                  >
                    Hours
                  </label>
                  <input
                    style={{
                      borderRadius: 20,
                      height: 30,
                      border: "none",
                      marginBottom: 20,
                      paddingLeft: 10,
                    }}
                    onChange={(e) => setVal(e.target.value)}
                    type="number"
                  />
                </div>
              );
            } else if (type == "transport") {
              return (
                <div>
                  <label
                    style={{ color: "white", marginRight: 10, fontWeight: 700 }}
                  >
                    Miles
                  </label>
                  <input
                    style={{
                      borderRadius: 20,
                      height: 30,
                      border: "none",
                      marginBottom: 20,
                      paddingLeft: 10,
                    }}
                    onChange={(e) => setVal(e.target.value)}
                    type="number"
                  />
                </div>
              );
            }
          }
        })}
        {val > 0 ? (
          <Link style={{ textDecoration: "none" }} to="/submitted">
            <OrangeButton
              name="Submit"
              onClick={(e) => {
                data["usage"] = parseFloat(val);
                console.log(data);
              }}
            />{" "}
          </Link>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}
