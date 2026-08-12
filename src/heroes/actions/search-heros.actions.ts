import type { Hero } from "types/hero";
import { heroApi } from "../api/hero.api";

const BASE_URL = import.meta.env.VITE_API_URL;

interface Options {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}

export const searchHeroesAction = async (options: Options) => {
  const { name, team, category, universe, status, strength } = options || [];

  const { data } = await heroApi.get<Hero[]>("/search", {
    params: {
      name,
      team,
      category,
      universe,
      status,
      strength,
    },
  });

  return data.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  }));
};
