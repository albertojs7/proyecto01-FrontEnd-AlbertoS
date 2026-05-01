function Footer() {
  return (
    <footer className="bg-[#140b2e] text-gray-400 py-6 md:py-8 mt-auto border-t border-gray-800 w-full">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-xs md:text-sm">
          &copy; {new Date().getFullYear()} Proyecto Pokédex. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
