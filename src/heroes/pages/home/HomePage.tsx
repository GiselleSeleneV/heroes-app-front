import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useSearchParams } from "react-router";
import { use, useMemo } from "react";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import usePaginatedHero from "@/heroes/hooks/usePaginatedHero";
import { FavoriteHeroContext } from "@/heroes/context/favoriteHeroContex";
// import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favoriteCount, favorites } = use(FavoriteHeroContext);

  const activeTab = searchParams.get("tab") ?? "all";

  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const category = searchParams.get("category") ?? "all";

  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);
  const { data: summary } = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de Superhéroes"
          description="Descubre, explora y administra superhéroes y villanos"
        />

        <CustomBreadcrumbs currentPage="Superhéroes" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-5 h-auto sm:h-9 gap-1 sm:gap-0 bg-card border border-slate-200 text-[#0F172A] p-1">
            <TabsTrigger
              value="all"
              className="px-2 py-2.5 sm:py-1 text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap text-center leading-tight text-[#0F172A]/70 data-[state=active]:bg-[#0F172A] data-[state=active]:text-white"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "all");
                  prev.set("category", "all");
                  prev.set("page", "1");
                  return prev;
                })
              }
            >
              <span className="sm:hidden">Todos ({summary?.totalHeroes})</span>
              <span className="hidden sm:inline">
                Todos los personajes ({summary?.totalHeroes})
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="favorites"
              className="px-2 py-2.5 sm:py-1 text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap text-center leading-tight text-[#0F172A]/70 data-[state=active]:bg-[#0F172A] data-[state=active]:text-white"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "favorites");
                  return prev;
                })
              }
            >
              Favoritos ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              className="px-2 py-2.5 sm:py-1 text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap text-center leading-tight text-[#0F172A]/70 data-[state=active]:bg-[#0F172A] data-[state=active]:text-white"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "heroes");
                  prev.set("category", "hero");
                  prev.set("page", "1");
                  return prev;
                })
              }
            >
              Héroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              className="px-2 py-2.5 sm:py-1 text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap text-center leading-tight text-[#0F172A]/70 data-[state=active]:bg-[#0F172A] data-[state=active]:text-white"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "villains");
                  prev.set("category", "villain");
                  prev.set("page", "1");
                  return prev;
                })
              }
            >
              Villanos ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="bg-[#0F172A]">
            {/* Mostrar todos los personajes */}
            <h1 className="text-white text-2xl font-semibold mb-4">
              Todos los personajes
            </h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>

          <TabsContent value="favorites" className="bg-[#0F172A]">
            {/* Mostrar todos los personajes favoritos */}
            <h1 className="text-white text-2xl font-semibold mb-4">Favoritos</h1>
            <HeroGrid heroes={favorites} />
          </TabsContent>

          <TabsContent value="heroes" className="bg-[#0F172A]">
            {/* Mostrar todos los héroes */}
            <h1 className="text-white text-2xl font-semibold mb-4">Héroes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains" className="bg-[#0F172A]">
            {/* Mostrar todos los Villanos */}
            <h1 className="text-white text-2xl font-semibold mb-4">Villanos</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {selectedTab !== "favorites" && (
          <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
        )}
      </>
    </>
  );
};
