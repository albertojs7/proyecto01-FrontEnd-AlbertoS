import { useRef } from "react";
import { useToast } from "../context/toastContext";
import { useFavorites } from "../hooks/useFavorites";
import ConfirmModal from "./confirm";

function FavoriteButton({ pokemon, compact = false }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { showToast } = useToast();
  const saved = isFavorite(pokemon.id);
  const modalRef = useRef(null);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      modalRef.current?.open();
    } else {
      addFavorite(pokemon);
      showToast(`¡${pokemon.name} agregado a favoritos!`, "success");
    }
  }

  function handleConfirmRemove() {
    removeFavorite(pokemon.id);
    showToast(`${pokemon.name} quitado de favoritos`, "info");
  }

  const HeartIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={saved ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  if (compact) {
    return (
      <>
        <button
          onClick={handleClick}
          aria-label={
            saved
              ? `Quitar ${pokemon.name} de favoritos`
              : `Agregar ${pokemon.name} a favoritos`
          }
          aria-pressed={saved}
          className={`p-1.5 rounded-full transition-colors
            ${
              saved
                ? "text-purple-400 bg-purple-900/30 hover:bg-purple-900/50"
                : "text-gray-500 hover:text-purple-400 hover:bg-purple-900/30"
            }`}
        >
          {HeartIcon}
        </button>
        <ConfirmModal
          ref={modalRef}
          pokemonName={pokemon.name}
          onConfirm={handleConfirmRemove}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        aria-label={
          saved
            ? `Quitar ${pokemon.name} de favoritos`
            : `Agregar ${pokemon.name} a favoritos`
        }
        aria-pressed={saved}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
          ${
            saved
              ? "bg-purple-900/30 text-purple-400 hover:bg-purple-900/50 border border-purple-500/30"
              : "bg-[#1e1e24] text-gray-400 hover:text-gray-200 border border-gray-700 hover:border-gray-500"
          }`}
      >
        {HeartIcon}
        {saved ? "En favoritos" : "Agregar a favoritos"}
      </button>
      <ConfirmModal
        ref={modalRef}
        pokemonName={pokemon.name}
        onConfirm={handleConfirmRemove}
      />
    </>
  );
}

export default FavoriteButton;
