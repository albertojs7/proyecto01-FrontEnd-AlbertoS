export function getPageRange(current, total) {
  const range = [];
  let start = Math.max(1, current - 4);
  let end = Math.min(total, start + 9);
  if (end - start < 9) start = Math.max(1, end - 9);
  for (let i = start; i <= end; i++) range.push(i);
  return range;
}

export default function Pagination({ page, totalPages, goToPage }) {
  if (totalPages <= 1) return null;

  const pageRange = getPageRange(page, totalPages);

  return (
    <nav
      aria-label="Paginación"
      className="flex items-center justify-center gap-1 mt-12"
    >
      {pageRange.map((n) => (
        <button
          key={n}
          onClick={() => goToPage(n)}
          aria-label={`Ir a página ${n}`}
          aria-current={n === page ? "page" : undefined}
          className={`w-9 h-9 rounded-full text-sm font-medium transition-colors
            ${
              n === page
                ? "bg-red-600 text-white"
                : "text-blue-600 hover:bg-gray-100"
            }`}
        >
          {n}
        </button>
      ))}
    </nav>
  );
}
