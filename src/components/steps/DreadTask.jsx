import { useState, useRef, useEffect } from 'react'

export default function DreadTask({ value, onChange, onNext, canProceed }) {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && canProceed) {
      onNext()
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-growth-500 text-sm font-semibold">01</span>
        <span className="w-8 h-px bg-growth-300" />
        <span className="text-navy-400 text-xs uppercase tracking-wide">The Dread Task</span>
      </div>

      {/* Question */}
      <h2 className="font-display text-display-sm md:text-display-md text-navy-900 mb-4">
        What's the one task you <span className="underline-accent">dread</span> doing every week?
      </h2>

      <p className="text-navy-500 mb-8">
        Be specific - the more detail you give, the more personalized your roadmap will be.
      </p>

      {/* Input */}
      <div className="mb-8">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Manually responding to the same client questions over and over..."
          rows={3}
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
        onClick={onNext}
        disabled={!canProceed}
        className="btn-primary w-full text-base group"
      >
        Continue
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  )
}
