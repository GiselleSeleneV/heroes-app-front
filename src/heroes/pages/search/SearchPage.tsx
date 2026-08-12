import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { searchHeroesAction } from "@/heroes/actions/search-heros.actions";
import { HeroGrid } from "@/heroes/components/HeroGrid";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") ?? undefined;
  const strength = searchParams.get("strength") ?? undefined;
  const team = searchParams.get("team") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const universe = searchParams.get("universe") ?? undefined;
  const status = searchParams.get("status") ?? undefined;

  const { data: heroes = [] } = useQuery({
    queryKey: ["search", { name, strength, team, category, universe, status }],
    queryFn: () =>
      searchHeroesAction({ name, strength, team, category, universe, status }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <>
      <CustomJumbotron
        title="Búsqueda de Superhéroes"
        description="Descubre, explora y administra superhéroes y villanos"
      />

      <CustomBreadcrumbs currentPage="Búsqueda de superhéroes" />

      {/*Stats Dashboard*/}
      <HeroStats />

      {/*Filter and search controls */}
      <SearchControls />

      <HeroGrid heroes={heroes} />
    </>
  );
};

export default SearchPage;
