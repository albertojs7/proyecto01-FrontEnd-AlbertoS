import { useState, useEffect } from "react";

const EVENT_KEY = "favorites_changed";
const STORAGE_KEY = "pokedex_favorites";

function getLocalFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(getLocalFavorites());

  useEffect(() => {
    function handleSync() {
      setFavorites(getLocalFavorites());
    }

    window.addEventListener(EVENT_KEY, handleSync);
    window.addEventListener("storage", handleSync);
    
    return () => {
      window.removeEventListener(EVENT_KEY, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  function addFavorite(pokemon) {
    const current = getLocalFavorites();
    if (!current.some((p) => p.id === pokemon.id)) {
      const next = [...current, pokemon];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(EVENT_KEY));
    }
  }

  function removeFavorite(id) {
    const current = getLocalFavorites();
    const next = current.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVENT_KEY));
  }

  function isFavorite(id) {
    return favorites.some((p) => p.id === id);
  }

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
