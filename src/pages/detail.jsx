import { useParams, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

import FavoriteButton from '../components/favoritebutton'
import EvolutionChain from '../components/evolution'
import { TypeBadge } from '../components/typebadge'
import StatBar from '../components/statbar'
import Loading from '../components/loading'

function Section({ title, children }) {
  return (
    <section className="bg-white rounded-2xl shadow p-5">
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
        {title}
      </h2>
      {children}
    </section>
  )
}

function DetailPage() {
  const { id } = useParams()

  const { data: pokemon, loading, error } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  )

  const { data: species } = useFetch(
    pokemon?.species?.url ?? null
  )

  const evolutionUrl = species?.evolution_chain?.url ?? null
  const { data: evoChain } = useFetch(evolutionUrl)

  if (loading) return <Loading />

  if (error) return (
    <div className="text-center py-20">
      <p className="text-red-500 mb-4">No se pudo cargar el pokémon.</p>
      <Link to="/explorar" className="text-blue-500 underline">
        Volver a explorar
      </Link>
    </div>
  )

  const tipos      = pokemon.types.map(t => t.type.name)
  const habilidades = pokemon.abilities
  const stats      = pokemon.stats
  const movimientos = pokemon.moves.slice(0, 20)

  // Busca la descripción en español, si no en inglés
  const descripcion = species?.flavor_text_entries?.find(
    e => e.language.name === 'es'
  )?.flavor_text
  ?? species?.flavor_text_entries?.find(
    e => e.language.name === 'en'
  )?.flavor_text
  ?? ''

  // Limpia los caracteres de salto de línea raros que trae la API
  const descripcionLimpia = descripcion.replace(/[\n\f]/g, ' ')

  const imagenNormal = pokemon.sprites.front_default
  const imagenShiny  = pokemon.sprites.front_shiny

  // Otras formas (Megas, GMax, formas regionales) que no sean la actual
  const variedades = species?.varieties?.filter(v => v.pokemon.name !== pokemon.name) ?? []

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">

      {/* Volver */}
      <Link
        to="/explorar"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-6"
        aria-label="Volver a explorar"
      >
        ← Volver
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6 mb-4 flex flex-col sm:flex-row items-center gap-6">

        {/* Imágenes: normal + shiny */}
        <div className="flex gap-4">
          <figure className="flex flex-col items-center">
            <img
              src={imagenNormal}
              alt={`${pokemon.name} normal`}
              width={120}
              height={120}
            />
            <figcaption className="text-xs text-gray-400 mt-1">Normal</figcaption>
          </figure>
          {imagenShiny && (
            <figure className="flex flex-col items-center">
              <img
                src={imagenShiny}
                alt={`${pokemon.name} shiny`}
                width={120}
                height={120}
              />
              <figcaption className="text-xs text-yellow-500 mt-1">✦ Shiny</figcaption>
            </figure>
          )}
        </div>

        {/* Info básica */}
        <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-gray-400">
            #{String(pokemon.id).padStart(3, '0')}
            </p>
            <FavoriteButton pokemon={{ id: String(pokemon.id), name: pokemon.name }} compact />
        </div>

        <h1 className="text-3xl font-bold capitalize text-gray-800 mb-2">
            {pokemon.name}
        </h1>

        {/* Tipos */}
        <div className="flex gap-2 mb-4">
            {tipos.map(tipo => (
            <TypeBadge key={tipo} type={tipo} size="lg" />
            ))}
        </div>

        {/* Descripción */}
        {descripcionLimpia && (
            <p className="text-sm text-gray-600 italic leading-relaxed">
            {descripcionLimpia}
            </p>
        )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

        {/* Medidas */}
        <Section title="Medidas">
          <dl className="grid grid-cols-2 gap-3">
            <div>
              <dt className="text-xs text-gray-400">Altura</dt>
              <dd className="text-lg font-semibold">
                {(pokemon.height / 10).toFixed(1)} m
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Peso</dt>
              <dd className="text-lg font-semibold">
                {(pokemon.weight / 10).toFixed(1)} kg
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Experiencia base</dt>
              <dd className="text-lg font-semibold">
                {pokemon.base_experience ?? '—'}
              </dd>
            </div>
          </dl>
        </Section>

        {/* Habilidades */}
        <Section title="Habilidades">
          <ul className="flex flex-col gap-2">
            {habilidades.map(({ ability, is_hidden }) => (
              <li key={ability.name} className="flex items-center gap-2">
                <span className="capitalize text-sm font-medium text-gray-700">
                  {ability.name.replace('-', ' ')}
                </span>
                {is_hidden && (
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    oculta
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* Estadísticas */}
      <Section title="Estadísticas base">
        <div className="flex flex-col gap-3">
          {stats.map(({ stat, base_stat }) => (
            <StatBar key={stat.name} name={stat.name} value={base_stat} />
          ))}
          <div className="border-t pt-3 flex items-center gap-3">
            <span className="text-xs text-gray-500 w-20 shrink-0 text-right">Total</span>
            <span className="text-sm font-bold">
              {stats.reduce((sum, s) => sum + s.base_stat, 0)}
            </span>
          </div>
        </div>
      </Section>

      {/* Movimientos */}
      <Section title={`Movimientos (primeros ${movimientos.length})`}>
        {movimientos.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {movimientos.map(({ move }) => (
              <li
                key={move.name}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full capitalize"
              >
                {move.name.replace(/-/g, ' ')}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 italic">
            La PokéAPI no tiene registrados movimientos específicos para esta forma.
          </p>
        )}
      </Section>

      <Section title="Cadena evolutiva">
        <EvolutionChain
            evolutionUrl={evolutionUrl}
            currentId={String(pokemon.id)}
        />
      </Section>

      {/* Formas alternativas / Variedades */}
      {variedades.length > 0 && (
        <Section title="Formas alternativas">
          <div className="flex flex-wrap gap-4">
            {variedades.map(({ pokemon: varInfo }) => {
              // Extraer ID de la URL: https://pokeapi.co/api/v2/pokemon/10033/ -> 10033
              const varId = varInfo.url.split('/').filter(Boolean).pop()
              const varImagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${varId}.png`
              
              return (
                <Link
                  key={varInfo.name}
                  to={`/pokemon/${varInfo.name}`}
                  className="flex flex-col items-center gap-1 p-3 rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  <img src={varImagen} alt={varInfo.name} width={80} height={80} />
                  <span className="text-xs font-semibold capitalize text-gray-700">
                    {varInfo.name.replace(/-/g, ' ')}
                  </span>
                </Link>
              )
            })}
          </div>
        </Section>
      )}

    </main>
  )
}

export default DetailPage