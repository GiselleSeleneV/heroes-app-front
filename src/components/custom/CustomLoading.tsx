import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  label?: string;
  fullPage?: boolean;
}

export const CustomLoading = ({
  className,
  label = "Cargando contenido",
  fullPage = false,
}: Props) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn(
        "flex flex-col items-center justify-center gap-4 sm:gap-5",
        fullPage ? "min-h-[50vh] w-full py-12 sm:py-16" : "w-full py-8 sm:py-10",
        className,
      )}
    >
      <div className="relative size-12 sm:size-14 md:size-16">
        <div className="absolute inset-0 rounded-full border-2 border-white/15" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white border-r-white/60 animate-spin" />
        <div className="absolute inset-2 sm:inset-2.5 rounded-full border-2 border-transparent border-b-slate-300/80 animate-spin [animation-direction:reverse] [animation-duration:1.1s]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-2 sm:size-2.5 rounded-full bg-white/90 animate-pulse" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-sm sm:text-base font-medium text-white/90 tracking-wide">
          {label}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:-0.3s]" />
          <span className="size-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:-0.15s]" />
          <span className="size-1.5 rounded-full bg-white/70 animate-bounce" />
        </div>
      </div>
    </div>
  );
};
