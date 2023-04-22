import React from "react";

function getOptions(params) {
  var options = [];
  params.forEach((element) => {
    if (element.includes("Choose") || element.includes("Type")) {
      options.push(
        <option value="" disabled selected>
          {element}
        </option>
      );
    } else {
      options.push(<option value={element.toLowerCase()}>{element}</option>);
    }
  });
  return options;
}

export default function SelectComponent(props) {
  return (
    <div id={props.name}>
      {console.log("s", props.options[0],props.name)}
      <select
        id={props.name}
        style={{
          textAlignLast: "center",
          height: 50,
          borderRadius: 50,
          background: "#DEEEEC",
          width: 200,
          fontWeight: 700,
          marginBottom: 23,
        }}
        onChange={props.onSelect}
        name={props.name}
      >
        {getOptions(props.options)}
      </select>
    </div>
  );
}
