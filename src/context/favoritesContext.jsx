import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function addFavorite(pokemon) {
    setFavorites((prev) => [...prev, pokemon]);
  }

  function removeFavorite(id) {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  }

  function isFavorite(id) {
    return favorites.some((p) => p.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
