# Friction Audit - Lead Magnet Tool

A 2-minute diagnostic that helps business owners identify their #1 operational bottleneck and get a personalized automation roadmap.

## Tech Stack

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Express.js (serves static files + API)
- **AI:** Google Gemini API (gemini-3-flash-preview)
- **Deployment:** Railway (auto-deploys from GitHub)
- **Repo:** https://github.com/ucsdsu/friction-audit

## Architecture

```
Landing Page → 4-Step Wizard → API Call → Results Page
                    ↓
              [Gemini API]
                    ↓
         Server enforces all numbers
```

### Flow

1. **Landing** - Value prop, CTA
2. **Step 1: Dread Task** - What task do you dread? + Hours/week input
3. **Step 2: Capacity Test** - "Grow" or "Break" (sales vs fulfillment bottleneck)
4. **Step 3: Time Audit** - Where does most time go?
5. **Step 4: Stakes** - Current revenue bracket, goal revenue bracket
6. **Results** - Diagnosis, 3-step roadmap, ROI calculations, booking CTA

## Key Files

```
server.js                    # Express server + /api/analyze endpoint
src/
  components/
    Landing.jsx              # Homepage
    Wizard.jsx               # Orchestrates wizard steps
    Results.jsx              # Analysis display
    BookingCTA.jsx           # Calendly integration
    steps/
      DreadTask.jsx          # Step 1 - task + hours input
      CapacityTest.jsx       # Step 2 - grow/break choice
      TimeAudit.jsx          # Step 3 - time sink selection
      Stakes.jsx             # Step 4 - revenue brackets
  hooks/
    useWizard.js             # Wizard state management
  lib/
    api.js                   # API client + mock mode
```

## Credibility Rules (Critical)

These constraints were implemented after user testing revealed trust issues:

### 1. Hours Enforcement
- User reports hours (e.g., 5h/week) → output MUST use exactly 5h
- Server calculates all numbers, ignores any LLM-generated values
- `hoursRecovered` capped at 70% of reported hours

### 2. ROI Transparency
All calculations disclosed in Results:
```
Hourly value = Monthly revenue midpoint / 160 hours
Monthly cost = Reported hours × 4 weeks × hourly value
Potential savings = Monthly cost × 50% (conservative)
```

### 3. Bracket Midpoints
Revenue brackets use midpoints for calculations:
| Bracket | Midpoint |
|---------|----------|
| Under $5k | $3,000 |
| $5k-$10k | $7,500 |
| $10k-$25k | $17,500 |
| $25k-$50k | $37,500 |
| $50k+ | $75,000 |

UI displays labels (e.g., "$10k-$25k") not midpoint values.

### 4. Qualified Claims
- Use "Up to X hours" not "X hours recovered"
- Use "Potential savings" not "Savings"
- Use "Positioned for growth" not "4x volume"
- Never use absolutes: "zero hours", "10x", "guaranteed"

### 5. Bottleneck Categories
Landing page promises classification into:
- **Human** (people/delegation issues)
- **Process** (workflow/systems issues)
- **Tech** (tools/automation issues)

Results must display this explicitly.

## Environment Variables

```bash
GEMINI_API_KEY=your_gemini_api_key
PORT=3000  # optional, defaults to 3000
```

For local dev with mock data:
```bash
VITE_USE_MOCK=true  # bypasses API, uses mock responses
```

## Deployment (Railway)

1. Push to GitHub
2. Railway auto-detects Node.js
3. Runs: `npm run build && npm start`
4. Set `GEMINI_API_KEY` in Railway dashboard

## Local Development

```bash
npm install
npm run dev          # Vite dev server (frontend only, uses mock)
npm run build        # Build for production
npm start            # Run Express server (needs GEMINI_API_KEY)
```

## Design Decisions

### Why server-side number enforcement?
LLMs ignore instructions about specific values. Even with explicit prompts like "use exactly 5 hours", Gemini would output 15h. Solution: calculate all numbers in Node.js, only use LLM for qualitative text.

### Why 30-day roadmap (not 90)?
Faster promise = more credible. 90 days felt too long for a "quick win" tool.

### Why bracket labels instead of midpoint values?
User selects "$10k-$25k" but sees "$17,500" in output → feels like manipulation. Show what they selected.

### Why conservative 50% savings estimate?
Over-promising destroys trust. 50% is defensible; actual results often exceed this.

## Copy Guidelines

**Landing page positioning:**
- Target: Business owners doing too much themselves
- Problem: Can't grow because YOU are the bottleneck
- Solution: AI automation to replace manual labor
- Outcome: Operating system that runs without you

**Tone:**
- Direct, not salesy
- Specific, not vague
- Qualified, not absolute
- Professional consultancy aesthetic

## Future Improvements

- [ ] Email capture before results (optional gate)
- [ ] Save/share results via unique URL
- [ ] A/B test headlines
- [ ] Track conversion to Calendly bookings
