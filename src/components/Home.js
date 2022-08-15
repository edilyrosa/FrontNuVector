import "../stylies/Home.css";
function Home({ notification }) {
  const numNotifications = 0;
  const getDateActual = () => {
    return new Date().toString().slice(4, 16);
  };
  return (
    <>
      <div className="TextHome">
        <h1>NOTIFICATIONS AND NEW.</h1>
        <p>
          {notification
            ? `Today is ${getDateActual()}, and you have ${numNotifications} Notificacion about your assests, please enter into "Our reports", and check the details.`
            : `Today is   ${getDateActual()}, and you have  ${numNotifications} Notificacions, evething is Ok!`}
        </p>
      </div>
      <div className="ModalBackground">
        <br />
      </div>
      ;
    </>
  );
}
export default Home;
