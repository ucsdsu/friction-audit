import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))

app.post('/api/analyze', async (req, res) => {
  const { dreadTask, hoursPerWeek, capacityTest, timeAudit, currentRevenue, goalRevenue } = req.body
  const apiKey = process.env.GEMINI_API_KEY

  if (!dreadTask || !hoursPerWeek || !capacityTest || !timeAudit || !currentRevenue || !goalRevenue) {
    return res.status(400).json({ error: 'All wizard fields are required' })
  }

  const userHours = parseInt(hoursPerWeek) || 5

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not set' })
  }

  const revenueValues = {
    'under-5k': 3000, '5k-10k': 7500, '10k-25k': 17500, '25k-50k': 37500, '50k-plus': 75000
  }
  const currentRevenueValue = revenueValues[currentRevenue] || 10000
  const goalRevenueValue = revenueValues[goalRevenue] || 25000
  const hourlyValue = Math.round(currentRevenueValue / 160)

  const capacityMsg = capacityTest === 'grow' 
    ? 'They said "Grow" - they need MORE leads, indicating a SALES bottleneck'
    : 'They said "Break" - they are already overwhelmed, indicating a FULFILLMENT/OPERATIONS bottleneck'

  const analysisPrompt = `You are the "Lead Architect," a world-class business strategist.

BUSINESS OWNER RESPONSES:

**The Dread Task:** "${dreadTask}"
**Hours spent on this task:** ${userHours} hours/week

**The Capacity Test:** ${capacityMsg}

**The Time Audit:** ${timeAudit}

**The Stakes:**
- Current: ${currentRevenue} (~$${currentRevenueValue}/month)
- Goal: ${goalRevenue} (~$${goalRevenueValue}/month)
- Hourly value: $${hourlyValue}/hour

Generate a JSON response (no markdown):

{
  "diagnosis": {
    "rootCause": "The #1 bottleneck in 1-2 sentences",
    "bottleneckType": "sales OR fulfillment OR operations",
    "bottleneckCategory": "Human (people/delegation) OR Process (workflow/systems) OR Tech (tools/automation)",
    "currentPain": "Emotional state"
  },
  "roadmap": {
    "step1_automator": {
      "title": "The Immediate Relief",
      "description": "Specific automation to reclaim time (be realistic based on ${userHours}h/week they spend)",
      "hoursRecovered": ${Math.min(Math.round(userHours * 0.6), userHours)},
      "implementation": "First action to take"
    },
    "step2_multiplier": {
      "title": "The Growth Multiplier",
      "description": "How to scale without manual effort",
      "impact": "What changes (use hedged language like 'potential to' or 'up to')"
    },
    "step3_freedom": {
      "title": "The Freedom Phase",
      "description": "Realistic business improvement in 90 days",
      "futureState": "Achievable vision (avoid absolute claims like 'zero hours' or exact multipliers)"
    }
  },
  "roi": {
    "currentRevenue": ${currentRevenueValue},
    "goalRevenue": ${goalRevenueValue},
    "hoursWastedWeekly": ${userHours},
    "hourlyValue": ${hourlyValue},
    "monthlyCostOfBottleneck": ${hourlyValue * userHours * 4},
    "projectedSavings": ${Math.round(hourlyValue * userHours * 4 * 0.5)},
    "timeToROI": "30-60 days"
  },
  "callAgenda": [
    "Deep-dive into your workflow",
    "Map out the 90-day plan",
    "Identify quick wins"
  ]
}

IMPORTANT:
- Use the EXACT hoursWastedWeekly value of ${userHours} provided
- hoursRecovered should not exceed ${userHours}
- Be specific with tool recommendations but realistic with claims`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: analysisPrompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 2500 }
        }),
      }
    )

    if (!response.ok) {
      console.error('Gemini API error:', await response.text())
      return res.status(500).json({ error: 'Failed to generate analysis' })
    }

    const result = await response.json()
    let analysisText = result.candidates?.[0]?.content?.parts?.[0]?.text || ''
    analysisText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

    try {
      return res.json(JSON.parse(analysisText))
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      const hoursRecoverable = Math.min(Math.round(userHours * 0.6), userHours)
      return res.json({
        diagnosis: {
          rootCause: `Your "${dreadTask}" is consuming ${userHours} hours/week. This is your primary constraint.`,
          bottleneckType: capacityTest === 'break' ? 'fulfillment' : 'sales',
          bottleneckCategory: 'Process',
          currentPain: "Feeling overwhelmed and underwater"
        },
        roadmap: {
          step1_automator: { title: "The Immediate Relief", description: `Automate your ${timeAudit}`, hoursRecovered: hoursRecoverable, implementation: "Set up Zapier + ChatGPT" },
          step2_multiplier: { title: "The Growth Multiplier", description: "Create systems to potentially handle more volume", impact: "Increase capacity without additional hires" },
          step3_freedom: { title: "The Freedom Phase", description: "Streamlined business operations", futureState: `Working ON your business with up to ${hoursRecoverable} hours back weekly` }
        },
        roi: { currentRevenue: currentRevenueValue, goalRevenue: goalRevenueValue, hoursWastedWeekly: userHours, hourlyValue, monthlyCostOfBottleneck: userHours * 4 * hourlyValue, projectedSavings: Math.round(userHours * 4 * hourlyValue * 0.5), timeToROI: "30-60 days" },
        callAgenda: [`Deep-dive into your ${timeAudit} workflow`, "Design your 90-day roadmap", "Identify quick wins"]
      })
    }
  } catch (error) {
    console.error('Analysis error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Serve React app for all other routes (Express 5 syntax)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})