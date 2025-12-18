// Use environment variable to toggle mock mode for local testing
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const API_BASE = '/api'

export async function getAnalysis(wizardData) {
  if (USE_MOCK) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2500))
    return {
      diagnosis: {
        rootCause: "You're the bottleneck in your own business - spending 15+ hours weekly on tasks that should be automated, leaving no time for strategic growth.",
        bottleneckType: wizardData.capacityTest === 'break' ? 'fulfillment' : 'sales',
        currentPain: "Feeling underwater and overwhelmed, constantly putting out fires instead of building systems"
      },
      roadmap: {
        step1_automator: {
          title: "The Immediate Relief",
          description: `Automate your ${wizardData.timeAudit || 'most time-consuming tasks'} using AI-powered workflows. This is the 20% that's causing 80% of your stress.`,
          hoursRecovered: 12,
          implementation: "Set up Zapier + ChatGPT to handle routine communications and admin tasks"
        },
        step2_multiplier: {
          title: "The Growth Multiplier",
          description: "Build systems that let you handle 3x the clients without 3x the work. Create SOPs, templates, and automated follow-ups.",
          impact: "Double your capacity without hiring, finally able to take on new clients without breaking"
        },
        step3_freedom: {
          title: "The Freedom Phase",
          description: "In 90 days, you'll have a business that runs smoothly with 4 hours of daily input instead of 10.",
          futureState: "Working ON your business, not IN it - with predictable revenue and 15+ hours back each week for growth or life"
        }
      },
      roi: {
        currentRevenue: getRevenueValue(wizardData.currentRevenue),
        goalRevenue: getRevenueValue(wizardData.goalRevenue),
        hoursWastedWeekly: 15,
        hourlyValue: Math.round(getRevenueValue(wizardData.currentRevenue) / 160),
        monthlyCostOfBottleneck: Math.round(getRevenueValue(wizardData.currentRevenue) * 0.3),
        projectedSavings: Math.round(getRevenueValue(wizardData.currentRevenue) * 0.25),
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
