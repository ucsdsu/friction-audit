// Use environment variable to toggle mock mode for local testing
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const API_BASE = '/api'

export async function getAnalysis(wizardData) {
  if (USE_MOCK) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2500))
    const userHours = parseInt(wizardData.hoursPerWeek) || 5
    const hoursRecoverable = Math.min(Math.round(userHours * 0.7), userHours) // max 70%
    const currentRevenueValue = getRevenueValue(wizardData.currentRevenue)
    const goalRevenueValue = getRevenueValue(wizardData.goalRevenue)
    const hourlyValue = Math.round(currentRevenueValue / 160)
    const monthlyCost = userHours * 4 * hourlyValue
    const projectedSavings = Math.round(monthlyCost * 0.5) // conservative 50%

    return {
      diagnosis: {
        rootCause: `Your "${wizardData.dreadTask}" is consuming ${userHours} hours/week - this is your primary constraint.`,
        bottleneckType: wizardData.capacityTest === 'break' ? 'fulfillment' : 'sales',
        bottleneckCategory: 'Process',
        currentPain: "Feeling stretched thin, reactive instead of strategic"
      },
      roadmap: {
        step1_automator: {
          title: "The Immediate Relief",
          description: `Streamline your ${wizardData.timeAudit || 'workflow'} to recover some of the ${userHours}h you're currently spending.`,
          hoursRecovered: hoursRecoverable,
          implementation: "Audit current process and identify automation candidates"
        },
        step2_multiplier: {
          title: "The Growth Multiplier",
          description: "Build systems that position you for increased capacity.",
          impact: "Potential to handle more volume without proportional time increase"
        },
        step3_freedom: {
          title: "The Freedom Phase",
          description: "Streamlined operations with reduced manual overhead.",
          futureState: `Reduced time on ${wizardData.timeAudit || 'admin tasks'}, more focus on strategic growth`
        }
      },
      roi: {
        currentRevenue: currentRevenueValue,
        currentRevenueLabel: getRevenueLabel(wizardData.currentRevenue),
        goalRevenue: goalRevenueValue,
        goalRevenueLabel: getRevenueLabel(wizardData.goalRevenue),
        hoursWastedWeekly: userHours,
        hourlyValue: hourlyValue,
        monthlyCostOfBottleneck: monthlyCost,
        projectedSavings: projectedSavings,
        timeToROI: "30-60 days"
      },
      callAgenda: [
        `Review your ${wizardData.timeAudit || 'workflow'} and map automation opportunities`,
        "Identify quick wins for immediate implementation",
        "Outline 30-day roadmap priorities"
      ]
    }
  }

  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wizardData),
  })

  if (!response.ok) {
    throw new Error('Failed to generate analysis')
  }

  return response.json()
}

// Helper to convert revenue range to midpoint value
function getRevenueValue(range) {
  const values = {
    'under-5k': 3000,
    '5k-10k': 7500,
    '10k-25k': 17500,
    '25k-50k': 37500,
    '50k-plus': 75000
  }
  return values[range] || 10000
}

// Helper to get human-readable revenue label
function getRevenueLabel(range) {
  const labels = {
    'under-5k': 'Under $5k',
    '5k-10k': '$5k-$10k',
    '10k-25k': '$10k-$25k',
    '25k-50k': '$25k-$50k',
    '50k-plus': '$50k+'
  }
  return labels[range] || range
}
