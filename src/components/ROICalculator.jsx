export default function ROICalculator({ data }) {
  const { currentMonthlyCost, potentialSavings, savingsPercentage, hourlyRate, bottlenecks } = data

  const totalHoursWasted = bottlenecks.reduce((sum, b) => sum + b.hoursPerWeek, 0)
  const yearlyCost = currentMonthlyCost * 12
  const yearlySavings = potentialSavings * 12

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 text-white animate-slide-up">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Your ROI Breakdown
      </h3>

      {/* Main stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-slate-400 text-xs mb-1">Hours Wasted/Week</p>
          <p className="text-2xl font-bold text-white">{totalHoursWasted}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-slate-400 text-xs mb-1">Your Hourly Value</p>
          <p className="text-2xl font-bold text-white">${hourlyRate}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-slate-400 text-xs mb-1">Monthly Cost</p>
          <p className="text-2xl font-bold text-red-400">${currentMonthlyCost.toLocaleString()}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-slate-400 text-xs mb-1">Potential Savings</p>
          <p className="text-2xl font-bold text-green-400">${potentialSavings.toLocaleString()}</p>
        </div>
      </div>

      {/* Yearly projection */}
      <div className="bg-gradient-to-r from-sky-500/20 to-blue-500/20 rounded-xl p-5 border border-sky-500/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sky-300 text-sm font-medium mb-1">Annual Impact</p>
            <p className="text-3xl font-bold text-white">
              ${yearlySavings.toLocaleString()}
              <span className="text-lg text-slate-400 font-normal ml-2">potential savings/year</span>
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full border border-green-500/30">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="font-semibold">{savingsPercentage}% efficiency gain</span>
          </div>
        </div>
      </div>

      {/* Visual comparison */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-400">Current annual cost</span>
          <span className="text-red-400 font-medium">${yearlyCost.toLocaleString()}</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-red-500 rounded-full" style={{ width: '100%' }}></div>
        </div>

        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-400">After optimization</span>
          <span className="text-green-400 font-medium">${(yearlyCost - yearlySavings).toLocaleString()}</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-1000"
            style={{ width: `${100 - savingsPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
