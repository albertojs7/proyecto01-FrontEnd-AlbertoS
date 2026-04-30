import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Card from "../components/card";
import Loading from "../components/loading";
import SearchBar from "../components/searchbar";
import Pagination from "../components/pagination";

const LIMIT = 20;

const GENERATIONS = [
  { label: "Todas", min: 1, max: 9999 },
  { label: "Gen I", min: 1, max: 151 },
  { label: "Gen II", min: 152, max: 251 },
  { label: "Gen III", min: 252, max: 386 },
  { label: "Gen IV", min: 387, max: 493 },
  { label: "Gen V", min: 494, max: 649 },
  { label: "Gen VI", min: 650, max: 721 },
  { label: "Gen VII", min: 722, max: 809 },
  { label: "Gen VIII", min: 810, max: 905 },
  { label: "Gen IX", min: 906, max: 1025 },
];

const TYPES = [
  "todos",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
  "normal",
];

function getIdFromUrl(url) {
  return url.split("/").filter(Boolean).pop();
}

function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filtros pendientes (lo que el usuario seleccionó pero aún no aplicó)
  const [pendingGen, setPendingGen] = useState(0);
  const [pendingType, setPendingType] = useState("todos");

  // Filtros activos (lo que realmente se usa para el fetch)
  const [activeGen, setActiveGen] = useState(0);
  const [activeType, setActiveType] = useState("todos");

  // Búsqueda global
  const [globalInput, setGlobalInput] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");
  const [allPokemon, setAllPokemon] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);

  // Búsqueda local
  const [localInput, setLocalInput] = useState("");
  const [localSearch, setLocalSearch] = useState("");

  const page = parseInt(searchParams.get("page") || "1");
  const offset = (page - 1) * LIMIT;

  const gen = GENERATIONS[activeGen];
  const hasTypeFilter = activeType !== "todos";
  const hasGenFilter = activeGen !== 0;
  const isSearching = !!globalSearch;

  // URL del fetch principal
  // — Si hay tipo: usa el endpoint de tipo
  // — Si no: usa la lista paginada con offset de generación
  const fetchUrl = isSearching
    ? null
    : hasTypeFilter
      ? `https://pokeapi.co/api/v2/type/${activeType}`
      : `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${
          hasGenFilter ? gen.min - 1 + offset : offset
        }`;

  const { data, loading, error } = useFetch(fetchUrl);

  // Cuando filtramos por tipo, la API devuelve { pokemon: [{ pokemon: { name, url } }] }
  // Normalizamos a { name, url } igual que la lista normal
  const pageResults = (() => {
    if (!data) return [];

    if (hasTypeFilter) {
      // Evita errores si 'data' aún tiene la forma de la petición anterior mientras carga
      if (!data.pokemon) return [];

      // Filtra por generación si hay una activa
      return data.pokemon
        .map((p) => p.pokemon)
        .filter((p) => {
          const id = parseInt(getIdFromUrl(p.url));
          return id >= gen.min && id <= gen.max;
        });
    }

    return data.results ?? [];
  })();

  // Filtro local sobre los resultados de la página
  const displayed = localSearch
    ? pageResults.filter((p) => p.name.includes(localSearch.toLowerCase()))
    : hasTypeFilter
      ? pageResults // tipo devuelve todos — sin paginación extra
      : pageResults;

  // Paginación — solo aplica cuando no hay filtro de tipo ni búsqueda global
  const totalPages =
    hasTypeFilter || isSearching ? 1 : Math.ceil((data?.count ?? 0) / LIMIT);

  function applyFilters() {
    setActiveGen(pendingGen);
    setActiveType(pendingType);
    setSearchParams({ page: 1 });
    setLocalSearch("");
    setLocalInput("");
    setGlobalSearch("");
    setGlobalInput("");
    window.scrollTo(0, 0);
  }

  function goToPage(n) {
    setSearchParams({ page: n });
    setLocalSearch("");
    setLocalInput("");
    window.scrollTo(0, 0);
  }

  function handleGlobalSearch(e) {
    e.preventDefault();
    const q = globalInput.trim();
    if (!q) return;
    if (allPokemon.length === 0) {
      setLoadingAll(true);
      fetch("https://pokeapi.co/api/v2/pokemon?limit=1500&offset=0")
        .then((r) => r.json())
        .then((d) => setAllPokemon(d.results))
        .finally(() => setLoadingAll(false));
    }
    setGlobalSearch(q);
    setLocalSearch("");
    setLocalInput("");
  }

  function clearSearch() {
    setGlobalSearch("");
    setGlobalInput("");
    setLocalSearch("");
    setLocalInput("");
  }

  const globalResults =
    globalSearch && allPokemon.length > 0
      ? allPokemon.filter((p) => p.name.includes(globalSearch.toLowerCase()))
      : [];

  const filtersChanged = pendingGen !== activeGen || pendingType !== activeType;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Búsqueda global (solo visible si no hay filtros activos) */}
      {!(hasTypeFilter || hasGenFilter) && (
        <SearchBar
          globalInput={globalInput}
          setGlobalInput={setGlobalInput}
          handleGlobalSearch={handleGlobalSearch}
          isSearching={isSearching}
          clearSearch={clearSearch}
        />
      )}

      {/* Filtros — ocultos durante búsqueda global */}
      {!isSearching && (
        <div className="flex flex-wrap items-end justify-center gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <label htmlFor="gen-filter" className="text-xs text-gray-500 px-1">
              Generación
            </label>
            <select
              id="gen-filter"
              value={pendingGen}
              onChange={(e) => setPendingGen(Number(e.target.value))}
              aria-label="Filtrar por generación"
              className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              {GENERATIONS.map((g, i) => (
                <option key={g.label} value={i}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="type-filter" className="text-xs text-gray-500 px-1">
              Tipo
            </label>
            <select
              id="type-filter"
              value={pendingType}
              onChange={(e) => setPendingType(e.target.value)}
              aria-label="Filtrar por tipo"
              className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 capitalize"
            >
              {TYPES.map((t) => (
                <option key={t} value={t} className="capitalize">
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="local-search"
              className="text-xs text-gray-500 px-1"
            >
              En esta página
            </label>
            <input
              id="local-search"
              type="search"
              placeholder="Filtrar..."
              value={localInput}
              onChange={(e) => {
                setLocalInput(e.target.value);
                setLocalSearch(e.target.value.trim()); // este sí en tiempo real
              }}
              aria-label="Filtrar pokémon en esta página"
              className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Botón Aplicar — resaltado si hay cambios pendientes */}
          <button
            onClick={applyFilters}
            disabled={!filtersChanged}
            aria-disabled={!filtersChanged}
            className="px-6 py-2 rounded-full text-sm font-medium transition-colors
              bg-red-600 text-white hover:bg-red-700
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Aplicar filtros
          </button>

          {/* Limpiar filtros */}
          {(activeGen !== 0 || activeType !== "todos") && (
            <button
              onClick={() => {
                setPendingGen(0);
                setPendingType("todos");
                setActiveGen(0);
                setActiveType("todos");
                setSearchParams({ page: 1 });
                clearSearch();
              }}
              className="text-sm text-gray-400 hover:text-gray-600 pb-2"
            >
              ✕ Limpiar filtros
            </button>
          )}
        </div>
      )}

      {/* Loading */}
      {(loading || loadingAll) && <Loading />}

      {/* Error */}
      {error && !loading && (
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={() => goToPage(page)}
            className="bg-red-600 text-white px-4 py-2 rounded-full text-sm"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Resultados búsqueda global */}
      {isSearching && !loadingAll && (
        <>
          {globalResults.length === 0 ? (
            <p className="text-center text-gray-400 py-20">
              No se encontraron pokémon para "{globalSearch}".
            </p>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-4 text-center">
                {globalResults.length} resultado
                {globalResults.length !== 1 ? "s" : ""} para "{globalSearch}"
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {globalResults.map((pokemon) => {
                  const id = getIdFromUrl(pokemon.url);
                  return <Card key={id} id={id} name={pokemon.name} />;
                })}
              </div>
            </>
          )}
        </>
      )}

      {/* Resultados normales */}
      {!isSearching && !loading && !error && (
        <>
          {displayed.length === 0 ? (
            <p className="text-center text-gray-400 py-20">
              No hay pokémon con estos filtros.
            </p>
          ) : (
            <>
              {hasTypeFilter && (
                <p className="text-sm text-gray-400 mb-4 text-center">
                  {displayed.length} pokémon de tipo {activeType}
                  {hasGenFilter ? ` en ${gen.label}` : ""}
                </p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {displayed.map((pokemon) => {
                  const id = getIdFromUrl(pokemon.url);
                  return <Card key={id} id={id} name={pokemon.name} />;
                })}
              </div>
            </>
          )}
        </>
      )}

      {/* Paginación — solo sin filtro de tipo */}
      {!isSearching && !hasTypeFilter && !localSearch && !loading && (
        <Pagination page={page} totalPages={totalPages} goToPage={goToPage} />
      )}
    </main>
  );
}

export default ExplorePage;
