interface TimestampTagProps {
  label: string
  time: number
  isActive?: boolean
  onClick: (time: number) => void
}

export default function TimestampTag({ label, time, isActive, onClick }: TimestampTagProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <button
      onClick={() => onClick(time)}
      className={`
        w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium
        transition-all duration-200 hover:scale-[1.02] group
        ${isActive
          ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-200'
          : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-300'
        }
      `}
    >
      <div className="flex flex-col items-start">
        <span className="text-left font-medium">{label}</span>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
        isActive
          ? 'bg-blue-500 text-blue-100'
          : 'bg-gray-200 text-gray-600 group-hover:bg-blue-200'
      }`}>
        {formatTime(time)}
      </span>
    </button>
  )
}
