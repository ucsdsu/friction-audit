import { useState, useRef, useEffect } from 'react'

const TOOL_KEYWORDS = [
  'hubspot', 'stripe', 'airtable', 'spreadsheet', 'excel', 'sheets', 'google sheets',
  'email', 'gmail', 'outlook', 'crm', 'slack', 'notion', 'zapier', 'calendar',
  'trello', 'asana', 'quickbooks', 'xero', 'mailchimp', 'salesforce', 'zoom',
  'invoice', 'shopify', 'squarespace', 'wordpress', 'wix', 'typeform', 'jotform',
  'docusign', 'dropbox', 'drive', 'clickup', 'monday', 'freshbooks', 'wave',
  'gusto', 'square', 'paypal', 'venmo', 'twilio', 'intercom', 'zendesk'
]

export default function DreadTask({ value, hoursPerWeek, onChange, onHoursChange, onNext, canProceed }) {
  const inputRef = useRef(null)

  const hasToolMention = TOOL_KEYWORDS.some(tool =>
    value.toLowerCase().includes(tool)
  )
  const showNudge = value.length > 10 && value.length < 60 && !hasToolMention

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
      <div className="mb-6">
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

        {/* Specificity nudge */}
        <div
          className={`flex items-start gap-2.5 text-sm text-amber-700 bg-amber-50
                     border border-amber-200 rounded-lg px-4 py-3 mt-3
                     transition-all duration-300 overflow-hidden
                     ${showNudge ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 py-0 mt-0 border-0'}`}
        >
          <span className="text-amber-500 mt-0.5">💡</span>
          <span>
            <strong>Tip:</strong> Mentioning specific tools (like "HubSpot", "spreadsheets", or "Stripe") helps us give more actionable recommendations.
          </span>
        </div>
      </div>

      {/* Hours input */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-navy-700 mb-2">
          How many hours per week does this task consume?
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min="1"
            max="40"
            value={hoursPerWeek}
            onChange={(e) => onHoursChange(e.target.value)}
            placeholder="e.g., 5"
            className="w-24 px-4 py-3 bg-white border border-navy-200 rounded-xl
                     text-navy-900 placeholder-navy-400
                     focus:outline-none focus:ring-2 focus:ring-growth-500/50 focus:border-growth-500
                     transition-all duration-200"
          />
          <span className="text-navy-500">hours/week</span>
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
