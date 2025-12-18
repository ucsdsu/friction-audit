const REVENUE_OPTIONS = [
  { id: 'under-5k', label: 'Under $5k' },
  { id: '5k-10k', label: '$5k - $10k' },
  { id: '10k-25k', label: '$10k - $25k' },
  { id: '25k-50k', label: '$25k - $50k' },
  { id: '50k-plus', label: '$50k+' },
]

export default function Stakes({
  currentRevenue,
  goalRevenue,
  onChangeCurrentRevenue,
  onChangeGoalRevenue,
  onSubmit,
  onBack,
  canProceed
}) {
  return (
    <div className="animate-fade-in">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-growth-500 text-sm font-semibold">04</span>
        <span className="w-8 h-px bg-growth-300" />
        <span className="text-navy-400 text-xs uppercase tracking-wide">The Stakes</span>
      </div>

      {/* Question */}
      <h2 className="font-display text-display-sm md:text-display-md text-navy-900 mb-4">
        Let's talk <span className="underline-accent">numbers</span>
      </h2>

      <p className="text-navy-500 mb-8">
        This helps us calculate the real cost of your bottleneck and show clear ROI.
      </p>

      {/* Current Revenue */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-navy-700 mb-3">
          What's your current monthly revenue?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {REVENUE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => onChangeCurrentRevenue(option.id)}
              className={`px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 ${
                currentRevenue === option.id
                  ? 'border-growth-500 bg-growth-50 text-growth-700'
                  : 'border-navy-200 bg-white text-navy-600 hover:border-growth-300 hover:bg-growth-50/50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Goal Revenue */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-navy-700 mb-3">
          Where do you want to be in 12 months?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {REVENUE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => onChangeGoalRevenue(option.id)}
              className={`px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 ${
                goalRevenue === option.id
                  ? 'border-navy-900 bg-navy-900 text-cream-50'
                  : 'border-navy-200 bg-white text-navy-600 hover:border-navy-400 hover:bg-navy-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onSubmit}
        disabled={!canProceed}
        className="btn-primary w-full text-base group mb-4"
      >
        Generate My Roadmap
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </button>

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

      {/* Privacy note */}
      <p className="mt-6 text-xs text-navy-400 text-center">
        Your data is never shared. We use it only to generate your personalized analysis.
      </p>
    </div>
  )
}
