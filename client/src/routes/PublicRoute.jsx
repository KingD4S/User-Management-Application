import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {

  const isAuthenticated =
    !!localStorage.getItem("loggedinUser");

  return isAuthenticated
    ? <Navigate to="/home" replace />
    : children;
};

export default PublicRoute;
