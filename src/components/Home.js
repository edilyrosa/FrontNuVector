import { useAuth } from "../context/AuthContext";
import "../stylies/Home.css";

function Home({ notification }) {
  const { logout, user } = useAuth();

  const numNotifications = 0;
  const getDateActual = () => {
    return new Date().toString().slice(4, 16);
  };

  console.log(user);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <br />
      <br />
      <div className="w-full max-w-xs m-auto text-black"></div>
      <div className="TextHome shadow-md rounded px-8 pt-6 mb-4">
        <h1>NOTIFICATIONS AND NEWS.</h1>
        <span className="text-xl mb-4">
          welcome {user.displayName || user.email}
        </span>
        <p className="tagP">
          {notification
            ? `Today is ${getDateActual()}, and you have ${numNotifications} Notification about your assests, please enter into "Our reports", and check the details.`
            : `Today is   ${getDateActual()}, and you have  ${numNotifications} Notifications, everything is Ok!`}
        </p>
        <button
          className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="ModalBackground"></div>
    </>
  );
}
export default Home;
