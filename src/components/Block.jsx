import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Auth from "./Auth";
import Error from "./Error";

function Block() {
  const { myUsr } = useContext(Auth);
  /* jshint ignore:start */
  if (!myUsr) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
  /* jshint ignore:end */

  /*
   */
}

export default Block;
