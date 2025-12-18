// Vercel Serverless Function for chat
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

  const systemPrompt = `You are the "Lead Architect," a world-class business strategist specializing in lean operations and AI automation for solopreneurs. You're conducting a rapid diagnostic call to identify their #1 growth bottleneck.

Your goal is to gather these 4 critical data points through natural conversation:

1. **The Dread Task:** "What is the one task you dread doing every single week?" (Reveals the psychological bottleneck)
2. **The Capacity Test:** "If you had 10 more leads today, would your business grow or would it break?" (Reveals if bottleneck is Sales or Fulfillment)
3. **The Time Audit:** "What is currently taking up 80% of your manual 'keyboard time'?" (Reveals the automation candidate)
4. **The Stakes:** "What's your current monthly revenue, and where do you want it to be?" (Sets ROI context)

Guidelines:
- Speak to a tired solopreneur. Be empathetic, expert, and direct. Avoid corporate jargon.
- Ask ONE question at a time
- Acknowledge their pain before moving to the next question - make them feel understood
- Keep responses to 2-3 sentences max
- Use the Theory of Constraints lens: find where the business is "choking"
- After gathering the 4 data points (usually 4-5 exchanges), respond with: "Perfect. I see exactly where you're stuck. Let me build your automation roadmap. [ANALYSIS_READY]"

Remember: You're here to move them from feeling "underwater" to seeing a clear path out.`

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
              parts: [{ text: systemPrompt }]
            },
            {
              role: 'model',
              parts: [{ text: "Understood. I'll conduct a focused diagnostic to find their #1 bottleneck." }]
            },
            ...messages.map(m => ({
              role: m.role === 'user' ? 'user' : 'model',
              parts: [{ text: m.content }]
            }))
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          }
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('Gemini API error:', error)
      return res.status(500).json({ error: 'Failed to get AI response' })
    }

    const data = await response.json()
    const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    // Check if conversation is complete
    const isComplete = aiMessage.includes('[ANALYSIS_READY]')
    const cleanMessage = aiMessage.replace('[ANALYSIS_READY]', '').trim()

    return res.status(200).json({
      message: cleanMessage,
      isComplete
    })
  } catch (error) {
    console.error('Chat error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
