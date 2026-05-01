import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import FavoriteButton from "./favoritebutton";
import { TypeBadge } from "./typebadge";

function Card({ id, name }) {
  const imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const { data, loading } = useFetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const tipos = data?.types?.map((t) => t.type.name) ?? [];

  return (
    <div className="relative">
      <Link
        to={`/pokemon/${id}`}
        className="bg-[#1e1e24] border border-gray-800 rounded-2xl shadow hover:shadow-purple-500/20 transition-all p-4 flex flex-col items-center gap-2 group"
        aria-label={`Ver detalles de ${name}`}
      >
        <span className="text-xs text-gray-500 self-start">
          #{String(id).padStart(3, '0')}
        </span>

        <img
          src={imagen}
          alt={name}
          width={96}
          height={96}
          className="group-hover:scale-110 transition-transform"
        />

        <p className="font-semibold capitalize text-gray-200">{name}</p>

        <div className="flex gap-1 flex-wrap justify-center min-h-[24px]">
          {loading ? (
            <span className="text-xs text-gray-300">...</span>
          ) : (
            tipos.map((tipo) => <TypeBadge key={tipo} type={tipo} />)
          )}
        </div>
      </Link>

      {/* Botón fuera del Link para que no navegue al hacer click */}
      <div className="absolute top-2 right-2">
        <FavoriteButton pokemon={{ id: String(id), name }} compact />
      </div>
    </div>
  );
}

export default Card;
