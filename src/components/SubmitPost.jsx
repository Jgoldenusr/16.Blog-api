import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";
import Errors from "./Errors";

const SubmitPost = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    title: "",
    text: "",
  });
  const navigateTo = useNavigate();
  const { myUsr } = useContext(Auth);

  const handleChange = function (evt) {
    setPost({ ...post, [evt.target.id]: evt.target.value });
  };

  const handleSubmit = async function (evt) {
    evt.preventDefault();
    setLoading(true);
    setErr(null);

    const url = "http://localhost:3000/posts";
    const req = {
      body: JSON.stringify(post),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${myUsr.token}`,
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
            Crear nuevo post
          </h1>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="title"
                  className="leading-7 text-sm text-gray-200"
                >
                  Titulo del post
                </label>
                <input
                  required
                  type="text"
                  id="title"
                  name="title"
                  value={post.title}
                  onChange={handleChange}
                  className="w-full bg-gray-200 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="text"
                  className="leading-7 text-sm text-gray-200"
                >
                  Contenido del post
                </label>
                <textarea
                  id="text"
                  name="text"
                  value={post.text}
                  onChange={handleChange}
                  className="w-full bg-gray-200 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="flex mx-auto text-white bg-indigo-500 border-0 my-4 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Postear
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

export default SubmitPost;
