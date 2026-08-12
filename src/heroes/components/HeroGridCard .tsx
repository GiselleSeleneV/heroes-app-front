import { Heart, Eye, Zap, Brain, Gauge, Shield } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Hero } from "types/hero";
import { useNavigate } from "react-router";
import { use } from "react";
import { FavoriteHeroContext } from "../context/favoriteHeroContex";

interface HeroGridCardProps {
  hero: Hero;
}

const VISIBLE_POWERS = 3;

export const HeroGridCard = ({ hero }: HeroGridCardProps) => {
  const navigate = useNavigate();

  const { isFavorite, toggleFavorite } = use(FavoriteHeroContext);

  const visiblePowers = hero.powers.slice(0, VISIBLE_POWERS);
  const remainingPowers = hero.powers.slice(VISIBLE_POWERS);

  const handleClick = () => {
    navigate(`/heroes/${hero.slug}`);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 text-[#0F172A]">
      <div className="relative h-64">
        <img
          src={hero.image}
          alt={hero.name}
          className="object-cover transition-all duration-500 group-hover:scale-110 absolute top-[-30px] w-full h-[410px] cursor-pointer"
          onClick={handleClick}
        />

        {/* Status indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${hero.status === "Active" ? "bg-green-500" : "bg-red-500"}`}
          />
          <Badge
            variant="secondary"
            className="text-xs bg-white/90 text-[#0F172A]"
          >
            {hero.status}
          </Badge>
        </div>

        {/* Universe badge */}
        {hero.universe === "DC" ? (
          <Badge className="absolute top-3 right-3 text-xs bg-blue-600 text-white">
            DC
          </Badge>
        ) : (
          <Badge className="absolute top-3 right-3 text-xs bg-red-600 text-white">
            {hero.universe}
          </Badge>
        )}

        {/* Favorite button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
          onClick={() => toggleFavorite(hero)}
        >
          <Heart
            className={`h-4 w-4 ${isFavorite(hero) ? "fill-red-500 text-red-500" : "fill-[#0F172A]/50 text-[#0F172A]/50"}`}
          />
        </Button>

        {/* View details button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute bottom-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye className="h-4 w-4 text-[#0F172A]" />
        </Button>
      </div>

      <CardHeader className="py-3 z-10 bg-gray-100/50 backdrop-blur-[-6px] relative top-1 group-hover:top-[-10px] transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-bold text-lg leading-tight text-[#0F172A]">
              {hero.alias}
            </h3>
            <p className="text-sm text-[#0F172A]/80">{hero.name}</p>
          </div>
          <Badge className="text-xs bg-green-100 text-green-800 border-green-200">
            {hero.category}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit text-xs text-[#0F172A]">
          {hero.team}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-[#0F172A]/70 line-clamp-2">
          {hero.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-orange-500" />
              <span className="text-xs font-medium text-[#0F172A]">Fuerza</span>
            </div>
            <Progress
              value={hero.strength * 10}
              className="h-2"
              activeColor="bg-orange-500"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Brain className="h-3 w-3 text-blue-500" />
              <span className="text-xs font-medium text-[#0F172A]">
                Inteligencia
              </span>
            </div>
            <Progress
              value={hero.intelligence * 10}
              className="h-2"
              activeColor="bg-blue-500"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Gauge className="h-3 w-3 text-green-500" />
              <span className="text-xs font-medium text-[#0F172A]">
                Velocidad
              </span>
            </div>
            <Progress
              value={hero.speed * 10}
              className="h-2"
              activeColor="bg-green-500"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-purple-500" />
              <span className="text-xs font-medium text-[#0F172A]">
                Resistencia
              </span>
            </div>
            <Progress
              value={hero.durability * 10}
              className="h-2"
              activeColor="bg-purple-500"
            />
          </div>
        </div>

        {/* Powers */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-[#0F172A]">Poderes:</h4>
          <div className="flex flex-wrap gap-1">
            {visiblePowers.map((power) => (
              <Badge
                variant="outline"
                className="text-xs text-[#0F172A]"
                key={power}
              >
                {power}
              </Badge>
            ))}

            {remainingPowers.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="outline-none">
                    <Badge
                      variant="outline"
                      className="text-xs bg-gray-100 cursor-pointer hover:bg-gray-200 text-[#0F172A]"
                    >
                      +{remainingPowers.length} más
                    </Badge>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto max-w-xs p-3" align="start">
                  <p className="text-xs font-medium text-[#0F172A]/70 mb-2">
                    Poderes adicionales
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {remainingPowers.map((power) => (
                      <Badge
                        variant="outline"
                        className="text-xs text-[#0F172A]"
                        key={power}
                      >
                        {power}
                      </Badge>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        <div className="text-xs text-[#0F172A]/60 pt-2 border-t">
          Primera aparición: {hero.firstAppearance}
        </div>
      </CardContent>
    </Card>
  );
};
