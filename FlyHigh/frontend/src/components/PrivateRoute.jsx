// src/components/PrivateRoute.js
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  // If not logged in, redirect to the login page
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
