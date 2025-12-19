import { useRef, useEffect } from 'react'

export default function BleedingNeck({ value, onChange, onSubmit, onBack, canProceed }) {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && canProceed) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-growth-500 text-sm font-semibold">04</span>
        <span className="w-8 h-px bg-growth-300" />
        <span className="text-navy-400 text-xs uppercase tracking-wide">The "Bleeding Neck"</span>
      </div>

      {/* Question */}
      <h2 className="font-display text-display-sm md:text-display-md text-navy-900 mb-4">
        Describe the one <span className="underline-accent">specific repetitive task</span> that burns the most hours for your team right now.
      </h2>

      <p className="text-navy-500 mb-8">
        Be specific—the more detail you give, the more actionable your implementation plan will be.
      </p>

      {/* Input */}
      <div className="mb-8">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='e.g., "Manually copying leads from email to CRM," "Chasing invoices," "Scheduling field techs"'
          rows={4}
          maxLength={500}
          className="w-full px-5 py-4 bg-white border border-navy-200 rounded-xl
                   text-navy-900 placeholder-navy-400
                   focus:outline-none focus:ring-2 focus:ring-growth-500/50 focus:border-growth-500
                   transition-all duration-200 resize-none"
        />
        <div className="flex justify-between mt-2 text-xs text-navy-400">
          <span>{value.length < 10 ? `${10 - value.length} more characters needed` : 'Looking good!'}</span>
          <span>{value.length}/500</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onSubmit}
        disabled={!canProceed}
        className="btn-primary w-full text-base group mb-4"
      >
        Generate My Implementation Plan
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
    </div>
  )
}
