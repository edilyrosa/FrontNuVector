import "../stylies/Home.css";
function Home({ notification }) {
  const numNotifications = 0;
  const getDateActual = () => {
    return new Date().toString().slice(4, 16);
  };
  return (
    <>
      <h1>Notifications and News.</h1>
      <p>
        {notification
          ? `Today is ${getDateActual()}, and you have ${numNotifications} Notificacion about your assests, please enter into "Our reports", and check the details.`
          : `Today is   ${getDateActual()}, and you have  ${numNotifications} Notificacions, evething is Ok!`}
      </p>
      <div className="ModalBackground">
        <br />
      </div>
      ;
    </>
  );
}
export default Home;

/*

import "../stylies/Home.css";
import React, { useState } from "react";

const initialNotifications = [];
function Home(props) {
  const [notifications, setNotifications] = useState(
    initialNotifications.length
  );
  const [msg, setMsg] = useState("");
  if (notifications === 0) {
    setMsg("evething is Ok!");
  } else {
    setNotifications(notifications);
    setMsg(
      "Notificacions about your proyects, please enter into 'Your reports', and check the details"
    );
  }
  const getDateActual = () => {
    return new Date().toString().slice(4, 16);
  };
  return (
    <>
      <h1>Notifications and news.</h1>
      <p>
        `Today is ${getDateActual()}, and you have ${notifications} ${msg}`
      </p>
      <div className="ModalBackground">
        <br />
      </div>
      ;
    </>
  );
}

export default Home;
*/
