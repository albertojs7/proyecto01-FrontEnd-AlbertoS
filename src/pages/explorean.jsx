import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Card from '../components/card'

const LIMIT = 20

function getIdFromUrl(url) {
  const parts = url.split('/').filter(Boolean)
  return parts[parts.length - 1]
}

// Genera el rango de páginas a mostrar estilo Google
// Siempre muestra 10 números centrados en la página actual
function getPageRange(current, total) {
  const range = []
  let start = Math.max(1, current - 4)
  let end   = Math.min(total, start + 9)

  // Si el bloque no llega a 10, ajusta el inicio
  if (end - start < 9) start = Math.max(1, end - 9)

  for (let i = start; i <= end; i++) range.push(i)
  return range
}

function ExplorePage() {
  const [search, setSearch]           = useState('')
  const [inputValue, setInputValue]   = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const page   = parseInt(searchParams.get('page') || '1')
  const offset = (page - 1) * LIMIT

  const { data, loading, error } = useFetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`
  )

  function goToPage(newPage) {
    setSearchParams({ page: newPage })
    setSearch('')
    setInputValue('')
    window.scrollTo(0, 0)
  }

  function handleSearch(e) {
    e.preventDefault()
    setSearch(inputValue.trim())
  }

  if (loading) return <p className="text-center py-20 text-gray-400">Cargando...</p>

  if (error) return (
    <div className="text-center py-20">
      <p className="text-red-500 mb-4">Error: {error}</p>
      <button
        onClick={() => goToPage(page)}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Reintentar
      </button>
    </div>
  )

  const totalPages = Math.ceil(data.count / LIMIT)
  const pageRange  = getPageRange(page, totalPages)

  const filtered = data.results.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">

      {/* Barra de búsqueda centrada */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center gap-2 mb-10"
        role="search"
      >
        <input
          type="search"
          placeholder="Buscar en esta página..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          aria-label="Buscar pokémon en esta página"
          className="w-full max-w-md border border-gray-300 rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded-full transition-colors"
        >
          Buscar
        </button>
      </form>

      {/* Estado: empty */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-20">
          No hay resultados para "{search}" en esta página.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map(pokemon => {
            const id = getIdFromUrl(pokemon.url)
            return <Card key={id} id={id} name={pokemon.name} />
          })}
        </div>
      )}

      {!search && (
        <nav
          aria-label="Paginación"
          className="flex items-center justify-center gap-1 mt-12"
        >
          {pageRange.map(n => (
            <button
              key={n}
              onClick={() => goToPage(n)}
              aria-label={`Ir a página ${n}`}
              aria-current={n === page ? 'page' : undefined}
              className={`w-9 h-9 rounded-full text-sm font-medium transition-colors
                ${n === page
                  ? 'bg-red-600 text-white'
                  : 'text-blue-600 hover:bg-gray-100'
                }`}
            >
              {n}
            </button>
          ))}
        </nav>
      )}

    </main>
  )
}

export default ExplorePage