const impactColors = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-green-100 text-green-700 border-green-200'
}

const impactBars = {
  high: 'w-full bg-red-500',
  medium: 'w-2/3 bg-amber-500',
  low: 'w-1/3 bg-green-500'
}

export default function BottleneckCard({ bottleneck, index, hourlyRate }) {
  const weeklyCost = bottleneck.hoursPerWeek * hourlyRate
  const monthlyCost = weeklyCost * 4

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-lg text-slate-600 font-semibold text-sm">
            #{index + 1}
          </span>
          <h3 className="font-semibold text-slate-900">{bottleneck.title}</h3>
        </div>
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${impactColors[bottleneck.impact]}`}>
          {bottleneck.impact} impact
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-600 text-sm mb-4 leading-relaxed">{bottleneck.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-xs text-slate-500 mb-1">Time Lost Weekly</p>
          <p className="font-semibold text-slate-900">{bottleneck.hoursPerWeek} hours</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-xs text-slate-500 mb-1">Monthly Cost</p>
          <p className="font-semibold text-red-600">${monthlyCost.toLocaleString()}</p>
        </div>
      </div>

      {/* Impact bar */}
      <div className="mb-4">
        <p className="text-xs text-slate-500 mb-1.5">Impact Level</p>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${impactBars[bottleneck.impact]}`}></div>
        </div>
      </div>

      {/* Solution */}
      <div className="bg-sky-50 border border-sky-100 rounded-lg p-3">
        <p className="text-xs text-sky-600 font-medium mb-1">Suggested Solution</p>
        <p className="text-sm text-sky-800">{bottleneck.solution}</p>
      </div>
    </div>
  )
}
