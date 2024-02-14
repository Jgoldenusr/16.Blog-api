import { useState } from "react";
import { Link } from "react-router-dom";

function Errors({ err }) {
  const [visible, setVisible] = useState(err);

  const close = function () {
    setVisible(null);
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
                <div className="mt-2 text-center">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-800 dark:text-white"
                    id="modal-title"
                  >
                    Ocurrieron errores durante el proceso de validacion!
                  </h3>
                  <ul className="mt-2 text-sm text-start text-gray-500 list-disc list-inside dark:text-gray-400">
                    {err.array ? (
                      err.array.map((err, i) => {
                        return <li key={i}>{err.msg}</li>;
                      })
                    ) : (
                      <li>{`${err.message}`}</li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="mt-5 sm:flex sm:items-center sm:justify-end">
                <div className="sm:flex sm:items-center ">
                  <button
                    onClick={close}
                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    Entendido!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  /* jshint ignore:end */
}

export default Errors;
