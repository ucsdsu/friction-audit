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

  // Revenue bracket midpoints (disclosed in UI)
  const revenueLabels = {
    'under-5k': { midpoint: 3000, label: 'Under $5k' },
    '5k-10k': { midpoint: 7500, label: '$5k-$10k' },
    '10k-25k': { midpoint: 17500, label: '$10k-$25k' },
    '25k-50k': { midpoint: 37500, label: '$25k-$50k' },
    '50k-plus': { midpoint: 75000, label: '$50k+' }
  }
  const currentRevenueValue = revenueLabels[currentRevenue]?.midpoint || 10000
  const goalRevenueValue = revenueLabels[goalRevenue]?.midpoint || 25000
  const hourlyValue = Math.round(currentRevenueValue / 160)

  // Enforce hours - user's reported value only
  const hoursRecoverable = Math.min(Math.round(userHours * 0.7), userHours) // max 70% recoverable
  const monthlyCost = userHours * 4 * hourlyValue
  const projectedSavings = Math.round(monthlyCost * 0.5) // conservative 50%

  const capacityMsg = capacityTest === 'grow' 
    ? 'They said "Grow" - they need MORE leads, indicating a SALES bottleneck'
    : 'They said "Break" - they are already overwhelmed, indicating a FULFILLMENT/OPERATIONS bottleneck'

  const analysisPrompt = `You are a business strategist analyzing a business owner's workflow constraints.

INPUTS:
- Dread Task: "${dreadTask}"
- Hours on this task: ${userHours}h/week
- Capacity: ${capacityMsg}
- Time sink: ${timeAudit}

Generate JSON (no markdown). Focus on QUALITATIVE insights only - numbers will be calculated separately.

{
  "diagnosis": {
    "rootCause": "1-2 sentence description of the core bottleneck based on their ${userHours}h/week dread task",
    "bottleneckType": "sales" OR "fulfillment" OR "operations",
    "bottleneckCategory": "Human" OR "Process" OR "Tech",
    "currentPain": "Brief emotional state description"
  },
  "roadmap": {
    "step1_automator": {
      "title": "Short title",
      "description": "Specific automation for their ${timeAudit} that could recover some of their ${userHours}h",
      "implementation": "First concrete action"
    },
    "step2_multiplier": {
      "title": "Short title",
      "description": "System to handle more volume",
      "impact": "Use hedged language: 'potential to', 'positioned for', 'up to'"
    },
    "step3_freedom": {
      "title": "Short title",
      "description": "30-day realistic outcome",
      "futureState": "Use qualified language: 'reduced time on', 'streamlined', 'more time for'. NO absolutes like 'zero hours' or '10x'"
    }
  },
  "callAgenda": [
    "Specific to their ${timeAudit}",
    "Second agenda item",
    "Third agenda item"
  ]
}

CRITICAL: Do NOT output any numeric values - they are calculated server-side. Focus only on personalized text.`

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

    // Server-enforced ROI values (never from LLM)
    const enforcedRoi = {
      currentRevenue: currentRevenueValue,
      currentRevenueLabel: revenueLabels[currentRevenue]?.label || currentRevenue,
      goalRevenue: goalRevenueValue,
      goalRevenueLabel: revenueLabels[goalRevenue]?.label || goalRevenue,
      hoursWastedWeekly: userHours,
      hourlyValue,
      monthlyCostOfBottleneck: monthlyCost,
      projectedSavings,
      timeToROI: "30-60 days"
    }

    let llmData
    try {
      llmData = JSON.parse(analysisText)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      // Fallback qualitative content
      llmData = {
        diagnosis: {
          rootCause: `Your "${dreadTask}" is consuming ${userHours} hours/week - this is your primary constraint.`,
          bottleneckType: capacityTest === 'break' ? 'fulfillment' : 'sales',
          bottleneckCategory: 'Process',
          currentPain: "Feeling stretched thin and reactive"
        },
        roadmap: {
          step1_automator: { title: "The Immediate Relief", description: `Streamline your ${timeAudit} workflow`, implementation: "Audit current process and identify automation candidates" },
          step2_multiplier: { title: "The Growth Multiplier", description: "Build systems for increased capacity", impact: "Positioned for more volume without proportional time increase" },
          step3_freedom: { title: "The Freedom Phase", description: "Streamlined operations", futureState: `Reduced time on ${timeAudit}, more focus on strategic work` }
        },
        callAgenda: [`Review your ${timeAudit} workflow`, "Identify quick automation wins", "Map 30-day implementation"]
      }
    }

    // ENFORCE all numeric values - override anything LLM might have added
    const finalResponse = {
      diagnosis: llmData.diagnosis || {},
      roadmap: {
        step1_automator: {
          ...(llmData.roadmap?.step1_automator || {}),
          hoursRecovered: hoursRecoverable // ENFORCED
        },
        step2_multiplier: llmData.roadmap?.step2_multiplier || {},
        step3_freedom: llmData.roadmap?.step3_freedom || {}
      },
      roi: enforcedRoi, // ENFORCED - all server-calculated
      callAgenda: llmData.callAgenda || [`Review your ${timeAudit} workflow`, "Map 30-day plan", "Identify quick wins"]
    }

    return res.json(finalResponse)
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