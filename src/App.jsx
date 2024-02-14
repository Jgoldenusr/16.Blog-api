import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Block from "./components/Block";
import Login from "./components/Login";
import Posts from "./components/Posts";
import Signup from "./components/Signup";
import SubmitPost from "./components/SubmitPost";
import ViewPost from "./components/ViewPost";
import Wrapper from "./components/Wrapper";

const App = () => {
  const deleteUsr = function (evt) {
    evt.preventDefault();
    setMyUsr(null);
    localStorage.removeItem("MyUsr");
  };

  const findUsr = function () {
    const foundUsr = localStorage.getItem("MyUsr");
    if (foundUsr) {
      return JSON.parse(foundUsr);
    } else {
      return null;
    }
  };

  const saveUsr = function (usr) {
    setMyUsr(usr);
    localStorage.setItem("MyUsr", JSON.stringify(usr));
  };

  const [myUsr, setMyUsr] = useState(findUsr());

  /* jshint ignore:start */
  return (
    <Auth.Provider value={{ myUsr, saveUsr, findUsr, deleteUsr }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Wrapper />}>
            <Route path="" element={<Posts />} exact />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path=":postId" element={<ViewPost />} />
          </Route>
          <Route element={<Wrapper />}>
            <Route element={<Block />}>
              <Route path="create" element={<SubmitPost />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Auth.Provider>
  );
  /* jshint ignore:end */
};

export default App;
