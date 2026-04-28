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
  return (
    <header className="bg-red-600 shadow-md">
      <nav
        className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        <NavLink
          to="/"
          className="flex items-center gap-2 text-white font-bold text-lg"
          aria-label="Pokédex — ir al inicio"
        >
          <PokeballIcon />
          <span>Pokédex</span>
        </NavLink>

        <ul className="flex gap-6 list-none m-0 p-0" role="list">
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
    </header>
  )
}

export default Navbar