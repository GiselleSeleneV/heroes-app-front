"use client";

import { Badge } from "@/components/ui/badge";
import { Heart, Users, Zap } from "lucide-react";
import { HeroStatCard } from "./HeroStatCard";
import { useHeroSummary } from "../hooks/useHeroSummary";
import { FavoriteHeroContext } from "../context/favoriteHeroContex";
import { use } from "react";

export const HeroStats = () => {
  const { data: summary } = useHeroSummary();
  const { favoriteCount } = use(FavoriteHeroContext);

  if (!summary) {
    return <div className="text-white mb-8">Cargando...</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <HeroStatCard
        title="Total de personajes"
        icon={<Users className="h-4 w-4 text-[#0F172A]" />}
      >
        <div className="text-2xl font-bold text-[#0F172A]">
          {summary?.totalHeroes}
        </div>
        <div className="flex gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">
            {summary?.heroCount} Héroes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            {summary?.villainCount} Villanos
          </Badge>
        </div>
      </HeroStatCard>

      <HeroStatCard
        title="Favoritos"
        icon={<Heart className="h-4 w-4 text-[#0F172A]" />}
      >
        <div className="text-2xl font-bold text-[#0F172A]">{favoriteCount}</div>
        <p className="text-xs text-[#0F172A]/70">
          {((favoriteCount / summary.totalHeroes) * 100).toFixed(2)}% del total
        </p>
      </HeroStatCard>

      <HeroStatCard
        title="Fuerza"
        icon={<Zap className="h-4 w-4 text-[#0F172A]" />}
      >
        <div className="text-2xl font-bold text-[#0F172A]">
          {summary?.strongestHero.alias}
        </div>
        <p className="text-xs text-[#0F172A]/70">
          Fuerza: {summary?.strongestHero.strength}/10
        </p>
      </HeroStatCard>

      <HeroStatCard
        title="Inteligencia"
        icon={<Heart className="h-4 w-4 text-[#0F172A]" />}
      >
        <div className="text-2xl font-bold text-[#0F172A]">
          {summary?.smartestHero.alias}
        </div>
        <p className="text-xs text-[#0F172A]/70">
          Inteligencia: {summary?.smartestHero.intelligence}/10
        </p>
      </HeroStatCard>
    </div>
  );
};
