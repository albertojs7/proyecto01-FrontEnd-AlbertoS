import { useState } from "react";
import { NavLink } from "react-router-dom";

function PikachuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="32"
      height="32"
      aria-hidden="true"
      focusable="false"
    >
      {/* Orejas */}
      <polygon points="25,42 18,8 38,36" fill="#f5c800"/>
      <polygon points="75,42 82,8 62,36" fill="#f5c800"/>
      <polygon points="18,8 26,22 33,12" fill="#1a1a1a"/>
      <polygon points="82,8 74,22 67,12" fill="#1a1a1a"/>
      {/* Cara */}
      <circle cx="50" cy="58" r="38" fill="#f5c800"/>
      {/* Ojos */}
      <circle cx="35" cy="48" r="7" fill="#1a1208"/>
      <circle cx="65" cy="48" r="7" fill="#1a1208"/>
      <circle cx="32" cy="45" r="2.5" fill="white"/>
      <circle cx="62" cy="45" r="2.5" fill="white"/>
      {/* Nariz */}
      <ellipse cx="50" cy="58" rx="3" ry="2" fill="#3a1a08"/>
      {/* Boca */}
      <path d="M43 63 Q50 70 57 63" stroke="#3a1a08" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M43 63 Q41 60 43 57" stroke="#3a1a08" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Cachetes */}
      <circle cx="22" cy="65" r="11" fill="#e8302a" opacity="0.85"/>
      <circle cx="78" cy="65" r="11" fill="#e8302a" opacity="0.85"/>
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
    <header className="bg-red-600 shadow-md relative z-50">
      <nav
        className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        <NavLink
          to="/"
          className="flex items-center gap-2 text-white font-bold text-lg"
          aria-label="Pokédex — ir al inicio"
          onClick={() => setIsMenuOpen(false)}
        >
          <PikachuIcon />
          <span>Pokédex</span>
        </NavLink>

        {/* Botón menú móvil */}
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

        {/* Menú Desktop */}
        <ul className="hidden md:flex gap-6 list-none m-0 p-0" role="list">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white underline underline-offset-4"
                      : "text-red-100 hover:text-white"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Menú Móvil */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-red-600 shadow-lg">
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
