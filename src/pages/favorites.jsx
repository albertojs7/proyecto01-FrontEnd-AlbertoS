import { Link }             from 'react-router-dom'
import { useFavorites }     from '../context/favoritesContext'
import Card                 from '../components/card'

function FavoritesPage() {
  const { favorites } = useFavorites()

  if (favorites.length === 0) return (
    <main className="flex flex-col items-center justify-center gap-4 py-32 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
        fill="none" stroke="#d1d5db" strokeWidth="1.5" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <p className="text-gray-400 text-lg">No tienes favoritos guardados.</p>
      <Link to="/explorar" className="text-sm text-red-500 hover:underline">
        Explorar pokémon
      </Link>
    </main>
  )

  return (
    <main className="max-w-5xl mx-auto px-4 pt-12 pb-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Mis favoritos</h1>
        <p className="text-sm font-normal text-gray-400 mt-1">
          {favorites.length} guardados
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {favorites.map(pokemon => (
          <Card key={pokemon.id} id={pokemon.id} name={pokemon.name} />
        ))}
      </div>
    </main>
  )
}

export default FavoritesPage