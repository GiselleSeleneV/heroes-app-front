import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router";

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get("page") ?? "1";

  const page = isNaN(+queryPage) ? 1 : +queryPage;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className="border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700 hover:text-white disabled:border-slate-700 disabled:text-slate-500"
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          variant={page === index + 1 ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(index + 1)}
          className={
            page === index + 1
              ? "bg-slate-100 text-slate-900 hover:bg-white"
              : "border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700 hover:text-white"
          }
        >
          {index + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className="border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700 hover:text-white disabled:border-slate-700 disabled:text-slate-500"
      >
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
