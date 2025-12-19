// Use environment variable to toggle mock mode for local testing
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const API_BASE = '/api'

// Constraint labels for personalization
const CONSTRAINT_LABELS = {
  sales: 'Sales',
  operations: 'Operations',
  admin: 'Admin',
  support: 'Support',
}

// Hiring trap labels
const HIRING_TRAP_LABELS = {
  salary: "can't justify a full-time salary yet",
  messy: "the process is too messy to train someone",
  failed: "tried hiring but they couldn't do it right",
  intuition: 'it requires "Founder Intuition"',
}

export async function getAnalysis(wizardData) {
  if (USE_MOCK) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2500))

    const constraintLabel = CONSTRAINT_LABELS[wizardData.constraint] || 'operational'
    const hiringLabel = HIRING_TRAP_LABELS[wizardData.hiringTrap] || 'a hiring challenge'
    const revenueLabel = getRevenueLabel(wizardData.currentRevenue)

    return {
      diagnosis: {
        rootCause: `Your ${constraintLabel.toLowerCase()} workflow around "${wizardData.bleedingNeck}" is consuming significant hours—and you haven't delegated it because ${hiringLabel}.`,
        bottleneckType: wizardData.constraint,
        bottleneckCategory: 'Process',
        currentPain: "Feeling stretched thin, reactive instead of strategic"
      },
      roadmap: {
        step1_automator: {
          title: "The Immediate Relief",
          description: `Deploy an AI agent to handle repetitive ${constraintLabel.toLowerCase()} tasks, specifically: ${wizardData.bleedingNeck}`,
          implementation: "Map current workflow and identify automation candidates"
        },
        step2_multiplier: {
          title: "The Growth Multiplier",
          description: "Build a custom logic layer to sync data with your existing systems.",
          impact: "Positioned for more volume without proportional headcount increase"
        },
        step3_freedom: {
          title: "The Freedom Phase",
          description: "Fully automated workflow running 24/7 without manual intervention.",
          futureState: `No more manual ${constraintLabel.toLowerCase()} tasks—your AI agent handles it all`
        }
      },
      callAgenda: [
        `Review your ${constraintLabel.toLowerCase()} workflow and current tech stack`,
        "Identify specific automation opportunities for your bottleneck",
        "Outline the 30-day implementation sprint timeline"
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

// Helper to get human-readable revenue label
function getRevenueLabel(range) {
  const labels = {
    'under-500k': 'Under $500k',
    '1m-3m': '$1M – $3M',
    '3m-10m': '$3M – $10M',
    '10m-plus': '$10M+'
  }
  return labels[range] || range
}
