import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Auth from "./Auth";
import Errors from "./Errors";

function SubmitComment({ setViewModal }) {
  const [visible, setVisible] = useState(true);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState({
    text: "",
  });
  const navigateTo = useNavigate();
  const { myUsr } = useContext(Auth);
  const { postId } = useParams();

  const handleChange = function (evt) {
    setComment({ ...comment, [evt.target.id]: evt.target.value });
  };

  const handleSubmit = async function (evt) {
    evt.preventDefault();
    setLoading(true);
    setErr(null);

    const url = `http://localhost:3000/posts/${postId}/comments`;
    const req = {
      body: JSON.stringify(comment),
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
        navigateTo(0);
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
  const close = function () {
    setVisible(null);
    setViewModal(false);
  };

  /* jshint ignore:start */
  if (visible) {
    return (
      <div className="relative flex justify-center">
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="border border-gray-500 relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="my-2 text-center">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-800 dark:text-white"
                    id="modal-title"
                  >
                    Tipee su comentario
                  </h3>
                </div>
                <div className="mx-auto">
                  <div className="flex flex-wrap -m-2">
                    <div className="p-2 w-full">
                      <div className="relative">
                        <textarea
                          id="text"
                          name="text"
                          value={comment.text}
                          onChange={handleChange}
                          className="w-full bg-gray-200 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:flex sm:items-center sm:justify-end">
                <div className="sm:flex sm:items-center ">
                  <button
                    disabled={loading}
                    onClick={close}
                    className="w-full px-4 py-2 mt-2 me-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-red-600 rounded-md sm:w-auto sm:mt-0 hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40"
                  >
                    Cancelar
                  </button>
                  <button
                    disabled={loading}
                    onClick={handleSubmit}
                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    Comentar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {err ? <Errors err={err} /> : ""}
      </div>
    );
  }
  /* jshint ignore:end */
}

export default SubmitComment;
