const TITLE_COLORS = [
  "#f97316", // Fuerza - orange-500
  "#3b82f6", // Inteligencia - blue-500
  "#22c55e", // Velocidad - green-500
  "#a855f7", // Resistencia - purple-500
];

interface Props {
  title: string;
  description?: string;
}

export const CustomJumbotron = ({ title, description }: Props) => {
  return (
    <div className="text-center mb-8">
      <h1 className="mb-3 flex flex-wrap justify-center text-5xl sm:text-6xl md:text-7xl tracking-wider font-display uppercase">
        {title.split("").map((char, index) => (
          <span
            key={`${title}-${index}`}
            className="inline-block title-drop-letter"
            style={{
              color: TITLE_COLORS[index % TITLE_COLORS.length],
              animationDelay: `${index * 0.05}s`,
              textShadow: "2px 2px 0 rgba(0,0,0,0.35)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {description && (
        <p className="text-slate-300 text-base sm:text-lg">{description}</p>
      )}
    </div>
  );
};
