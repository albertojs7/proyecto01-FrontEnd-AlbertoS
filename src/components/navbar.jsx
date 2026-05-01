import { useState } from "react";
import { NavLink } from "react-router-dom";

function MasterBallIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="32"
      height="32"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="50" cy="50" r="45" fill="#1a1a1a" />
      <path d="M 5 50 A 45 45 0 0 1 95 50 Z" fill="#6B21A8" />
      <path d="M 5 50 A 45 45 0 0 0 95 50 Z" fill="#e5e7eb" />
      <rect x="5" y="46" width="90" height="8" fill="#1a1a1a" />
      <circle cx="50" cy="50" r="14" fill="#1a1a1a" />
      <circle cx="50" cy="50" r="10" fill="#e5e7eb" />
      <circle cx="50" cy="50" r="5" fill="#1a1a1a" />
      <path
        d="M 35 25 L 35 40 L 40 40 L 40 30 L 50 40 L 60 30 L 60 40 L 65 40 L 65 25 L 56 25 L 50 32 L 44 25 Z"
        fill="#ffffff"
      />
      <circle cx="25" cy="30" r="8" fill="#F472B6" />
      <circle cx="75" cy="30" r="8" fill="#F472B6" />
    </svg>
  );
}

const links = [
  { to: "/", label: "Inicio" },
  { to: "/explorar", label: "Explorar" },
  { to: "/favoritos", label: "Favoritos" },
  { to: "/contacto", label: "Contacto" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#140b2e] shadow-md relative z-50">
      <nav
        className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        <NavLink
          to="/"
          className="flex items-center gap-2 text-white font-bold text-lg"
          aria-label="Pokédex — ir al inicio"
          onClick={() => setIsMenuOpen(false)}
        >
          <MasterBallIcon />
          <span className="text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">Pokédex</span>
        </NavLink>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        <ul className="hidden md:flex gap-6 list-none m-0 p-0" role="list">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  "text-sm font-medium transition-colors text-purple-200 hover:text-white"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#140b2e] shadow-lg">
          <ul className="flex flex-col list-none m-0 p-4 gap-4" role="list">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-base font-medium transition-colors ${
                      isActive
                        ? "text-white font-bold"
                        : "text-red-100 hover:text-white"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
