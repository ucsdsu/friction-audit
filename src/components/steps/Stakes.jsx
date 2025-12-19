const REVENUE_OPTIONS = [
  { id: 'under-500k', label: '< $500k', sublabel: 'Solopreneur' },
  { id: '1m-3m', label: '$1M – $3M', sublabel: 'Growth Phase' },
  { id: '3m-10m', label: '$3M – $10M', sublabel: 'Scale Phase' },
  { id: '10m-plus', label: '$10M+', sublabel: 'Enterprise' },
]

export default function Stakes({
  currentRevenue,
  onChangeCurrentRevenue,
  onNext,
  canProceed
}) {
  const handleSelect = (id) => {
    onChangeCurrentRevenue(id)
    // Auto-advance after selection
    setTimeout(() => onNext(), 300)
  }

  return (
    <div className="animate-fade-in">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-growth-500 text-sm font-semibold">01</span>
        <span className="w-8 h-px bg-growth-300" />
        <span className="text-navy-400 text-xs uppercase tracking-wide">The Scale</span>
      </div>

      {/* Question */}
      <h2 className="font-display text-display-sm md:text-display-md text-navy-900 mb-4">
        What is your current <span className="underline-accent">annual revenue</span> run rate?
      </h2>

      <p className="text-navy-500 mb-8">
        This helps us understand your stage of growth and tailor recommendations accordingly.
      </p>

      {/* Revenue Options */}
      <div className="space-y-3 mb-8">
        {REVENUE_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`w-full flex items-center justify-between p-5 rounded-xl border-2 text-left transition-all duration-200 ${
              currentRevenue === option.id
                ? 'border-growth-500 bg-growth-50'
                : 'border-navy-200 bg-white hover:border-growth-300 hover:bg-growth-50/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                currentRevenue === option.id
                  ? 'border-growth-500 bg-growth-500'
                  : 'border-navy-300'
              }`}>
                {currentRevenue === option.id && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className={`font-display text-lg font-semibold ${
                currentRevenue === option.id ? 'text-growth-700' : 'text-navy-800'
              }`}>
                {option.label}
              </span>
            </div>
            <span className={`text-sm ${
              currentRevenue === option.id ? 'text-growth-600' : 'text-navy-400'
            }`}>
              {option.sublabel}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
