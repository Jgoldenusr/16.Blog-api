import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Errors from "./Errors";

const Signup = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    name: "",
    surname: "",
    password: "",
    password2: "",
    isWriter: true,
  });
  const navigateTo = useNavigate();

  const handleChange = function (evt) {
    setUser({ ...user, [evt.target.id]: evt.target.value });
  };

  const handleSubmit = async function (evt) {
    evt.preventDefault();
    setLoading(true);
    setErr(null);

    const url = "http://localhost:3000/users/signup";
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
            Registrese
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-400">
            ¿Ya tiene cuenta? <Link to="/login">Ingrese aqui</Link>
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
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
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-200"
                >
                  Primer nombre
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full bg-gray-200 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="surname"
                  className="leading-7 text-sm text-gray-200"
                >
                  Primer apellido
                </label>
                <input
                  required
                  type="text"
                  id="surname"
                  name="surname"
                  value={user.surname}
                  onChange={handleChange}
                  className="w-full bg-gray-200 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
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
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="password2"
                  className="leading-7 text-sm text-gray-200"
                >
                  Confirme su clave
                </label>
                <input
                  required
                  type="password"
                  id="password2"
                  name="password2"
                  value={user.password2}
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
                Registrarse
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

export default Signup;
