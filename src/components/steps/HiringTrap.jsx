const HIRING_TRAP_OPTIONS = [
  {
    id: 'salary',
    label: "Can't justify a full-time salary for it yet.",
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    id: 'messy',
    label: 'The process is too messy to train someone.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    id: 'failed',
    label: "I tried hiring, but they couldn't do it right.",
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  },
  {
    id: 'intuition',
    label: 'It requires "Founder Intuition."',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
]

export default function HiringTrap({ value, onChange, onNext, onBack }) {
  const handleSelect = (choice) => {
    onChange(choice)
    // Auto-advance after selection
    setTimeout(() => onNext(), 300)
  }

  return (
    <div className="animate-fade-in">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-growth-500 text-sm font-semibold">03</span>
        <span className="w-8 h-px bg-growth-300" />
        <span className="text-navy-400 text-xs uppercase tracking-wide">The "Hiring Trap"</span>
      </div>

      {/* Question */}
      <h2 className="font-display text-display-sm md:text-display-md text-navy-900 mb-4">
        You have a task that needs doing, but you <span className="underline-accent">haven't hired</span> for it yet. Why?
      </h2>

      <p className="text-navy-500 mb-8">
        Understanding why you haven't delegated helps us design the right solution.
      </p>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {HIRING_TRAP_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all duration-200 ${
              value === option.id
                ? 'border-growth-500 bg-growth-50'
                : 'border-navy-200 bg-white hover:border-growth-300 hover:bg-growth-50/50'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              value === option.id ? 'bg-growth-500' : 'bg-navy-100'
            }`}>
              <svg className={`w-6 h-6 ${value === option.id ? 'text-white' : 'text-navy-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={option.icon} />
              </svg>
            </div>
            <span className={`font-medium flex-1 ${value === option.id ? 'text-growth-700' : 'text-navy-700'}`}>
              {option.label}
            </span>
            {value === option.id && (
              <svg className="w-5 h-5 text-growth-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="w-full py-3 text-sm text-navy-500 hover:text-navy-700 font-medium transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
    </div>
  )
}
