//Componentes de react y react router
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Auth from "./Auth";
import Error from "./Error";
import Spinner from "./Spinner";
import SubmitComment from "./SubmitComment";

function ViewPost() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const { postId } = useParams();
  const { myUsr } = useContext(Auth);

  useEffect(() => {
    async function fetchPost() {
      const url = `http://localhost:3000/posts/${postId}`;
      const req = {
        mode: "cors",
      };

      try {
        const res = await fetch(url, req);
        if (res.ok) {
          const json = await res.json();
          setPost(json);
        } else {
          const json = await res.json();
          setErr(json.error);
        }
      } catch (reqError) {
        setErr(reqError);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, []);

  const showModal = function () {
    if (myUsr) {
      setViewModal(true);
    }
  };

  /* jshint ignore:start */
  return loading ? (
    <Spinner />
  ) : err ? (
    <Error err={err} />
  ) : (
    <div className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-10 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-400">
          <div className="py-8 flex flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 me-5 flex-shrink-0 flex flex-col">
              <span className="font-semibold title-font text-indigo-600">
                POST
              </span>
              <span className="mt-1 text-gray-500 text-sm">
                {post.dateFormatted}
              </span>
            </div>
            <div className="md:flex-grow">
              <h2 className="text-2xl font-medium text-gray-200 title-font mb-2">
                {post.title}
              </h2>
              <p className="leading-relaxed text-gray-400">{post.text}</p>
              <button
                onClick={showModal}
                className="bg-transparent text-indigo-500 inline-flex items-center mt-4"
              >
                Comentar
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
          {post.comments.map((comment) => (
            <div
              className="py-8 flex flex-wrap md:flex-nowrap"
              key={comment._id}
            >
              <div className="md:w-64 md:mb-0 mb-6 me-5 flex-shrink-0 flex flex-col">
                <span className="font-semibold title-font text-indigo-600">
                  COMENTARIO
                </span>
                <span className="mt-1 text-gray-500 text-sm">
                  {comment.dateFormatted}
                </span>
              </div>
              <div className="md:flex-grow">
                <h4 className="text-sm font-medium text-gray-200 title-font mb-2">
                  {`AUTOR: ${comment.user.name + " " + comment.user.surname}`}
                </h4>
                <p className="leading-relaxed text-gray-400">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {viewModal && <SubmitComment setViewModal={setViewModal} />}
    </div>
  );
  /* jshint ignore:end */
}
export default ViewPost;
