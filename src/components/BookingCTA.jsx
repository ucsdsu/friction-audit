const BOOKING_URL = import.meta.env.VITE_BOOKING_URL || 'https://cal.com/jon-stenstrom-ai/ai-consultation?overlayCalendar=true'

export default function BookingCTA({ callAgenda, topRecommendation }) {
  return (
    <div className="card-elevated overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="bg-navy-900 px-6 py-6 relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-growth-400 rounded-full animate-pulse-subtle" />
            <span className="text-growth-400 text-xs font-medium tracking-wide uppercase">Next Step</span>
          </div>
          <h3 className="font-display text-2xl font-semibold text-cream-50 mb-1">
            Engineering Brief
          </h3>
          <p className="text-navy-300 text-sm">
            This scope is a simulation. To confirm we can build this for your specific business context, let's review your tech stack.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-white">
        {/* Top recommendation highlight */}
        {topRecommendation && (
          <div className="bg-growth-50 border border-growth-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-growth-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-growth-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-growth-600 font-semibold mb-1 tracking-wide uppercase">Your Quick Win</p>
                <p className="text-sm text-growth-800 leading-relaxed">{topRecommendation}</p>
              </div>
            </div>
          </div>
        )}

        {/* What we'll discuss */}
        {callAgenda && callAgenda.length > 0 && (
          <div className="mb-6">
            <h4 className="font-display text-sm font-semibold text-navy-900 mb-4">What we'll cover:</h4>
            <ul className="space-y-3">
              {callAgenda.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-navy-600">
                  <div className="flex-shrink-0 w-5 h-5 bg-growth-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-growth-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Button */}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full text-center text-base"
        >
          Book Implementation Brief
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        {/* Trust elements */}
        <p className="mt-4 text-center text-xs text-navy-400">
          Speak directly with the Architect. No sales pressure.
        </p>

        <div className="mt-4 flex items-center justify-center gap-5 text-xs text-navy-400">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            15 minutes
          </span>
          <span className="w-1 h-1 bg-navy-200 rounded-full" />
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Video call
          </span>
          <span className="w-1 h-1 bg-navy-200 rounded-full" />
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            No obligation
          </span>
        </div>
      </div>
    </div>
  )
}
