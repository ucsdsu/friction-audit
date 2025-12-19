import { useState } from 'react'
import Landing from './components/Landing'
import Wizard from './components/Wizard'
import Results from './components/Results'

function App() {
  const [stage, setStage] = useState('landing') // landing | wizard | analyzing | results
  const [analysisData, setAnalysisData] = useState(null)
  const [wizardData, setWizardData] = useState(null)

  const handleStartAssessment = () => {
    setStage('wizard')
  }

  const handleAnalysisComplete = (data, formData) => {
    setAnalysisData(data)
    setWizardData(formData)
    setStage('results')
  }

  const handleStartAnalyzing = () => {
    setStage('analyzing')
  }

  const handleRestart = () => {
    setStage('landing')
    setAnalysisData(null)
    setWizardData(null)
  }

  return (
    <div className="min-h-screen">
      {stage === 'landing' && (
        <Landing onStart={handleStartAssessment} />
      )}

      {(stage === 'wizard' || stage === 'analyzing') && (
        <Wizard
          onComplete={handleAnalysisComplete}
          onStartAnalyzing={handleStartAnalyzing}
        />
      )}

      {stage === 'results' && (
        <Results
          data={analysisData}
          wizardData={wizardData}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}

export default App
