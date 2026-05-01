import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="text-center flex flex-col items-center">
        {/* Número 404 */}
        <h1 className="text-8xl md:text-[150px] font-extrabold text-[#4c1d95] tracking-tighter drop-shadow-[0_0_15px_rgba(76,29,149,0.5)] mb-4">
          404
        </h1>

        {/* Título */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-3">
          Página no encontrada
        </h2>

        {/* Subtítulo */}
        <p className="text-gray-500 md:text-lg mb-8">
          La ruta que buscas no existe en esta aplicacion.
        </p>

        {/* Botón */}
        <Link
          to="/"
          className="px-8 py-3 bg-[#4c1d95] text-white font-bold rounded-2xl shadow-md hover:bg-[#5b21b6] hover:shadow-[0_0_15px_rgba(76,29,149,0.5)] transition-all active:scale-95"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
