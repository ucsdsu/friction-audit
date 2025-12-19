import { useState, useCallback } from 'react'
import { getAnalysis } from '../lib/api'

const INITIAL_DATA = {
  currentRevenue: '',      // Q1: The Scale - annual revenue bracket
  constraint: '',          // Q2: The Constraint - where business breaks
  hiringTrap: '',          // Q3: The Hiring Trap - why haven't hired
  bleedingNeck: '',        // Q4: The Bleeding Neck - specific repetitive task
}

export function useWizard() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState(INITIAL_DATA)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState(null)

  const setField = useCallback((field, value) => {
    setData(prev => ({ ...prev, [field]: value }))
  }, [])

  const nextStep = useCallback(() => {
    setStep(prev => Math.min(prev + 1, 5))
  }, [])

  const prevStep = useCallback(() => {
    setStep(prev => Math.max(prev - 1, 1))
  }, [])

  const submitForAnalysis = useCallback(async () => {
    setIsAnalyzing(true)
    setError(null)
    setStep(5) // Move to processing screen

    try {
      const analysis = await getAnalysis(data)
      return analysis
    } catch (err) {
      setError('Failed to generate analysis. Please try again.')
      console.error('Analysis error:', err)
      throw err
    } finally {
      setIsAnalyzing(false)
    }
  }, [data])

  const reset = useCallback(() => {
    setStep(1)
    setData(INITIAL_DATA)
    setError(null)
    setIsAnalyzing(false)
  }, [])

  // Validation helpers
  const canProceed = useCallback((currentStep) => {
    switch (currentStep) {
      case 1:
        // The Scale: must select a revenue bracket
        return !!data.currentRevenue
      case 2:
        // The Constraint: must select where business breaks
        return !!data.constraint
      case 3:
        // The Hiring Trap: must select why haven't hired
        return !!data.hiringTrap
      case 4:
        // The Bleeding Neck: must describe task (min 10 chars)
        return data.bleedingNeck.trim().length >= 10
      default:
        return false
    }
  }, [data])

  return {
    step,
    data,
    setField,
    nextStep,
    prevStep,
    submitForAnalysis,
    reset,
    isAnalyzing,
    error,
    canProceed
  }
}
