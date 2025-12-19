const CONSTRAINT_OPTIONS = [
  {
    id: 'sales',
    label: 'Sales',
    description: 'Leads would pile up and go cold.',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  },
  {
    id: 'operations',
    label: 'Operations',
    description: 'Fulfillment/Onboarding would stop.',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  },
  {
    id: 'admin',
    label: 'Admin',
    description: 'Invoices and data entry would backlog.',
    icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    id: 'support',
    label: 'Support',
    description: 'Customers would get angry/churn.',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
  },
]

export default function Constraint({ value, onChange, onNext, onBack }) {
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
        <span className="text-navy-400 text-xs uppercase tracking-wide">The Constraint</span>
      </div>

      {/* Question */}
      <h2 className="font-display text-display-sm md:text-display-md text-navy-900 mb-4">
        If you stopped working today, where would the business <span className="underline-accent">break first</span>?
      </h2>

      <p className="text-navy-500 mb-8">
        This helps us identify your primary operational constraint.
      </p>

      {/* Options */}
      <div className="grid gap-4 mb-8">
        {CONSTRAINT_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`group relative p-5 rounded-xl border-2 text-left transition-all duration-200 ${
              value === option.id
                ? 'border-growth-500 bg-growth-50'
                : 'border-navy-200 bg-white hover:border-growth-300 hover:bg-growth-50/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                value === option.id ? 'bg-growth-500' : 'bg-navy-100 group-hover:bg-navy-200'
              }`}>
                <svg className={`w-6 h-6 ${value === option.id ? 'text-white' : 'text-navy-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={option.icon} />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-navy-900 mb-1">{option.label}</h3>
                <p className="text-sm text-navy-500">{option.description}</p>
              </div>
              {value === option.id && (
                <div className="absolute top-4 right-4">
                  <svg className="w-6 h-6 text-growth-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              )}
            </div>
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
