import React from 'react'


const buttonStyle={

    boxSizing: "border-box",    
    padding: "20px 60px",
    gap: "10px",
    alignItems: "center",
    margin:"auto",
    color:"white",
    background: "#EA5A42",
    borderRadius: "20px",
    width:"fit-content",
    fontWeight:700
}

export default function OrangeButton(props) {
  return (
    <div style={buttonStyle} onClick={props.onClick}>{props.name}</div>
  )
}
