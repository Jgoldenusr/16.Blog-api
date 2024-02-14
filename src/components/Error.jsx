import { Link } from "react-router-dom";

function Error({ err }) {
  /* jshint ignore:start */
  return (
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="font-semibold text-base text-indigo-600">Error</p>
        <h1 className="font-bold mt-4 text-3xl text-gray-100 tracking-tight sm:text-5xl">
          Ha ocurrido un problema!
        </h1>
        <p className="mt-6 leading-7 text-base text-gray-400">
          {err ? err.message : "No se pudo acceder al recurso solicitado."}
        </p>
        <div className="mt-10 flex gap-x-6 items-center justify-center">
          <Link
            to="/"
            aria-label="Volver a inicio"
            className="bg-indigo-600 font-semibold no-deco px-3.5 py-2.5 rounded-md shadow-sm text-sm text-white hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Volver a inicio
          </Link>
          <a href="#" className="font-semibold text-gray-400 text-sm">
            Contactar con el soporte <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
  /* jshint ignore:end */
}

export default Error;
