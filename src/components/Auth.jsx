import { createContext } from "react";

const Auth = createContext({
  myUsr: null,
  deleteUsr: () => {},
  findUsr: () => {},
  saveUsr: () => {},
});

export default Auth;
