import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import pg from 'pg'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

// Database setup
const pool = process.env.DATABASE_URL
  ? new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
  : null

async function initDb() {
  if (!pool) return
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        revenue TEXT,
        constraint_area TEXT,
        hiring_trap TEXT,
        bleeding_neck TEXT
      )
    `)
    console.log('Database initialized')
  } catch (err) {
    console.error('Database init error:', err)
  }
}
initDb()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))

// Constraint labels
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

// Revenue labels (annual)
const REVENUE_LABELS = {
  'under-500k': { label: 'Under $500k' },
  '1m-3m': { label: '$1M – $3M' },
  '3m-10m': { label: '$3M – $10M' },
  '10m-plus': { label: '$10M+' }
}

app.post('/api/analyze', async (req, res) => {
  const { currentRevenue, constraint, hiringTrap, bleedingNeck } = req.body
  const apiKey = process.env.GEMINI_API_KEY

  if (!currentRevenue || !constraint || !hiringTrap || !bleedingNeck) {
    return res.status(400).json({ error: 'All wizard fields are required' })
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not set' })
  }

  // Log submission to database
  if (pool) {
    try {
      await pool.query(
        `INSERT INTO submissions (revenue, constraint_area, hiring_trap, bleeding_neck) VALUES ($1, $2, $3, $4)`,
        [currentRevenue, constraint, hiringTrap, bleedingNeck]
      )
    } catch (err) {
      console.error('Failed to log submission:', err)
    }
  }

  const constraintLabel = CONSTRAINT_LABELS[constraint] || 'operational'
  const hiringLabel = HIRING_TRAP_LABELS[hiringTrap] || 'a hiring challenge'
  const revenueLabel = REVENUE_LABELS[currentRevenue]?.label || currentRevenue

  const analysisPrompt = `You are a business strategist analyzing a business owner's workflow constraints for an AI automation feasibility assessment.

INPUTS:
- Annual Revenue: ${revenueLabel}
- Primary Constraint Area: ${constraintLabel} - this is where the business would break if the owner stopped working
- Why They Haven't Hired: ${hiringLabel}
- Specific Repetitive Task ("Bleeding Neck"): "${bleedingNeck}"

Generate JSON (no markdown). Focus on QUALITATIVE insights for deploying AI agents to replace manual labor.

{
  "diagnosis": {
    "rootCause": "1-2 sentence description tying together their constraint, hiring trap, and bleeding neck task",
    "bottleneckType": "${constraint}",
    "bottleneckCategory": "Human" OR "Process" OR "Tech",
    "currentPain": "Brief emotional state description"
  },
  "roadmap": {
    "step1_automator": {
      "title": "Short title for the AI Agent solution",
      "description": "Specific description of what an AI agent would do to handle their bleeding neck task: ${bleedingNeck}",
      "implementation": "First concrete action to start the build"
    },
    "step2_multiplier": {
      "title": "Short title",
      "description": "How the AI agent integrates with their existing systems/CRM",
      "impact": "Use hedged language: 'potential to', 'positioned for', 'up to'"
    },
    "step3_freedom": {
      "title": "Short title",
      "description": "30-day outcome after the implementation sprint",
      "futureState": "Paint the picture of ${constraintLabel.toLowerCase()} running without manual intervention"
    }
  },
  "callAgenda": [
    "Specific agenda item about their ${constraintLabel.toLowerCase()} workflow",
    "Review current tech stack for integration",
    "Map the 30-day implementation timeline"
  ]
}

CRITICAL: Focus on personalized, qualitative content. The UI will handle static claims like "20-30 hours saved."`

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

    let llmData
    try {
      llmData = JSON.parse(analysisText)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      // Fallback qualitative content
      llmData = {
        diagnosis: {
          rootCause: `Your ${constraintLabel.toLowerCase()} workflow around "${bleedingNeck}" is consuming significant hours—and you haven't delegated it because ${hiringLabel}.`,
          bottleneckType: constraint,
          bottleneckCategory: 'Process',
          currentPain: "Feeling stretched thin and reactive"
        },
        roadmap: {
          step1_automator: {
            title: "The Immediate Relief",
            description: `Deploy an AI agent to handle: ${bleedingNeck}`,
            implementation: "Map current workflow and identify automation candidates"
          },
          step2_multiplier: {
            title: "The Growth Multiplier",
            description: "Build a custom logic layer to sync with your existing systems",
            impact: "Positioned for more volume without proportional headcount increase"
          },
          step3_freedom: {
            title: "The Freedom Phase",
            description: "Fully automated workflow running 24/7",
            futureState: `No more manual ${constraintLabel.toLowerCase()} tasks—your AI agent handles it all`
          }
        },
        callAgenda: [
          `Review your ${constraintLabel.toLowerCase()} workflow and current tech stack`,
          "Identify specific automation opportunities",
          "Map the 30-day implementation timeline"
        ]
      }
    }

    const finalResponse = {
      diagnosis: llmData.diagnosis || {},
      roadmap: {
        step1_automator: llmData.roadmap?.step1_automator || {},
        step2_multiplier: llmData.roadmap?.step2_multiplier || {},
        step3_freedom: llmData.roadmap?.step3_freedom || {}
      },
      callAgenda: llmData.callAgenda || [
        `Review your ${constraintLabel.toLowerCase()} workflow`,
        "Map 30-day implementation plan",
        "Identify quick wins"
      ]
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
