// Use environment variable to toggle mock mode for local testing
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const API_BASE = '/api'

export async function getAnalysis(wizardData) {
  if (USE_MOCK) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2500))
    const userHours = parseInt(wizardData.hoursPerWeek) || 5
    const hoursRecoverable = Math.min(Math.round(userHours * 0.6), userHours)
    const hourlyValue = Math.round(getRevenueValue(wizardData.currentRevenue) / 160)
    return {
      diagnosis: {
        rootCause: `Your "${wizardData.dreadTask}" is consuming ${userHours} hours/week - this is your primary constraint.`,
        bottleneckType: wizardData.capacityTest === 'break' ? 'fulfillment' : 'sales',
        bottleneckCategory: 'Process',
        currentPain: "Feeling underwater and overwhelmed, constantly putting out fires instead of building systems"
      },
      roadmap: {
        step1_automator: {
          title: "The Immediate Relief",
          description: `Automate your ${wizardData.timeAudit || 'most time-consuming tasks'} using AI-powered workflows.`,
          hoursRecovered: hoursRecoverable,
          implementation: "Set up Zapier + ChatGPT to handle routine communications and admin tasks"
        },
        step2_multiplier: {
          title: "The Growth Multiplier",
          description: "Build systems that can help you handle more clients without proportionally more work.",
          impact: "Potential to increase capacity without hiring"
        },
        step3_freedom: {
          title: "The Freedom Phase",
          description: "Streamlined operations with significantly reduced manual work.",
          futureState: `Working ON your business with up to ${hoursRecoverable} hours back each week`
        }
      },
      roi: {
        currentRevenue: getRevenueValue(wizardData.currentRevenue),
        goalRevenue: getRevenueValue(wizardData.goalRevenue),
        hoursWastedWeekly: userHours,
        hourlyValue: hourlyValue,
        monthlyCostOfBottleneck: userHours * 4 * hourlyValue,
        projectedSavings: Math.round(userHours * 4 * hourlyValue * 0.5),
        timeToROI: "30-60 days"
      },
      callAgenda: [
        `Deep-dive into your ${wizardData.timeAudit || 'workflow'} and map automation opportunities`,
        "Design your personalized 90-day implementation roadmap",
        "Identify 2-3 quick wins you can implement this week"
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

// Helper to convert revenue range to number
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
