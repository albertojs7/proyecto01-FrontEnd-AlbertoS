import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/favoritesContext";

function HomePage() {
  const { favorites } = useFavorites();

  // Seleccionamos aleatoriamente 4 imágenes entre los favoritos
  const displayImages = useMemo(() => {
    // Barajamos los favoritos disponibles
    const shuffled = [...favorites].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);

    const places = [];
    for (let i = 0; i < 4; i++) {
      if (selected[i]) {
        // Encontró un Pokemon
        places.push({
          id: selected[i].id,
          name: selected[i].name,
          url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selected[i].id}.png`,
        });
      } else {
        // No hay suficientes favoritos -> Rellenamos con el sprite de una Pokéball
        places.push({
          id: `placeholder-${i}`,
          name: "Pokéball",
          url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
        });
      }
    }
    return places;
  }, [favorites]);

  return (
    <main className="w-full flex justify-center">
      <div className="w-full max-w-5xl">
        {/* HERO SECTION */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 px-4 py-20 md:py-32">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
              Tu <span className="text-red-500">Pokédex</span>
              <br /> definitiva
            </h1>
            <p className="text-lg text-gray-500 max-w-md">
              Explora el mundo Pokémon. Encuentra estadísticas, habilidades,
              cadenas evolutivas completas y guarda tus criaturas favoritas en
              un solo lugar.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
              <Link
                to="/explorar"
                className="px-8 py-3 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
              >
                Explorar ahora
              </Link>
              <Link
                to="/favoritos"
                className="px-8 py-3 bg-white text-gray-700 font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm hover:shadow"
              >
                Ver favoritos
              </Link>
            </div>
          </div>

          <div className="flex-1 hidden sm:flex justify-center relative w-full h-[360px] max-w-sm mt-16 md:mt-0 mx-auto">
            <div className="absolute inset-0 bg-red-500 rounded-full blur-3xl opacity-20 transform scale-90"></div>

            <div className="relative w-full h-full">
              <img
                src={displayImages[0].url}
                alt={displayImages[0].name}
                className="absolute top-0 right-0 w-28 h-28 sm:w-44 sm:h-44 drop-shadow-xl z-20 hover:scale-110 transition-transform object-contain"
              />
              <img
                src={displayImages[1].url}
                alt={displayImages[1].name}
                className="absolute bottom-0 right-0 sm:right-10 w-24 h-24 sm:w-40 sm:h-40 drop-shadow-xl z-10 hover:scale-110 transition-transform object-contain"
              />
              <img
                src={displayImages[2].url}
                alt={displayImages[2].name}
                className="absolute top-8 sm:top-12 left-0 w-24 h-24 sm:w-36 sm:h-36 drop-shadow-xl z-10 hover:scale-110 transition-transform object-contain"
              />
              <img
                src={displayImages[3].url}
                alt={displayImages[3].name}
                className="absolute bottom-2 sm:bottom-10 left-4 sm:left-12 w-20 h-20 sm:w-32 sm:h-32 drop-shadow-xl z-0 hover:scale-110 transition-transform object-contain"
              />
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pb-24">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800">Búsqueda global</h3>
            <p className="text-sm text-gray-500">
              Encuentra rápidamente a cualquier Pokémon de las 9 generaciones o
              filtra usando sus tipos.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800">Detalles a fondo</h3>
            <p className="text-sm text-gray-500">
              Visualiza fácilmente métricas de HP, ataque, defensa y el flujo
              iterativo de evolución.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800">Colección personal</h3>
            <p className="text-sm text-gray-500">
              Guarda tus Pokémones favoritos de la Pokédex para tener siempre un
              acceso rápido a ellos.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
