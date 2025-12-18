import BookingCTA from './BookingCTA'

export default function Results({ data, onRestart }) {
  if (!data) return null

  const { diagnosis, roadmap, roi, callAgenda } = data

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="glass border-b border-navy-100/50 px-4 py-4 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-cream-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="font-display font-semibold text-navy-900">Your Transformation Roadmap</h1>
              <p className="text-xs text-navy-500">Personalized automation strategy</p>
            </div>
          </div>
          <button
            onClick={onRestart}
            className="text-sm text-navy-500 hover:text-navy-700 font-medium transition-colors"
          >
            Start Over
          </button>
        </div>
      </header>

      <main className="px-4 py-8 md:py-12 max-w-5xl mx-auto">
        {/* Hero Diagnosis */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-navy-600 tracking-wide uppercase mb-4">
            <span className="w-8 h-px bg-navy-300" />
            Diagnosis Complete
            <span className="w-8 h-px bg-navy-300" />
          </span>
          <h2 className="font-display text-display-md md:text-display-lg text-navy-900 mb-4">
            We Found Your <span className="underline-accent">Constraint</span>
          </h2>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto">
            {diagnosis?.rootCause}
          </p>
        </div>

        {/* Split Screen: Current State vs Future State */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 animate-slide-up">
          {/* Current State - Left Side (Friction/Red) */}
          <div className="relative">
            <div className="absolute -top-3 left-4 z-10">
              <span className="bg-friction-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                CURRENT STATE
              </span>
            </div>
            <div className="bg-gradient-to-br from-friction-50 to-friction-100/50 rounded-2xl border-2 border-friction-200 p-6 pt-8 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-friction-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-friction-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-friction-600 text-xs font-semibold uppercase tracking-wide">The Bottleneck</p>
                  <p className="font-display text-lg font-semibold text-friction-700 capitalize">{diagnosis?.bottleneckType} Constraint</p>
                  {diagnosis?.bottleneckCategory && (
                    <p className="text-friction-500 text-xs font-medium mt-0.5">
                      Type: {diagnosis.bottleneckCategory}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-friction-700 mb-5 leading-relaxed">{diagnosis?.currentPain}</p>

              {/* Pain metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white/60 rounded-lg px-4 py-3 border border-friction-200/50">
                  <span className="text-sm text-friction-600">Hours lost weekly</span>
                  <span className="font-display text-xl font-bold text-friction-600">{roi?.hoursWastedWeekly || 15}h</span>
                </div>
                <div className="flex items-center justify-between bg-white/60 rounded-lg px-4 py-3 border border-friction-200/50">
                  <span className="text-sm text-friction-600">Monthly cost</span>
                  <span className="font-display text-xl font-bold text-friction-600">${(roi?.monthlyCostOfBottleneck || 9000).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between bg-white/60 rounded-lg px-4 py-3 border border-friction-200/50">
                  <span className="text-sm text-friction-600">Revenue plateau</span>
                  <span className="font-display text-xl font-bold text-friction-600">${(roi?.currentRevenue || 10000).toLocaleString()}/mo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Future State - Right Side (Growth/Green) */}
          <div className="relative">
            <div className="absolute -top-3 left-4 z-10">
              <span className="bg-growth-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                FUTURE STATE
              </span>
            </div>
            <div className="bg-gradient-to-br from-growth-50 to-growth-100/50 rounded-2xl border-2 border-growth-200 p-6 pt-8 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-growth-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-growth-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-growth-600 text-xs font-semibold uppercase tracking-wide">The Outcome</p>
                  <p className="font-display text-lg font-semibold text-growth-700">Operational Freedom</p>
                </div>
              </div>

              <p className="text-growth-700 mb-5 leading-relaxed">{roadmap?.step3_freedom?.futureState}</p>

              {/* Growth metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white/60 rounded-lg px-4 py-3 border border-growth-200/50">
                  <span className="text-sm text-growth-600">Hours recovered</span>
                  <span className="font-display text-xl font-bold text-growth-600">+{roadmap?.step1_automator?.hoursRecovered || 12}h</span>
                </div>
                <div className="flex items-center justify-between bg-white/60 rounded-lg px-4 py-3 border border-growth-200/50">
                  <span className="text-sm text-growth-600">Monthly savings</span>
                  <span className="font-display text-xl font-bold text-growth-600">${(roi?.projectedSavings || 6750).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between bg-white/60 rounded-lg px-4 py-3 border border-growth-200/50">
                  <span className="text-sm text-growth-600">Revenue trajectory</span>
                  <span className="font-display text-xl font-bold text-growth-600">${(roi?.goalRevenue || 25000).toLocaleString()}/mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step Roadmap */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-navy-600 tracking-wide uppercase mb-3">
              <span className="w-8 h-px bg-navy-300" />
              Your Roadmap
              <span className="w-8 h-px bg-navy-300" />
            </span>
            <h3 className="font-display text-display-sm text-navy-900">
              Three Steps to Operational Freedom
            </h3>
          </div>

          <div className="space-y-4">
            {/* Step 1: The Automator */}
            <div className="card p-6 animate-slide-up" style={{ animationDelay: '0ms' }}>
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-growth-100 rounded-2xl flex items-center justify-center border-2 border-growth-200">
                    <span className="font-display text-2xl font-bold text-growth-600">1</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h4 className="font-display text-xl font-semibold text-navy-900">
                      {roadmap?.step1_automator?.title || "The Automator"}
                    </h4>
                    <span className="text-xs bg-growth-100 text-growth-700 px-3 py-1 rounded-full font-semibold">
                      Quick Win
                    </span>
                  </div>
                  <p className="text-navy-600 mb-4 leading-relaxed">{roadmap?.step1_automator?.description}</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-growth-50 border border-growth-100 rounded-xl px-4 py-3">
                      <p className="text-xs text-growth-600 font-medium mb-1">Hours Recovered/Week</p>
                      <p className="font-display text-2xl font-bold text-growth-700">{roadmap?.step1_automator?.hoursRecovered || 8}+</p>
                    </div>
                    <div className="bg-cream-100 border border-navy-100 rounded-xl px-4 py-3">
                      <p className="text-xs text-navy-500 font-medium mb-1">First Action</p>
                      <p className="text-sm text-navy-700 font-medium">{roadmap?.step1_automator?.implementation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: The Multiplier */}
            <div className="card p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-navy-100 rounded-2xl flex items-center justify-center border-2 border-navy-200">
                    <span className="font-display text-2xl font-bold text-navy-600">2</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h4 className="font-display text-xl font-semibold text-navy-900">
                      {roadmap?.step2_multiplier?.title || "The Multiplier"}
                    </h4>
                    <span className="text-xs bg-navy-100 text-navy-700 px-3 py-1 rounded-full font-semibold">
                      Scale
                    </span>
                  </div>
                  <p className="text-navy-600 mb-4 leading-relaxed">{roadmap?.step2_multiplier?.description}</p>
                  <div className="bg-navy-50 border border-navy-100 rounded-xl px-4 py-3">
                    <p className="text-xs text-navy-500 font-medium mb-1">Expected Impact</p>
                    <p className="text-navy-800 font-medium">{roadmap?.step2_multiplier?.impact}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: The Freedom Phase */}
            <div className="card-elevated p-6 bg-gradient-to-br from-white to-growth-50/30 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-navy-900 rounded-2xl flex items-center justify-center">
                    <span className="font-display text-2xl font-bold text-cream-50">3</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h4 className="font-display text-xl font-semibold text-navy-900">
                      {roadmap?.step3_freedom?.title || "The Freedom Phase"}
                    </h4>
                    <span className="text-xs bg-navy-900 text-cream-50 px-3 py-1 rounded-full font-semibold">
                      90 Days
                    </span>
                  </div>
                  <p className="text-navy-600 mb-4 leading-relaxed">{roadmap?.step3_freedom?.description}</p>
                  <div className="bg-white border border-growth-200 rounded-xl px-5 py-4">
                    <p className="text-xs text-growth-600 font-semibold mb-2 tracking-wide uppercase">Your New Reality</p>
                    <p className="font-display text-navy-900 font-medium text-lg">{roadmap?.step3_freedom?.futureState}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Summary Bar */}
        <div className="bg-navy-900 rounded-2xl p-6 md:p-8 text-white mb-12 animate-slide-up relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />

          <div className="relative">
            <h3 className="font-display text-lg font-semibold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-growth-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-growth-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              The ROI Case
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-navy-300 text-xs mb-1">Hours Lost/Week</p>
                <p className="font-display text-3xl font-bold text-friction-400">{roi?.hoursWastedWeekly || 15}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-navy-300 text-xs mb-1">Your Hourly Value</p>
                <p className="font-display text-3xl font-bold text-white">${roi?.hourlyValue || 150}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-navy-300 text-xs mb-1">Monthly Bleed</p>
                <p className="font-display text-3xl font-bold text-friction-400">${(roi?.monthlyCostOfBottleneck || 9000).toLocaleString()}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-navy-300 text-xs mb-1">Potential Savings</p>
                <p className="font-display text-3xl font-bold text-growth-400">${(roi?.projectedSavings || 6750).toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-growth-500/20 to-growth-600/20 rounded-xl p-5 border border-growth-500/30">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-growth-300 text-sm font-medium mb-1">Revenue Trajectory</p>
                  <p className="text-white">
                    <span className="font-display text-3xl font-bold">${(roi?.currentRevenue || 10000).toLocaleString()}</span>
                    <svg className="w-6 h-6 inline mx-3 text-growth-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span className="font-display text-3xl font-bold text-growth-400">${(roi?.goalRevenue || 25000).toLocaleString()}</span>
                    <span className="text-navy-300 text-sm ml-2">/month</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-growth-500/20 text-growth-400 px-5 py-2.5 rounded-full border border-growth-500/30">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">ROI in {roi?.timeToROI || "30-60 days"}</span>
                </div>
              </div>
            </div>

            {/* Calculation methodology */}
            <div className="mt-4 text-xs text-navy-400 space-y-1">
              <p className="font-medium text-navy-300">How we calculated these numbers:</p>
              <ul className="list-disc list-inside space-y-0.5 text-navy-400">
                <li>Hourly value = Your monthly revenue / 160 work hours</li>
                <li>Monthly cost = Hours you reported ({roi?.hoursWastedWeekly}h) x 4 weeks x hourly value</li>
                <li>Potential savings = Monthly cost x 50% (conservative estimate)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Booking CTA */}
        <div className="mb-12">
          <BookingCTA
            callAgenda={callAgenda}
            topRecommendation={roadmap?.step1_automator?.implementation}
          />
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-navy-100">
          <p className="text-navy-400 text-sm">
            Powered by <span className="font-display font-medium text-navy-500">Friction Audit</span> AI Analysis
          </p>
        </div>
      </main>
    </div>
  )
}
