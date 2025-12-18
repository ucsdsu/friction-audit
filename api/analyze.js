// Vercel Serverless Function for final analysis
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' })
  }

  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  // Build conversation text for context
  const conversationText = messages
    .map(m => `${m.role === 'user' ? 'Business Owner' : 'Consultant'}: ${m.content}`)
    .join('\n\n')

  const analysisPrompt = `You are the "Lead Architect," a world-class business strategist specializing in lean operations and AI automation for solopreneurs.

CONVERSATION:
${conversationText}

Analyze this conversation using:
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
- If revenue wasn't mentioned, estimate based on business type ($5k-20k/month range for solopreneurs)
- Hourly value = monthly revenue / 160 hours (or use their stated rate)
- Be specific with tool recommendations (e.g., "Calendly + Zapier" not just "automation")
- The Step 3 vision should paint a picture of freedom, not just efficiency`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: analysisPrompt }]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1500,
          }
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('Gemini API error:', error)
      return res.status(500).json({ error: 'Failed to generate analysis' })
    }

    const data = await response.json()
    let analysisText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    // Clean up the response - remove markdown code blocks if present
    analysisText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

    try {
      const analysis = JSON.parse(analysisText)
      return res.status(200).json(analysis)
    } catch (parseError) {
      console.error('Failed to parse analysis JSON:', parseError, analysisText)

      // Return a fallback analysis
      return res.status(200).json({
        diagnosis: {
          rootCause: "Based on our conversation, you're spending too much time on manual tasks that should be automated.",
          bottleneckType: "operations",
          currentPain: "Feeling overwhelmed and underwater"
        },
        roadmap: {
          step1_automator: {
            title: "The Immediate Relief",
            description: "Implement AI-powered automation for your most time-consuming repetitive task",
            hoursRecovered: 8,
            implementation: "Set up Zapier + ChatGPT to handle routine communications"
          },
          step2_multiplier: {
            title: "The Growth Multiplier",
            description: "Create systems that allow your business to handle 3x the volume without 3x the work",
            impact: "Double capacity without hiring"
          },
          step3_freedom: {
            title: "The Freedom Phase",
            description: "In 90 days, you'll have a business that runs smoothly with minimal daily input",
            futureState: "Working ON your business, not IN it - with 15+ hours back each week"
          }
        },
        roi: {
          currentRevenue: 10000,
          goalRevenue: 25000,
          hoursWastedWeekly: 15,
          hourlyValue: 150,
          monthlyCostOfBottleneck: 9000,
          projectedSavings: 6750,
          timeToROI: "30-60 days"
        },
        callAgenda: [
          "Deep-dive into your specific workflow challenges",
          "Map out the 90-day implementation plan",
          "Identify quick wins you can implement this week"
        ]
      })
    }
  } catch (error) {
    console.error('Analysis error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
