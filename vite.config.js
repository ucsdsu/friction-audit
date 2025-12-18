import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// API handler plugin for local development
function apiPlugin() {
  return {
    name: 'api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) {
          return next()
        }

        // Parse JSON body
        let body = ''
        for await (const chunk of req) {
          body += chunk
        }
        const data = body ? JSON.parse(body) : {}

        const apiKey = process.env.GEMINI_API_KEY

        if (req.url === '/api/analyze' && req.method === 'POST') {
          const { dreadTask, capacityTest, timeAudit, currentRevenue, goalRevenue } = data

          if (!dreadTask || !capacityTest || !timeAudit || !currentRevenue || !goalRevenue) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'All wizard fields are required' }))
            return
          }

          if (!apiKey) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'GEMINI_API_KEY not set' }))
            return
          }

          // Convert revenue ranges to values for ROI calculations
          const revenueValues = {
            'under-5k': 3000,
            '5k-10k': 7500,
            '10k-25k': 17500,
            '25k-50k': 37500,
            '50k-plus': 75000
          }
          const currentRevenueValue = revenueValues[currentRevenue] || 10000
          const goalRevenueValue = revenueValues[goalRevenue] || 25000
          const hourlyValue = Math.round(currentRevenueValue / 160)

          const analysisPrompt = `You are the "Lead Architect," a world-class business strategist specializing in lean operations and AI automation for solopreneurs.

BUSINESS OWNER RESPONSES:

**The Dread Task (what they hate doing every week):**
"${dreadTask}"

**The Capacity Test (would 10 new leads help them grow or break them?):**
${capacityTest === 'grow' ? 'They said "Grow" - they need MORE leads, indicating a SALES bottleneck' : 'They said "Break" - they\'re already overwhelmed, indicating a FULFILLMENT/OPERATIONS bottleneck'}

**The Time Audit (what consumes most of their manual work time):**
${timeAudit}

**The Stakes:**
- Current monthly revenue: ${currentRevenue} (~$${currentRevenueValue.toLocaleString()}/month)
- Goal revenue in 12 months: ${goalRevenue} (~$${goalRevenueValue.toLocaleString()}/month)
- Implied hourly value: $${hourlyValue}/hour

Analyze this using:
- **Theory of Constraints:** Find the ONE "logjam" blocking system throughput
- **Pareto Principle:** The 20% causing 80% of the stress
- **Inversion Method:** What is currently STOPPING growth?

Generate a "Transformation Proposal" in JSON format. Respond with ONLY valid JSON (no markdown, no code blocks):

{
  "diagnosis": {
    "rootCause": "The #1 growth bottleneck in 1-2 sentences - tell them exactly why they feel stuck",
    "bottleneckType": "sales OR fulfillment OR operations",
    "currentPain": "What they're experiencing emotionally (overwhelmed, underwater, etc.)"
  },
  "roadmap": {
    "step1_automator": {
      "title": "The Immediate Relief",
      "description": "Specific AI tool or automation to reclaim 5-10 hours/week starting tomorrow",
      "hoursRecovered": 8,
      "implementation": "Concrete first action they can take"
    },
    "step2_multiplier": {
      "title": "The Growth Multiplier",
      "description": "How to redesign their core process so it scales without manual effort",
      "impact": "What changes when this is implemented"
    },
    "step3_freedom": {
      "title": "The Freedom Phase",
      "description": "What the business looks like in 90 days once this is implemented",
      "futureState": "Concrete vision of the transformed business"
    }
  },
  "roi": {
    "currentRevenue": 10000,
    "goalRevenue": 25000,
    "hoursWastedWeekly": 15,
    "hourlyValue": 150,
    "monthlyCostOfBottleneck": 9000,
    "projectedSavings": 6750,
    "timeToROI": "30-60 days"
  },
  "callAgenda": [
    "Deep-dive into your specific [bottleneck area] workflow",
    "Map out the 90-day implementation plan",
    "Identify quick wins you can implement this week"
  ]
}

Guidelines:
- Use the revenue values provided: currentRevenue=${currentRevenueValue}, goalRevenue=${goalRevenueValue}, hourlyValue=${hourlyValue}
- hoursWastedWeekly should be 10-20 based on severity of their dread task and time audit
- monthlyCostOfBottleneck = hoursWastedWeekly * 4 * hourlyValue
- projectedSavings should be 60-80% of monthlyCostOfBottleneck
- Be specific with tool recommendations (e.g., "Calendly + Zapier" not just "automation")
- Reference their specific dread task and time audit area in your recommendations
- The Step 3 vision should paint a picture of freedom, not just efficiency`

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
              const error = await response.text()
              console.error('Gemini API error:', error)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Failed to generate analysis' }))
              return
            }

            const result = await response.json()
            let analysisText = result.candidates?.[0]?.content?.parts?.[0]?.text || ''
            analysisText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

            try {
              const analysis = JSON.parse(analysisText)
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(analysis))
            } catch (parseError) {
              console.error('Failed to parse analysis JSON:', parseError, analysisText)
              const hoursWasted = 15
              const monthlyCost = hoursWasted * 4 * hourlyValue
              const savings = Math.round(monthlyCost * 0.75)
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({
                diagnosis: {
                  rootCause: `Your "${dreadTask}" is consuming valuable hours that should be spent on growth. This is your primary constraint.`,
                  bottleneckType: capacityTest === 'break' ? 'fulfillment' : 'sales',
                  currentPain: "Feeling overwhelmed and underwater, constantly putting out fires instead of building systems"
                },
                roadmap: {
                  step1_automator: {
                    title: "The Immediate Relief",
                    description: `Automate your ${timeAudit} using AI-powered workflows to immediately reclaim 10+ hours per week`,
                    hoursRecovered: 12,
                    implementation: "Set up Zapier + ChatGPT to handle routine communications and admin tasks"
                  },
                  step2_multiplier: {
                    title: "The Growth Multiplier",
                    description: "Create systems that allow your business to handle 3x the volume without 3x the work",
                    impact: "Double capacity without hiring, finally able to take on new clients without breaking"
                  },
                  step3_freedom: {
                    title: "The Freedom Phase",
                    description: "In 90 days, you'll have a business that runs smoothly with 4 hours of daily input instead of 10",
                    futureState: "Working ON your business, not IN it - with predictable revenue and 15+ hours back each week"
                  }
                },
                roi: {
                  currentRevenue: currentRevenueValue,
                  goalRevenue: goalRevenueValue,
                  hoursWastedWeekly: hoursWasted,
                  hourlyValue: hourlyValue,
                  monthlyCostOfBottleneck: monthlyCost,
                  projectedSavings: savings,
                  timeToROI: "30-60 days"
                },
                callAgenda: [
                  `Deep-dive into your ${timeAudit} workflow and map automation opportunities`,
                  "Design your personalized 90-day implementation roadmap",
                  "Identify 2-3 quick wins you can implement this week"
                ]
              }))
            }
          } catch (error) {
            console.error('Analysis error:', error)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Internal server error' }))
          }
          return
        }

        next()
      })
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.GEMINI_API_KEY = env.GEMINI_API_KEY

  return {
    plugins: [apiPlugin(), react()],
    server: {
      port: 3000,
    },
  }
})
