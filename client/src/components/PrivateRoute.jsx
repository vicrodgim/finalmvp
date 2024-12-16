import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  // consume the context
  const { isLoggedIn } = useContext(AuthContext);

  // if the user is logged in, we render the component (aka go to that route)
  // if the user is not logged in, we redirect the user to the login page
  return isLoggedIn ? children : <Navigate to="/" />;
}
