//Componentes de react y react router
import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Auth from "./Auth";

function Wrapper() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { deleteUsr, myUsr } = useContext(Auth);

  return (
    /* jshint ignore:start */
    <div className="bg-gray-900 min-h-screen w-screen">
      <div className="bg-gray-900">
        <div className="mx-auto px-4 py-5 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
          <div className="flex items-center justify-between relative">
            <a
              href="/"
              aria-label="TOP Blog-API"
              title="TOP Blog-API"
              className="inline-flex items-center"
            >
              <svg
                className="text-teal-accent-400 w-8"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                stroke="currentColor"
                fill="none"
              >
                <rect x="3" y="1" width="7" height="12" />
                <rect x="3" y="17" width="7" height="6" />
                <rect x="14" y="1" width="7" height="6" />
                <rect x="14" y="11" width="7" height="12" />
              </svg>
              <span className="font-bold ml-2 text-gray-100 text-xl tracking-wide">
                TOP Blog-API
              </span>
            </a>
            <ul className="flex items-center hidden space-x-8 lg:flex">
              <li>
                <Link
                  to="/"
                  aria-label="Inicio"
                  className="duration-200 font-medium no-deco text-gray-100 tracking-wide transition-colors hover:text-teal-accent-400"
                >
                  Inicio
                </Link>
              </li>
              {!myUsr && (
                <>
                  {" "}
                  <li>
                    <Link
                      to="/login"
                      aria-label="Ingresar"
                      className="duration-200 font-medium no-deco text-gray-100 tracking-wide transition-colors hover:text-teal-accent-400"
                    >
                      Ingresar
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      aria-label="Registrarse"
                      className="duration-200 font-medium no-deco text-gray-100 tracking-wide transition-colors hover:text-teal-accent-400"
                    >
                      Registrarse
                    </Link>
                  </li>
                </>
              )}
              {myUsr && (
                <>
                  <li>
                    <Link
                      to="/create"
                      aria-label="Postear"
                      className="duration-200 font-medium no-deco text-gray-100 tracking-wide transition-colors hover:text-teal-accent-400"
                    >
                      Postear
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={deleteUsr}
                      aria-label="Salir"
                      className="bg-red-500 border-0 flex font-medium py-2 px-6 mx-auto text-white focus:outline-none hover:bg-red-600 hover:text-white rounded"
                    >
                      Salir
                    </button>
                  </li>
                </>
              )}
            </ul>
            <div className="lg:hidden">
              <button
                aria-label="Open Menu"
                title="Open Menu"
                className="duration-200 -mr-1 p-2 rounded transition focus:outline-none focus:shadow-outline"
                onClick={() => setIsMenuOpen(true)}
              >
                <svg className="text-gray-100 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                  />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute left-0 top-0 w-full z-50">
                  <div className="bg-gray-900 border border-gray-500 p-5 rounded shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <a
                          href="/"
                          aria-label="TOP Blog-API"
                          title="TOP Blog-API"
                          className="inline-flex items-center"
                        >
                          <svg
                            className="text-deep-purple-accent-400 w-8"
                            viewBox="0 0 24 24"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            stroke="currentColor"
                            fill="none"
                          >
                            <rect x="3" y="1" width="7" height="12" />
                            <rect x="3" y="17" width="7" height="6" />
                            <rect x="14" y="1" width="7" height="6" />
                            <rect x="14" y="11" width="7" height="12" />
                          </svg>
                          <span className="font-bold ml-2 text-gray-100 text-xl tracking-wide">
                            TOP Blog-API
                          </span>
                        </a>
                      </div>
                      <div>
                        <button
                          aria-label="Close Menu"
                          title="Close Menu"
                          className="duration-200 -mt-2 -mr-2 p-2 rounded transition focus:bg-gray-900 focus:outline-none focus:shadow-outline hover:bg-gray-900"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <svg
                            className="text-gray-100 w-5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <nav>
                      <ul className="space-y-4">
                        <li>
                          <Link
                            to="/"
                            aria-label="Inicio"
                            className="duration-200 font-medium no-deco text-gray-100 tracking-wide transition-colors hover:text-deep-purple-accent-400"
                          >
                            Inicio
                          </Link>
                        </li>
                        {!myUsr && (
                          <>
                            <li>
                              <Link
                                to="/login"
                                aria-label="Ingresar"
                                className="duration-200 font-medium no-deco text-gray-100 tracking-wide transition-colors hover:text-deep-purple-accent-400"
                              >
                                Ingresar
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/signup"
                                aria-label="Registrarse"
                                className="duration-200 font-medium no-deco text-gray-100 tracking-wide transition-colors hover:text-deep-purple-accent-400"
                              >
                                Registrarse
                              </Link>
                            </li>
                          </>
                        )}
                        {myUsr && (
                          <>
                            {" "}
                            <li>
                              <Link
                                to="/create"
                                aria-label="Postear"
                                className="duration-200 font-medium no-deco text-gray-100 tracking-wide transition-colors hover:text-deep-purple-accent-400"
                              >
                                Postear
                              </Link>
                            </li>
                            <li>
                              <button
                                aria-label="Salir"
                                onClick={deleteUsr}
                                className="duration-200 bg-red-500 border-0 font-medium inline-flex items-center justify-center py-2 px-6 rounded text-white transition w-full focus:outline-none hover:bg-red-600 hover:text-white"
                              >
                                Salir
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
    /* jshint ignore:end */
  );
}

export default Wrapper;
