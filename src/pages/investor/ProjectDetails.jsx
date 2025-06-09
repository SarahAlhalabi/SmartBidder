"use client"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Star, Clock, FileText, AlertTriangle } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import Header from "../../components/common/Header"

const ProjectDetails = () => {
  const { t, isRTL } = useLanguage()
  const { id } = useParams()
  const navigate = useNavigate()
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [offerData, setOfferData] = useState({
    amount: "",
    ownership: "",
    terms: "",
  })

  // Mock project data - in real app, this would be fetched based on ID
  const project = {
    id: 1,
    title: "AI-Powered E-commerce Platform",
    description:
      "Revolutionary AI platform for personalized shopping experiences with advanced machine learning algorithms. Our platform analyzes user behavior, preferences, and purchase history to provide highly personalized product recommendations, resulting in increased conversion rates and customer satisfaction.",
    category: "Technology",
    owner: {
      name: "Sarah Johnson",
      rating: 4.8,
      image: "/placeholder.svg?height=60&width=60",
      experience: "10+ years in tech startups",
      previousProjects: 3,
      successRate: 87,
    },
    fundingGoal: 100000,
    currentFunding: 75000,
    minInvestment: 5000,
    maxInvestment: 25000,
    expectedReturn: "15-25%",
    riskLevel: "medium",
    timeline: 12,
    rating: 4.9,
    investors: 8,
    createdAt: "2024-01-15",
    deadline: "2024-03-15",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["AI", "E-commerce", "Machine Learning", "SaaS"],
    documents: [
      { name: "Business Plan.pdf", size: "2.3 MB" },
      { name: "Financial Projections.xlsx", size: "1.1 MB" },
      { name: "Market Analysis.pdf", size: "3.2 MB" },
      { name: "Technical Specifications.pdf", size: "1.8 MB" },
    ],
    milestones: [
      { title: "MVP Development", status: "completed", date: "2024-02-01" },
      { title: "Beta Testing", status: "in-progress", date: "2024-02-15" },
      { title: "Market Launch", status: "upcoming", date: "2024-03-01" },
      { title: "Scale Operations", status: "upcoming", date: "2024-04-01" },
    ],
    features: [
      "Advanced AI recommendation engine",
      "Real-time analytics dashboard",
      "Multi-platform integration",
      "Scalable cloud infrastructure",
      "24/7 customer support",
    ],
    marketAnalysis: {
      marketSize: "$2.3B",
      growth: "23% annually",
      competition: "Medium",
      targetAudience: "E-commerce businesses",
    },
  }

  const handleOfferSubmit = (e) => {
    e.preventDefault()
    // In real app, this would submit to API
    console.log("Submitting offer:", offerData)
    setShowOfferModal(false)
    // Show success message
    alert(t("offerSubmitted"))
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMilestoneColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "upcoming":
        return "bg-gray-300"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <ArrowLeft className={`w-4 h-4 ${isRTL ? "ml-2 rotate-180" : "mr-2"}`} />
          Back to Projects
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <div className="card">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />

              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                      {project.category}
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getRiskColor(project.riskLevel)}`}>
                      {t(project.riskLevel)} Risk
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{project.rating}</span>
                      <span className="text-gray-600">({project.investors} investors)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">{project.description}</p>
            </div>

            {/* Key Features */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Market Analysis */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Market Analysis</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">{project.marketAnalysis.marketSize}</div>
                  <div className="text-sm text-gray-600">Market Size</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{project.marketAnalysis.growth}</div>
                  <div className="text-sm text-gray-600">Annual Growth</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-orange-600">{project.marketAnalysis.competition}</div>
                  <div className="text-sm text-gray-600">Competition</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-bold text-blue-600">{project.marketAnalysis.targetAudience}</div>
                  <div className="text-sm text-gray-600">Target Market</div>
                </div>
              </div>
            </div>

            {/* Project Milestones */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Milestones</h2>
              <div className="space-y-4">
                {project.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${getMilestoneColor(milestone.status)}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{milestone.title}</span>
                        <span className="text-sm text-gray-600">{milestone.date}</span>
                      </div>
                      <span
                        className={`text-sm capitalize ${
                          milestone.status === "completed"
                            ? "text-green-600"
                            : milestone.status === "in-progress"
                              ? "text-blue-600"
                              : "text-gray-600"
                        }`}
                      >
                        {milestone.status.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t("projectDocuments")}</h2>
              <div className="space-y-3">
                {project.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">{doc.name}</div>
                        <div className="text-sm text-gray-600">{doc.size}</div>
                      </div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">Download</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Investment Summary */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Funding Goal</span>
                  <span className="font-semibold">${project.fundingGoal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Funding</span>
                  <span className="font-semibold">${project.currentFunding.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary-600 h-3 rounded-full"
                    style={{ width: `${(project.currentFunding / project.fundingGoal) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  {Math.round((project.currentFunding / project.fundingGoal) * 100)}% funded
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div>
                  <div className="text-sm text-gray-600">Min Investment</div>
                  <div className="font-semibold">${project.minInvestment.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Max Investment</div>
                  <div className="font-semibold">${project.maxInvestment.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Expected Return</div>
                  <div className="font-semibold text-green-600">{project.expectedReturn}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">{t("timeline")}</div>
                  <div className="font-semibold">{project.timeline} months</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Deadline: {project.deadline}</span>
                </div>
                <button onClick={() => setShowOfferModal(true)} className="btn-primary w-full">
                  {t("submitOffer")}
                </button>
              </div>
            </div>

            {/* Project Owner */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("projectOwner")}</h3>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={project.owner.image || "/placeholder.svg"}
                  alt={project.owner.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-gray-900">{project.owner.name}</div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{project.owner.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium">{project.owner.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Previous Projects</span>
                  <span className="font-medium">{project.owner.previousProjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-medium text-green-600">{project.owner.successRate}%</span>
                </div>
              </div>

              <button className="btn-secondary w-full mt-4">Contact Owner</button>
            </div>

            {/* Risk Warning */}
            <div className="card bg-yellow-50 border-yellow-200">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-medium text-yellow-900 mb-2">Investment Risk</h4>
                  <p className="text-yellow-800 text-sm">
                    All investments carry risk. Please review all project documents and conduct your own due diligence
                    before investing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("submitOffer")}</h3>

            <form onSubmit={handleOfferSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("offerAmount")} (USD)</label>
                <input
                  type="number"
                  required
                  min={project.minInvestment}
                  max={project.maxInvestment}
                  className="input-field"
                  value={offerData.amount}
                  onChange={(e) => setOfferData({ ...offerData, amount: e.target.value })}
                  placeholder={`${project.minInvestment} - ${project.maxInvestment}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("offerOwnership")} (%)</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="49"
                  className="input-field"
                  value={offerData.ownership}
                  onChange={(e) => setOfferData({ ...offerData, ownership: e.target.value })}
                  placeholder="5-25"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("additionalTerms")} (Optional)
                </label>
                <textarea
                  rows={3}
                  className="input-field"
                  value={offerData.terms}
                  onChange={(e) => setOfferData({ ...offerData, terms: e.target.value })}
                  placeholder="Any additional terms or conditions..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setShowOfferModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  {t("submitOfferButton")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetails
