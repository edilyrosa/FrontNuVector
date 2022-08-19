import React from "react";
import "../stylies/LoaderStyle.css";

function Loader(props) {
  return (
    <div class="lds-ring">
      <br />
      <br />
      <br />
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
