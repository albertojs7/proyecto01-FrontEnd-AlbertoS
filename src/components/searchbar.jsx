export default function SearchBar({
  globalInput,
  setGlobalInput,
  handleGlobalSearch,
  isSearching,
  clearSearch
}) {
  return (
    <form onSubmit={handleGlobalSearch} className="flex justify-center gap-2 mb-6" role="search">
      <input
        type="search"
        placeholder="Buscar entre todos los pokémon..."
        value={globalInput}
        onChange={e => setGlobalInput(e.target.value)}
        aria-label="Búsqueda global de pokémon"
        className="w-full max-w-md border border-gray-300 rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded-full transition-colors"
      >
        Buscar
      </button>
      {isSearching && (
        <button
          type="button"
          onClick={clearSearch}
          className="text-sm text-gray-400 hover:text-gray-600 px-2"
          aria-label="Limpiar búsqueda"
        >
          ✕ Limpiar
        </button>
      )}
    </form>
  )
}