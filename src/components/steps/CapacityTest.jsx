export default function CapacityTest({ value, onChange, onNext, onBack }) {
  const handleSelect = (choice) => {
    onChange(choice)
    // Auto-advance after selection
    setTimeout(() => onNext(), 300)
  }

  return (
    <div className="animate-fade-in">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-growth-500 text-sm font-semibold">02</span>
        <span className="w-8 h-px bg-growth-300" />
        <span className="text-navy-400 text-xs uppercase tracking-wide">The Capacity Test</span>
      </div>

      {/* Question */}
      <h2 className="font-display text-display-sm md:text-display-md text-navy-900 mb-4">
        If you got <span className="underline-accent">10 new leads</span> tomorrow, would your business...
      </h2>

      <p className="text-navy-500 mb-8">
        Be honest - this helps us identify where your constraint is.
      </p>

      {/* Options */}
      <div className="grid gap-4 mb-8">
        <button
          onClick={() => handleSelect('grow')}
          className={`group relative p-6 rounded-xl border-2 text-left transition-all duration-200 ${
            value === 'grow'
              ? 'border-growth-500 bg-growth-50'
              : 'border-navy-200 bg-white hover:border-growth-300 hover:bg-growth-50/50'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              value === 'grow' ? 'bg-growth-500' : 'bg-growth-100 group-hover:bg-growth-200'
            }`}>
              <svg className={`w-6 h-6 ${value === 'grow' ? 'text-white' : 'text-growth-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-navy-900 mb-1">Grow</h3>
              <p className="text-sm text-navy-500">I could handle more clients - I just need more leads coming in</p>
            </div>
            {value === 'grow' && (
              <div className="absolute top-4 right-4">
                <svg className="w-6 h-6 text-growth-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            )}
          </div>
        </button>

        <button
          onClick={() => handleSelect('break')}
          className={`group relative p-6 rounded-xl border-2 text-left transition-all duration-200 ${
            value === 'break'
              ? 'border-friction-500 bg-friction-50'
              : 'border-navy-200 bg-white hover:border-friction-300 hover:bg-friction-50/50'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              value === 'break' ? 'bg-friction-500' : 'bg-friction-100 group-hover:bg-friction-200'
            }`}>
              <svg className={`w-6 h-6 ${value === 'break' ? 'text-white' : 'text-friction-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-navy-900 mb-1">Break</h3>
              <p className="text-sm text-navy-500">I'm already at capacity - more leads would overwhelm me</p>
            </div>
            {value === 'break' && (
              <div className="absolute top-4 right-4">
                <svg className="w-6 h-6 text-friction-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            )}
          </div>
        </button>
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
