const STAT_LABELS = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Atq. Esp.",
  "special-defense": "Def. Esp.",
  speed: "Velocidad",
};

// El máximo teórico de cualquier stat base es 255 (HP de Blissey)
const STAT_MAX = 255;

function StatBar({ name, value }) {
  const label = STAT_LABELS[name] || name;
  const percent = Math.round((value / STAT_MAX) * 100);
  const color =
    value >= 100
      ? "bg-green-400"
      : value >= 60
        ? "bg-yellow-400"
        : "bg-red-400";

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-20 shrink-0 text-right">
        {label}
      </span>
      <span className="text-sm font-semibold w-8 shrink-0">{value}</span>
      <div
        className="flex-1 bg-gray-100 rounded-full h-2"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={STAT_MAX}
        aria-label={`${label}: ${value}`}
      >
        <div
          className={`${color} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default StatBar;
