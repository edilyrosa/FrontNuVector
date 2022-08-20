import React from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "../helpers/Loader";

const ProtectedComponent = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) return null;
  return <>{children}</>;
};

export default ProtectedComponent;
