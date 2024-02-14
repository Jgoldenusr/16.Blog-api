import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "./Auth";
import Errors from "./Errors";

const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigateTo = useNavigate();
  const { saveUsr } = useContext(Auth);

  const handleChange = function (evt) {
    setUser({ ...user, [evt.target.id]: evt.target.value });
  };

  const handleSubmit = async function (evt) {
    evt.preventDefault();
    setLoading(true);
    setErr(null);

    const url = "http://localhost:3000/users/login";
    const req = {
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      method: "POST",
      mode: "cors",
    };

    try {
      const res = await fetch(url, req);
      if (res.ok) {
        const json = await res.json();
        saveUsr(json);
        navigateTo("/", { replace: true });
      } else {
        const json = await res.json();
        setErr(json.error);
      }
    } catch (err) {
      setErr(err);
    } finally {
      setLoading(false);
    }
  };
  /* jshint ignore:start */
  return (
    <div className="text-gray-600 body-font relative">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-200">
            Ingresar
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-400">
            ¿No tiene cuenta? <Link to="/signup">Registrese aqui</Link>
          </p>
        </div>
        <div className="lg:w-1/4 md:w-1/4 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="username"
                  className="leading-7 text-sm text-gray-200"
                >
                  Nombre de usuario
                </label>
                <input
                  required
                  type="text"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  className="w-full bg-gray-200 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-200"
                >
                  Clave
                </label>
                <input
                  required
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full bg-gray-200 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="flex mx-auto text-white bg-indigo-500 border-0 my-4 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </div>
      {err ? <Errors err={err} /> : ""}
    </div>
  );
  /* jshint ignore:end */
};

export default Login;
