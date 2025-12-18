import { useState } from 'react'

const TIME_OPTIONS = [
  { id: 'email', label: 'Email & client communication', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 'admin', label: 'Admin & bookkeeping', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 'content', label: 'Content creation & marketing', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { id: 'scheduling', label: 'Scheduling & coordination', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'proposals', label: 'Proposals & invoicing', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
]

export default function TimeAudit({ value, onChange, onNext, onBack, canProceed }) {
  const [showOther, setShowOther] = useState(false)
  const [otherText, setOtherText] = useState('')

  const handleSelect = (id) => {
    if (id === 'other') {
      setShowOther(true)
      onChange('')
    } else {
      setShowOther(false)
      onChange(id)
    }
  }

  const handleOtherSubmit = () => {
    if (otherText.trim()) {
      onChange(otherText.trim())
      onNext()
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-growth-500 text-sm font-semibold">03</span>
        <span className="w-8 h-px bg-growth-300" />
        <span className="text-navy-400 text-xs uppercase tracking-wide">The Time Audit</span>
      </div>

      {/* Question */}
      <h2 className="font-display text-display-sm md:text-display-md text-navy-900 mb-4">
        What takes up most of your <span className="underline-accent">manual work</span> time?
      </h2>

      <p className="text-navy-500 mb-8">
        Select the area that consumes the majority of your "keyboard time."
      </p>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {TIME_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              value === option.id
                ? 'border-growth-500 bg-growth-50'
                : 'border-navy-200 bg-white hover:border-growth-300 hover:bg-growth-50/50'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              value === option.id ? 'bg-growth-500' : 'bg-navy-100'
            }`}>
              <svg className={`w-5 h-5 ${value === option.id ? 'text-white' : 'text-navy-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={option.icon} />
              </svg>
            </div>
            <span className={`font-medium ${value === option.id ? 'text-growth-700' : 'text-navy-700'}`}>
              {option.label}
            </span>
            {value === option.id && (
              <svg className="w-5 h-5 text-growth-500 ml-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            )}
          </button>
        ))}

        {/* Other option */}
        <button
          onClick={() => handleSelect('other')}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
            showOther
              ? 'border-growth-500 bg-growth-50'
              : 'border-navy-200 bg-white hover:border-growth-300 hover:bg-growth-50/50'
          }`}
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            showOther ? 'bg-growth-500' : 'bg-navy-100'
          }`}>
            <svg className={`w-5 h-5 ${showOther ? 'text-white' : 'text-navy-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <span className={`font-medium ${showOther ? 'text-growth-700' : 'text-navy-700'}`}>
            Other (specify)
          </span>
        </button>

        {/* Other text input */}
        {showOther && (
          <div className="mt-4 animate-fade-in">
            <input
              type="text"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="What takes up most of your time?"
              className="w-full px-5 py-4 bg-white border border-navy-200 rounded-xl
                       text-navy-900 placeholder-navy-400
                       focus:outline-none focus:ring-2 focus:ring-growth-500/50 focus:border-growth-500
                       transition-all duration-200"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* CTA */}
      {(!showOther || otherText.trim()) && (
        <button
          onClick={showOther ? handleOtherSubmit : onNext}
          disabled={!canProceed && !showOther}
          className="btn-primary w-full text-base group mb-4"
        >
          Continue
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      )}

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
