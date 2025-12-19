export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen bg-cream-50 relative overflow-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-growth-100/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-navy-100/30 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-cream-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-display font-semibold text-xl text-navy-900">AI Feasibility Scope</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm text-navy-500">
            <span className="w-2 h-2 bg-growth-500 rounded-full animate-pulse-subtle" />
            <span>3-minute assessment</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 px-6 pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="mb-8 animate-fade-in">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-navy-600 tracking-wide uppercase">
              <span className="w-8 h-px bg-navy-300" />
              External AI Architects
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-display-lg md:text-display-xl text-navy-900 mb-8 animate-slide-up">
            Grow Your Revenue, <span className="underline-accent">Not Your Headcount.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-navy-600 leading-relaxed max-w-3xl mb-12 animate-slide-up stagger-1" style={{ opacity: 0 }}>
            You are hitting a ceiling because your operations rely on human speed. We identify the manual workflows capping your growth and replace them with <span className="font-semibold text-navy-800">AI Agents</span> that work 24/7—so you can scale to $10M without bloating your payroll.
          </p>

          {/* The 3-step bridge */}
          <div className="grid md:grid-cols-3 gap-6 mb-14 animate-slide-up stagger-2" style={{ opacity: 0 }}>
            {[
              {
                step: '01',
                title: 'Scope',
                desc: 'Identify the specific "grunt work" (Data Entry, Outreach, Support) that is forcing you to hire more staff.',
              },
              {
                step: '02',
                title: 'Architect',
                desc: 'Design a "Parallel Workforce" using AI Tools (Lindy, Claude) that costs a fraction of a human employee.',
              },
              {
                step: '03',
                title: 'Deploy',
                desc: 'Receive a Fixed-Timeline Implementation Plan to automate that workflow completely in under 30 days.',
              },
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-sm text-navy-300 tabular-nums">{item.step}</span>
                  <span className="w-6 h-px bg-navy-200 group-hover:w-10 group-hover:bg-growth-400 transition-all duration-300" />
                </div>
                <h3 className="font-display text-lg font-semibold text-navy-800 mb-1">{item.title}</h3>
                <p className="text-navy-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="animate-slide-up stagger-3" style={{ opacity: 0 }}>
            <button
              onClick={onStart}
              className="btn-primary text-lg group"
            >
              Initialize Feasibility Scope
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            <p className="mt-4 text-sm text-navy-400">
              Free • 3 Minutes • No "Consultant Fluff"
            </p>
          </div>

          {/* Social proof / Stats */}
          <div className="mt-20 pt-12 border-t border-navy-100 animate-fade-in stagger-4" style={{ opacity: 0 }}>
            <div className="grid grid-cols-3 gap-8 max-w-2xl">
              <div>
                <p className="font-display text-3xl font-semibold text-navy-900">4</p>
                <p className="text-sm text-navy-500 mt-1">Operational questions</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-navy-900">1</p>
                <p className="text-sm text-navy-500 mt-1">Bottleneck identified</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-navy-900">30-day</p>
                <p className="text-sm text-navy-500 mt-1">Implementation plan</p>
              </div>
            </div>
            <p className="text-xs text-navy-400 mt-8">Results tailored to your revenue level and specific workflow.</p>
          </div>
        </div>
      </main>

      {/* Footer accent */}
      <footer className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-growth-500 to-transparent opacity-50" />
    </div>
  )
}
