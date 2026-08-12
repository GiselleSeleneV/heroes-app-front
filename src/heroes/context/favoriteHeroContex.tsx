import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Hero } from "types/hero";

interface FavoriteHeroContext {
  //state
  favorites: Hero[];
  favoriteCount: number;

  //methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoriitesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoriitesFromLocalStorage,
  );

  const toggleFavorite = (hero: Hero) => {
    const heroExists = favorites.find((h) => h.id === hero.id);

    if (heroExists) {
      const newFavorites = favorites.filter((h) => h.id !== hero.id);
      setFavorites(newFavorites);
      return;
    }

    setFavorites([...favorites, hero]);
  };

  const isFavorite = (hero: Hero) => {
    return favorites.some((h) => h.id === hero.id);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        //state
        favorites: favorites,
        favoriteCount: favorites.length,

        //methods
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
