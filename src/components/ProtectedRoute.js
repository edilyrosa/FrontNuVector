import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "../helpers/Loader";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}

export default ProtectedRoute;
