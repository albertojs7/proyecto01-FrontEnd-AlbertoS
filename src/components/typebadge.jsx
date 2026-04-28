const TYPE_COLORS = {
  fire:     'bg-orange-400 text-orange-900',
  water:    'bg-blue-400 text-blue-900',
  grass:    'bg-green-400 text-green-900',
  electric: 'bg-yellow-300 text-yellow-900',
  ice:      'bg-cyan-300 text-cyan-900',
  fighting: 'bg-red-500 text-red-100',
  poison:   'bg-purple-400 text-purple-900',
  ground:   'bg-yellow-600 text-yellow-100',
  flying:   'bg-indigo-300 text-indigo-900',
  psychic:  'bg-pink-400 text-pink-900',
  bug:      'bg-lime-400 text-lime-900',
  rock:     'bg-stone-400 text-stone-900',
  ghost:    'bg-violet-500 text-violet-100',
  dragon:   'bg-indigo-600 text-indigo-100',
  dark:     'bg-stone-700 text-stone-100',
  steel:    'bg-slate-400 text-slate-900',
  fairy:    'bg-pink-300 text-pink-900',
  normal:   'bg-stone-300 text-stone-800',
}

export function TypeBadge({ type, size = 'sm' }) {
  const colors = TYPE_COLORS[type] || 'bg-gray-300 text-gray-800'
  const padding = size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'
  
  return (
    <span className={`${padding} font-semibold rounded-full capitalize inline-flex items-center justify-center leading-none ${colors}`}>
      {type}
    </span>
  )
}

export { TYPE_COLORS }