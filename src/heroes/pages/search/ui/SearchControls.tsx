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

export const SearchControls = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeAccordion = searchParams.get("active-accordion") ?? "";
  const selectedStrength = Number(searchParams.get("strength") ?? "0");

  const setQueryParam = (name: string, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
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
                  <div className="h-10 w-full rounded-md border border-input bg-background mt-2 px-3 py-2 text-sm">
                    Todos los equipos
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoría</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background mt-2 px-3 py-2 text-sm">
                    Todas las categorías
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Universo</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background mt-2 px-3 py-2 text-sm">
                    Todos los universos
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estado</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background mt-2 px-3 py-2 text-sm">
                    Todos los estados
                  </div>
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
                    setQueryParam("strength", value[0].toString())
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
