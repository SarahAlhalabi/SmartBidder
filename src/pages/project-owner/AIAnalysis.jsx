"use client"
import { useState } from "react"
import { Brain, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Target } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import Header from "../../components/common/Header"
import Footer from "../../components/common/Footer"
const AIAnalysis = () => {
  const { t, isRTL } = useLanguage()
  const [selectedProject, setSelectedProject] = useState("1")

  // Mock projects for selection
  const projects = [
    { id: "1", title: "AI-Powered E-commerce Platform" },
    { id: "2", title: "Sustainable Energy Solution" },
    { id: "3", title: "Healthcare Mobile App" },
  ]

  // Mock AI analysis data
  const analysisData = {
    overallScore: 85,
    marketPotential: 92,
    riskAssessment: 78,
    competitiveAdvantage: 88,
    recommendations: [
      {
        type: "opportunity",
        title: "Market Timing Advantage",
        description:
          "Current market conditions are highly favorable for AI-powered e-commerce solutions. Consider accelerating your timeline.",
        priority: "high",
      },
      {
        type: "risk",
        title: "Competition Analysis",
        description:
          "Three major competitors have launched similar products. Focus on unique differentiators in your pitch.",
        priority: "medium",
      },
      {
        type: "improvement",
        title: "Funding Strategy",
        description:
          "Consider breaking funding into smaller rounds to reduce investor risk and increase valuation potential.",
        priority: "high",
      },
      {
        type: "opportunity",
        title: "Strategic Partnerships",
        description: "AI analysis suggests potential partnerships with retail giants could accelerate growth by 300%.",
        priority: "medium",
      },
    ],
    offerAnalysis: {
      averageAmount: 35000,
      averageOwnership: 18,
      recommendedAcceptance: [
        {
          investorName: "Sarah Johnson",
          amount: 25000,
          ownership: 15,
          score: 94,
          reasons: ["Excellent track record", "Relevant experience", "Strategic connections"],
        },
        {
          investorName: "Michael Chen",
          amount: 50000,
          ownership: 25,
          score: 87,
          reasons: ["High investment amount", "Technical expertise", "Market knowledge"],
        },
      ],
      riskOffers: [
        {
          investorName: "Anonymous Investor",
          amount: 15000,
          ownership: 30,
          score: 45,
          reasons: ["High ownership demand", "Limited track record", "Unclear intentions"],
        },
      ],
    },
    marketTrends: {
      growth: "+23%",
      sentiment: "Positive",
      competition: "High",
      timing: "Excellent",
    },
  }

  const getRecommendationIcon = (type) => {
    switch (type) {
      case "opportunity":
        return <TrendingUp className="w-5 h-5 text-green-600" />
      case "risk":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "improvement":
        return <Target className="w-5 h-5 text-blue-600" />
      default:
        return <CheckCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
   <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      <Header />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
         <div>

    <div className="w-full max-w-6xl -mt-10 px-2 py-6 md:py-8 flex items-center gap-4 bg-transparent">
  {/* أيقونة العنوان */}
  <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md">
    <BarChart3 className="h-6 w-6" />
  </div>

  {/* نص العنوان والوصف */}
  <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
      Data <span className="text-blue-600">Analysis</span>
    </h1>
    <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2" />
  </div>
</div>
              
            </div>

        {/* Project Selection */}
        <div className="card mb-6">
          <div className="flex items-center space-x-4">
            <Brain className="w-6 h-6 text-primary-600" />
            <div className="flex-1">
              <label htmlFor="project-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Project for Analysis
              </label>
              <select
                id="project-select"
                className="input-field max-w-md"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
  {/* Overall Score */}
  <div className="card text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow transition-colors">
    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
      <BarChart3 className="w-8 h-8 text-blue-600" />
    </div>
    <div className={`text-3xl font-bold mb-2 ${getScoreColor(analysisData.overallScore)}`}>
      {analysisData.overallScore}
    </div>
    <div className="text-sm text-gray-600 dark:text-gray-300">Overall Score</div>
  </div>

  {/* Market Potential */}
  <div className="card text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow transition-colors">
    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
      <TrendingUp className="w-8 h-8 text-green-600" />
    </div>
    <div className={`text-3xl font-bold mb-2 ${getScoreColor(analysisData.marketPotential)}`}>
      {analysisData.marketPotential}
    </div>
    <div className="text-sm text-gray-600 dark:text-gray-300">Market Potential</div>
  </div>

  {/* Risk Assessment */}
  <div className="card text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow transition-colors">
    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
      <AlertTriangle className="w-8 h-8 text-yellow-600" />
    </div>
    <div className={`text-3xl font-bold mb-2 ${getScoreColor(analysisData.riskAssessment)}`}>
      {analysisData.riskAssessment}
    </div>
    <div className="text-sm text-gray-600 dark:text-gray-300">Risk Assessment</div>
  </div>

  {/* Competitive Edge */}
  <div className="card text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow transition-colors">
    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
      <Target className="w-8 h-8 text-blue-600" />
    </div>
    <div className={`text-3xl font-bold mb-2 ${getScoreColor(analysisData.competitiveAdvantage)}`}>
      {analysisData.competitiveAdvantage}
    </div>
    <div className="text-sm text-gray-600 dark:text-gray-300">Competitive Edge</div>
  </div>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Recommendations */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t("recommendations")}</h2>
              <div className="space-y-4">
                {analysisData.recommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      {getRecommendationIcon(rec.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{rec.title}</h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(rec.priority)}`}
                          >
                            {rec.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Trends */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Market Analysis</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{analysisData.marketTrends.growth}</div>
                  <div className="text-sm text-gray-600">Market Growth</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{analysisData.marketTrends.sentiment}</div>
                  <div className="text-sm text-gray-600">Market Sentiment</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-orange-600">{analysisData.marketTrends.competition}</div>
                  <div className="text-sm text-gray-600">Competition Level</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{analysisData.marketTrends.timing}</div>
                  <div className="text-sm text-gray-600">Market Timing</div>
                </div>
              </div>
            </div>
          </div>

          {/* Offer Analysis */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Investment Offer Analysis</h2>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Offers</h3>
                <div className="space-y-3">
                  {analysisData.offerAnalysis.recommendedAcceptance.map((offer, index) => (
                    <div key={index} className="border border-green-200 bg-green-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{offer.investorName}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-green-600">Score: {offer.score}</span>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-sm text-gray-600">Amount: </span>
                          <span className="font-medium">${offer.amount.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Ownership: </span>
                          <span className="font-medium">{offer.ownership}%</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {offer.reasons.map((reason, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">High-Risk Offers</h3>
                <div className="space-y-3">
                  {analysisData.offerAnalysis.riskOffers.map((offer, index) => (
                    <div key={index} className="border border-red-200 bg-red-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{offer.investorName}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-red-600">Score: {offer.score}</span>
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-sm text-gray-600">Amount: </span>
                          <span className="font-medium">${offer.amount.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Ownership: </span>
                          <span className="font-medium">{offer.ownership}%</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {offer.reasons.map((reason, idx) => (
                          <span key={idx} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Offer Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Offer Amount</span>
                  <span className="font-semibold">${analysisData.offerAnalysis.averageAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Ownership Request</span>
                  <span className="font-semibold">{analysisData.offerAnalysis.averageOwnership}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Recommended Offers</span>
                  <span className="font-semibold text-green-600">
                    {analysisData.offerAnalysis.recommendedAcceptance.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">High-Risk Offers</span>
                  <span className="font-semibold text-red-600">{analysisData.offerAnalysis.riskOffers.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Disclaimer */}
        <div className="card mt-8 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <Brain className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">AI Analysis Disclaimer</h3>
              <p className="text-blue-800 text-sm">
                This analysis is generated by AI and should be used as a guide only. Always conduct your own due
                diligence and consult with financial advisors before making investment decisions. Market conditions and
                investor behavior can change rapidly.
              </p>
            </div>
          </div>
        </div>
      </div>
       <Footer onOpenContact={() => setModalOpen(true)} />
    </div>
    
  )
}

export default AIAnalysis
