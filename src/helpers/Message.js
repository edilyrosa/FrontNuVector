import React from "react";

function Message({ msj, bgColor }) {
  let style = {
    padding: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#fff",
    fontWeinght: "bold",
    backgroundColor: bgColor,
  };
  return (
    <div style={style}>
      <p>{msj}</p>
    </div>
  );
}

export default Message;
