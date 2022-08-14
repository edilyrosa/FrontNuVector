import "../stylies/Home.css";

function Home({ notification }) {
  const getDateActual = () => {
    return new Date().toString().slice(4, 16);
  };
  return (
    <>
      <h1>Notifications and news.</h1>
      <p>
        {notification
          ? `Today is ${getDateActual()}, and you have ${notification} Notificacion about your assests, please enter into "Our reports", and check the details.`
          : `Today is   ${getDateActual()}, and you don't have Notificacion, evething is Ok!`}
      </p>
      <div className="ModalBackground">
        <br />
      </div>
      ;
    </>
  );
}

export default Home;
