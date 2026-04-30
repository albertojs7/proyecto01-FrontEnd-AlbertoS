import { useState } from 'react'
import { NavLink } from 'react-router-dom'

// SVG inline de una pokébola como logo
function PokeballIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="32"
      height="32"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="50" cy="50" r="48" fill="white" stroke="#333" strokeWidth="4" />
      <path d="M2 50 Q2 2 50 2 Q98 2 98 50Z" fill="#e53e3e" />
      <rect x="2" y="46" width="96" height="8" fill="#333" />
      <circle cx="50" cy="50" r="12" fill="white" stroke="#333" strokeWidth="4" />
      <circle cx="50" cy="50" r="6" fill="#e53e3e" />
    </svg>
  )
}

const links = [
  { to: '/',          label: 'Inicio'     },
  { to: '/explorar',  label: 'Explorar'   },
  { to: '/favoritos', label: 'Favoritos'  },
  { to: '/contacto',  label: 'Contacto'   },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
          <PokeballIcon />
          <span>Pokédex</span>
        </NavLink>

        {/* Botón menú móvil */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Menú Desktop */}
        <ul className="hidden md:flex gap-6 list-none m-0 p-0" role="list">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white underline underline-offset-4'
                      : 'text-red-100 hover:text-white'
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
                  end={to === '/'}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-base font-medium transition-colors ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-red-100 hover:text-white'
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
  )
}

export default Navbar