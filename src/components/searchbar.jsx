export default function SearchBar({
  globalInput,
  setGlobalInput,
  handleGlobalSearch,
  isSearching,
  clearSearch,
}) {
  return (
    <form
      onSubmit={handleGlobalSearch}
      className="flex justify-center gap-2 mb-6"
      role="search"
    >
      <input
        type="search"
        placeholder="Buscar entre todos los pokémon..."
        value={globalInput}
        onChange={(e) => setGlobalInput(e.target.value)}
        aria-label="Búsqueda global de pokémon"
        className="w-full max-w-md border border-[#4c1d95] bg-[#1e1e24] text-gray-200 rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-500"
      />
      <button
        type="submit"
        className="bg-[#4c1d95] hover:bg-[#5b21b6] text-white text-sm px-5 py-2 rounded-full transition-colors"
      >
        Buscar
      </button>
      {isSearching && (
        <button
          type="button"
          onClick={clearSearch}
          className="text-sm text-gray-500 hover:text-gray-300 px-2"
          aria-label="Limpiar búsqueda"
        >
          ✕ Limpiar
        </button>
      )}
    </form>
  );
}
