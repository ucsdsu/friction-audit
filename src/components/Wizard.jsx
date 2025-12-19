import { useWizard } from '../hooks/useWizard'
import Stakes from './steps/Stakes'
import Constraint from './steps/CapacityTest'
import HiringTrap from './steps/HiringTrap'
import BleedingNeck from './steps/DreadTask'

export default function Wizard({ onComplete, onStartAnalyzing }) {
  const {
    step,
    data,
    setField,
    nextStep,
    prevStep,
    submitForAnalysis,
    canProceed
  } = useWizard()

  const handleFinalSubmit = async () => {
    onStartAnalyzing()
    try {
      const analysis = await submitForAnalysis()
      onComplete(analysis, data)
    } catch (err) {
      console.error('Analysis failed:', err)
    }
  }

  const totalSteps = 4

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      {/* Header */}
      <header className="glass border-b border-navy-100/50 px-4 py-4 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-cream-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="font-display font-semibold text-navy-900">The AI Implementation Blueprint</h1>
              <p className="text-xs text-navy-500">Operational Assessment</p>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-navy-400 hidden sm:block">
              Step {step} of {totalSteps}
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`step-indicator ${
                    step > s ? 'completed' :
                    step === s ? 'active' : 'pending'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-navy-100">
        <div
          className="h-full bg-growth-500 transition-all duration-500 ease-out"
          style={{ width: `${((step - 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-xl">
          {/* Step 1: The Scale (Revenue) */}
          {step === 1 && (
            <Stakes
              currentRevenue={data.currentRevenue}
              onChangeCurrentRevenue={(val) => setField('currentRevenue', val)}
              onNext={nextStep}
              canProceed={canProceed(1)}
            />
          )}

          {/* Step 2: The Constraint */}
          {step === 2 && (
            <Constraint
              value={data.constraint}
              onChange={(val) => setField('constraint', val)}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {/* Step 3: The Hiring Trap */}
          {step === 3 && (
            <HiringTrap
              value={data.hiringTrap}
              onChange={(val) => setField('hiringTrap', val)}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {/* Step 4: The Bleeding Neck */}
          {step === 4 && (
            <BleedingNeck
              value={data.bleedingNeck}
              onChange={(val) => setField('bleedingNeck', val)}
              onSubmit={handleFinalSubmit}
              onBack={prevStep}
              canProceed={canProceed(4)}
            />
          )}

          {step === 5 && (
            <ProcessingScreen />
          )}
        </div>
      </main>
    </div>
  )
}

function ProcessingScreen() {
  return (
    <div className="py-8 animate-fade-in">
      <div className="card-elevated max-w-md mx-auto p-8 text-center">
        {/* Scanning animation */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Outer ring */}
          <div className="absolute inset-0 border-2 border-navy-100 rounded-full" />
          {/* Scanning line */}
          <div className="absolute inset-2 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-b from-growth-500/20 via-growth-500/10 to-transparent animate-scan" />
          </div>
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-growth-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>

        <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
          Analyzing Operational Throughput
        </h3>
        <p className="text-navy-500 text-sm mb-6">
          Generating your implementation roadmap...
        </p>

        {/* Progress steps */}
        <div className="space-y-2 text-left max-w-xs mx-auto font-mono text-sm">
          {[
            '> Analyzing Operational Throughput...',
            '> Calculating "Headcount Savings" vs. Automation...',
            '> Matching Bottleneck to Agentic Models...',
            '> Generating Implementation Roadmap...',
          ].map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-3 animate-fade-in text-navy-600"
              style={{ animationDelay: `${i * 0.6}s`, opacity: 0 }}
            >
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
