import { useState, useCallback } from 'react'
import { getAnalysis } from '../lib/api'

const INITIAL_DATA = {
  dreadTask: '',
  capacityTest: '', // 'grow' or 'break'
  timeAudit: '',
  currentRevenue: '',
  goalRevenue: ''
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
        return data.dreadTask.trim().length >= 10
      case 2:
        return data.capacityTest === 'grow' || data.capacityTest === 'break'
      case 3:
        return data.timeAudit.trim().length > 0
      case 4:
        return data.currentRevenue && data.goalRevenue
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
