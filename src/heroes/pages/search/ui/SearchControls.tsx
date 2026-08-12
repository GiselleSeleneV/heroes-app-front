import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { useRef } from "react";
import { useSearchParams } from "react-router";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TEAMS = [
  "Liga de la Justicia",
  "Vengadores",
  "X-Men",
  "Batfamilia",
  "Jóvenes Titanes",
  "Solo",
  "Suicide Squad",
];

const CATEGORIES = [
  { value: "Hero", label: "Héroe" },
  { value: "Villain", label: "Villano" },
];

const UNIVERSES = ["DC", "Marvel"];

const STATUSES = [
  { value: "Active", label: "Activo" },
  { value: "Deceased", label: "Fallecido" },
];

export const SearchControls = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeAccordion = searchParams.get("active-accordion") ?? "";
  const selectedStrength = Number(searchParams.get("strength") ?? "0");
  const selectedTeam = searchParams.get("team") ?? "all";
  const selectedCategory = searchParams.get("category") ?? "all";
  const selectedUniverse = searchParams.get("universe") ?? "all";
  const selectedStatus = searchParams.get("status") ?? "all";

  const setQueryParam = (name: string, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value && value !== "all") {
        next.set(name, value);
      } else {
        next.delete(name);
      }
      return next;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = inputRef.current?.value ?? "";
      setQueryParam("name", value);
    }
  };

  const handleClearAll = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("name");
      next.delete("strength");
      next.delete("team");
      next.delete("category");
      next.delete("universe");
      next.delete("status");
      return next;
    });
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            ref={inputRef}
            placeholder="Buscar héroes, villanos, poderes, equipos..."
            className="pl-12 h-12 text-lg bg-white"
            onKeyDown={handleKeyDown}
            defaultValue={searchParams.get("name") ?? ""}
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            variant={
              activeAccordion === "advanced-filters" ? "default" : "outline"
            }
            className="h-12"
            onClick={() =>
              setQueryParam(
                "active-accordion",
                activeAccordion === "advanced-filters"
                  ? ""
                  : "advanced-filters",
              )
            }
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      <Accordion
        type="single"
        collapsible
        value={activeAccordion}
        onValueChange={(value) => setQueryParam("active-accordion", value)}
      >
        <AccordionItem value="advanced-filters">
          <AccordionContent>
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filtros avanzados</h3>
                <Button variant="ghost" onClick={handleClearAll}>
                  Limpiar todo
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Equipo</label>
                  <Select
                    value={selectedTeam}
                    onValueChange={(value) => setQueryParam("team", value)}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Todos los equipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los equipos</SelectItem>
                      {TEAMS.map((team) => (
                        <SelectItem key={team} value={team}>
                          {team}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoría</label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => setQueryParam("category", value)}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Universo</label>
                  <Select
                    value={selectedUniverse}
                    onValueChange={(value) => setQueryParam("universe", value)}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Todos los universos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los universos</SelectItem>
                      {UNIVERSES.map((universe) => (
                        <SelectItem key={universe} value={universe}>
                          {universe}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Estado</label>
                  <Select
                    value={selectedStatus}
                    onValueChange={(value) => setQueryParam("status", value)}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Todos los estados" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      {STATUSES.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium">
                  Fuerza mínima: {selectedStrength}/10
                </label>
                <Slider
                  key={selectedStrength}
                  className="mt-2"
                  defaultValue={[selectedStrength]}
                  onValueChange={(value) =>
                    setQueryParam(
                      "strength",
                      value[0] === 0 ? "" : value[0].toString(),
                    )
                  }
                  max={10}
                  step={1}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
