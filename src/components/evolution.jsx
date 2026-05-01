import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "./loading";
function buildLevels(chain) {
  const levels = [];

  function walk(nodes, depth) {
    if (!nodes.length) return;

    if (!levels[depth]) levels[depth] = [];

    const nextNodes = [];

    nodes.forEach((node) => {
      const id = node.species.url.split("/").filter(Boolean).pop();
      levels[depth].push({
        name: node.species.name,
        id,
        details: node.evolution_details?.[0] ?? null,
      });
      nextNodes.push(...node.evolves_to);
    });

    walk(nextNodes, depth + 1);
  }
  walk([{ ...chain, evolution_details: [] }], 0);

  return levels;
}

function getEvoLabel(details) {
  if (!details) return null;

  const { trigger, min_level, item, min_happiness, min_beauty } = details;

  if (trigger?.name === "level-up") {
    if (min_level) return `Nivel ${min_level}`;
    if (min_happiness) return `Felicidad alta`;
    if (min_beauty) return `Belleza alta`;
    return "Subir de nivel";
  }
  if (trigger?.name === "use-item" && item) {
    return `Usar ${item.name.replace(/-/g, " ")}`;
  }
  if (trigger?.name === "trade") {
    return item
      ? `Intercambio con ${item.name.replace(/-/g, " ")}`
      : "Intercambio";
  }

  return trigger?.name?.replace(/-/g, " ") ?? "?";
}

function EvoCard({ id, name, isCurrent }) {
  const imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <Link
      to={`/pokemon/${id}`}
      className={`group flex flex-col items-center gap-1 p-3 rounded-2xl hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300
        ${isCurrent ? "bg-[#1e1e24] ring-2 ring-[#4c1d95]" : "hover:bg-[#1e1e24]"}`}
      aria-label={`Ver detalles de ${name}${isCurrent ? " (actual)" : ""}`}
      aria-current={isCurrent ? "page" : undefined}
    >
      <img
        src={imagen}
        alt={name}
        width={80}
        height={80}
        className="transition-transform duration-300 group-hover:scale-110"
      />
      <span className="text-xs font-semibold capitalize text-gray-300 group-hover:text-purple-400 transition-colors duration-300">
        {name}
      </span>
      <span className="text-xs text-gray-500">
        #{String(id).padStart(3, "0")}
      </span>
    </Link>
  );
}

function Arrow({ label }) {
  return (
    <div
      className="flex flex-col items-center gap-1 text-gray-400 px-1"
      aria-label={label ?? ""}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
      {label && (
        <span className="text-xs text-center leading-tight max-w-[72px]">
          {label}
        </span>
      )}
    </div>
  );
}

function EvolutionChain({ evolutionUrl, currentId }) {
  const { data, loading } = useFetch(evolutionUrl);

  if (loading) return <Loading />;

  if (!data) return null;

  const levels = buildLevels(data.chain);

  if (levels.length <= 1)
    return (
      <p className="text-sm text-gray-400 text-center py-2">
        Este pokémon no evoluciona.
      </p>
    );

  return (
    <div className="flex flex-col items-center gap-4">
      {levels.map((level, levelIndex) => {
        const isFirst = levelIndex === 0;

        return (
          <div
            key={levelIndex}
            className="flex flex-col items-center gap-3 w-full"
          >
            {!isFirst &&
              (level.length > 2 ? (
                <Arrow label="Evoluciona a" />
              ) : (
                <div className="flex gap-6 justify-center">
                  {level.map((evo) => (
                    <Arrow key={evo.id} label={getEvoLabel(evo.details)} />
                  ))}
                </div>
              ))}
            <div className="flex flex-wrap justify-center gap-2">
              {level.map((evo) => (
                <EvoCard
                  key={evo.id}
                  id={evo.id}
                  name={evo.name}
                  isCurrent={evo.id === currentId}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EvolutionChain;
