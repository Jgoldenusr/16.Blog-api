//Componentes de react y react router
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "./Error";
import Spinner from "./Spinner";

function Posts() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const url = "http://localhost:3000/posts";
      const req = {
        mode: "cors",
      };

      try {
        const res = await fetch(url, req);
        if (res.ok) {
          const json = await res.json();
          setPosts(json);
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
    fetchPosts();
  }, []);

  /* jshint ignore:start */
  return loading ? (
    <Spinner />
  ) : err ? (
    <Error />
  ) : (
    <div className="body-font text-gray-600">
      <div className="container mx-auto px-5 py-10">
        <div className="flex flex-col -m-4 md:flex-wrap md:flex-row">
          {posts.map((post) => {
            return (
              <div className="p-4 lg:w-1/3" key={post.id}>
                <div className="bg-gray-100 h-full overflow-hidden pt-16 pb-16 px-8 relative rounded-lg text-center">
                  <h2 className="font-medium mb-1 text-gray-400 text-xs title-font tracking-widest">
                    {`Posteado por ${
                      post.user.name + " " + post.user.surname
                    } el ${post.dateFormatted}`}
                  </h2>
                  <h1 className="font-medium mb-3 text-gray-900 text-xl title-font sm:text-2xl">
                    {post.title}
                  </h1>
                  <p className="leading-relaxed mb-3">{post.text}</p>
                  <Link
                    to={"/" + post._id}
                    aria-label="Ver mas"
                    className="inline-flex items-center no-deco text-indigo-500"
                  >
                    Ver mas
                    <svg
                      className="h-4 ml-2 w-4"
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
                  </Link>
                  <div className="absolute bottom-0 flex justify-center leading-none left-0 mt-2 py-4 text-center w-full">
                    <span className="inline-flex items-center leading-none text-gray-400 text-sm">
                      <svg
                        className="h-4 mr-1 w-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      {post.comments.length}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  /* jshint ignore:end */
}

export default Posts;
