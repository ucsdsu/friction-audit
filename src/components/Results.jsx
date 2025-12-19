import BookingCTA from './BookingCTA'

const CONSTRAINT_LABELS = {
  sales: 'Sales',
  operations: 'Operations',
  admin: 'Admin',
  support: 'Support',
}

const REVENUE_LABELS = {
  'under-500k': 'Under $500k',
  '1m-3m': '$1M – $3M',
  '3m-10m': '$3M – $10M',
  '10m-plus': '$10M+',
}

export default function Results({ data, onRestart, wizardData }) {
  if (!data) return null

  const { diagnosis, roadmap, callAgenda } = data
  const constraintLabel = CONSTRAINT_LABELS[wizardData?.constraint] || 'operational'
  const revenueLabel = REVENUE_LABELS[wizardData?.currentRevenue] || 'your revenue level'

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
              <h1 className="font-display font-semibold text-navy-900">Automation Feasibility Report</h1>
              <p className="text-xs text-navy-500">AI Implementation Assessment</p>
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

      <main className="px-4 py-8 md:py-12 max-w-4xl mx-auto">
        {/* Status Banner */}
        <div className="bg-growth-500 text-white rounded-2xl p-6 mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-semibold uppercase tracking-wide opacity-90">Status</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            HIGH POTENTIAL FOR AI DEPLOYMENT
          </h2>
        </div>

        {/* Section 1: The Diagnosis */}
        <section className="mb-10 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-navy-900 text-cream-50 text-xs font-bold px-3 py-1 rounded-full">01</span>
            <h3 className="font-display text-xl font-semibold text-navy-900">The Diagnosis</h3>
          </div>

          <div className="card p-6">
            <h4 className="font-display text-lg font-semibold text-friction-600 mb-4">
              The "Headcount Trap" Detected
            </h4>
            <p className="text-navy-700 leading-relaxed mb-4">
              You are currently solving <span className="font-semibold text-navy-900">{constraintLabel}</span> problems with human labor. At your revenue level ({revenueLabel}), this creates a "margin crush."
            </p>
            <p className="text-navy-700 leading-relaxed">
              You do not need more employees; you need an <span className="font-semibold text-navy-900">Operating System</span>.
            </p>

            {diagnosis?.rootCause && (
              <div className="mt-6 p-4 bg-navy-50 rounded-xl border border-navy-100">
                <p className="text-navy-600 text-sm leading-relaxed">{diagnosis.rootCause}</p>
              </div>
            )}
          </div>
        </section>

        {/* Section 2: The Solution Architecture */}
        <section className="mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-navy-900 text-cream-50 text-xs font-bold px-3 py-1 rounded-full">02</span>
            <h3 className="font-display text-xl font-semibold text-navy-900">The Solution Architecture</h3>
          </div>

          <div className="card p-6">
            <h4 className="font-display text-lg font-semibold text-navy-800 mb-6">
              Recommended Stack
            </h4>

            <div className="space-y-5">
              {/* The Agent */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-growth-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-growth-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-display font-semibold text-navy-900 mb-1">The Agent</h5>
                  <p className="text-navy-600 text-sm leading-relaxed">
                    We recommend deploying an autonomous <span className="font-semibold">AI Agent</span> to handle your {constraintLabel.toLowerCase()} workflow.
                    {roadmap?.step1_automator?.description && (
                      <span className="block mt-2 text-navy-500">{roadmap.step1_automator.description}</span>
                    )}
                  </p>
                </div>
              </div>

              {/* The Brain */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-navy-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-display font-semibold text-navy-900 mb-1">The Brain</h5>
                  <p className="text-navy-600 text-sm leading-relaxed">
                    We will build a custom logic layer to ensure the data syncs perfectly with your current CRM/Database.
                  </p>
                </div>
              </div>

              {/* The Impact */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-growth-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-display font-semibold text-navy-900 mb-1">The Impact</h5>
                  <p className="text-navy-600 text-sm leading-relaxed">
                    This build will replace approximately <span className="font-bold text-growth-600">20–30 hours of human labor per week</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Offer - 30-Day Implementation Sprint */}
        <section className="mb-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-navy-900 text-cream-50 text-xs font-bold px-3 py-1 rounded-full">03</span>
            <h3 className="font-display text-xl font-semibold text-navy-900">The Offer</h3>
          </div>

          <div className="card-elevated p-6 bg-gradient-to-br from-white to-growth-50/30">
            <h4 className="font-display text-xl font-bold text-navy-900 mb-2">
              30-Day Implementation Sprint
            </h4>
            <p className="text-navy-600 mb-6">
              We do not offer "coaching." We offer a build.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { week: 'Week 1', title: 'Process Extraction & Mapping' },
                { week: 'Week 2', title: 'AI Agent Configuration (Lindy/Claude)' },
                { week: 'Week 3', title: 'Testing & Integration' },
                { week: 'Week 4', title: 'Handover & Training' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-navy-100">
                  <div className="flex-shrink-0 w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center">
                    <span className="font-display text-sm font-bold text-cream-50">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-xs text-navy-400 font-semibold uppercase tracking-wide mb-1">{item.week}</p>
                    <p className="font-medium text-navy-800 text-sm">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Call to Action */}
        <section className="mb-12 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-navy-900 text-cream-50 text-xs font-bold px-3 py-1 rounded-full">04</span>
            <h3 className="font-display text-xl font-semibold text-navy-900">Next Step</h3>
          </div>

          <BookingCTA
            callAgenda={callAgenda}
            topRecommendation={roadmap?.step1_automator?.implementation}
          />
        </section>

        {/* Footer */}
        <div className="text-center py-8 border-t border-navy-100">
          <p className="text-navy-400 text-sm">
            Powered by <span className="font-display font-medium text-navy-500">The AI Implementation Blueprint</span>
          </p>
        </div>
      </main>
    </div>
  )
}
