"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Filter, Star, TrendingUp, Clock } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import Header from "../../components/common/Header"

const BrowseProjects = () => {
  const { t, isRTL } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    category: "",
    minAmount: "",
    maxAmount: "",
    minOwnership: "",
    maxOwnership: "",
    riskLevel: "",
    sortBy: "newest",
  })
  const [showFilters, setShowFilters] = useState(false)

  // Mock projects data
  const projects = [
    {
      id: 1,
      title: "AI-Powered E-commerce Platform",
      description:
        "Revolutionary AI platform for personalized shopping experiences with advanced machine learning algorithms.",
      category: "Technology",
      owner: "Sarah Johnson",
      ownerRating: 4.8,
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
      image: "/placeholder.svg?height=200&width=300",
      tags: ["AI", "E-commerce", "Machine Learning"],
    },
    {
      id: 2,
      title: "Sustainable Energy Solution",
      description:
        "Clean energy technology for residential and commercial use, focusing on solar and wind integration.",
      category: "Technology",
      owner: "Michael Chen",
      ownerRating: 4.7,
      fundingGoal: 80000,
      currentFunding: 45000,
      minInvestment: 10000,
      maxInvestment: 30000,
      expectedReturn: "12-20%",
      riskLevel: "low",
      timeline: 18,
      rating: 4.6,
      investors: 5,
      createdAt: "2024-01-10",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Clean Energy", "Sustainability", "Solar"],
    },
    {
      id: 3,
      title: "Healthcare Mobile App",
      description:
        "Telemedicine platform connecting patients with doctors for remote consultations and health monitoring.",
      category: "Healthcare",
      owner: "Emily Rodriguez",
      ownerRating: 4.9,
      fundingGoal: 60000,
      currentFunding: 48000,
      minInvestment: 3000,
      maxInvestment: 15000,
      expectedReturn: "18-30%",
      riskLevel: "high",
      timeline: 8,
      rating: 4.8,
      investors: 12,
      createdAt: "2024-01-05",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Healthcare", "Mobile", "Telemedicine"],
    },
    {
      id: 4,
      title: "EdTech Learning Platform",
      description: "Interactive online learning platform with AI-powered personalized curriculum for students.",
      category: "Education",
      owner: "David Kim",
      ownerRating: 4.6,
      fundingGoal: 120000,
      currentFunding: 72000,
      minInvestment: 8000,
      maxInvestment: 40000,
      expectedReturn: "10-18%",
      riskLevel: "medium",
      timeline: 15,
      rating: 4.7,
      investors: 6,
      createdAt: "2024-01-01",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Education", "AI", "Online Learning"],
    },
  ]

  const categories = [
    { value: "", label: "All Categories" },
    { value: "technology", label: t("technology") },
    { value: "healthcare", label: t("healthcare") },
    { value: "finance", label: t("finance") },
    { value: "education", label: t("education") },
    { value: "retail", label: t("retail") },
  ]

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value })
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = !filters.category || project.category.toLowerCase() === filters.category

    const matchesAmount =
      (!filters.minAmount || project.minInvestment >= Number.parseInt(filters.minAmount)) &&
      (!filters.maxAmount || project.maxInvestment <= Number.parseInt(filters.maxAmount))

    const matchesRisk = !filters.riskLevel || project.riskLevel === filters.riskLevel

    return matchesSearch && matchesCategory && matchesAmount && matchesRisk
  })

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (filters.sortBy) {
      case "rating":
        return b.rating - a.rating
      case "funding":
        return b.currentFunding / b.fundingGoal - a.currentFunding / a.fundingGoal
      case "amount":
        return b.fundingGoal - a.fundingGoal
      case "newest":
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("browseProjects")}</h1>
          <p className="text-gray-600 mt-2">Discover investment opportunities that match your interests</p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-6">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="input-field pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <button onClick={() => setShowFilters(!showFilters)} className="btn-secondary inline-flex items-center">
                <Filter className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                Filters
              </button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="input-field"
                    value={filters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="0"
                    value={filters.minAmount}
                    onChange={(e) => handleFilterChange("minAmount", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="100000"
                    value={filters.maxAmount}
                    onChange={(e) => handleFilterChange("maxAmount", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("riskLevel")}</label>
                  <select
                    className="input-field"
                    value={filters.riskLevel}
                    onChange={(e) => handleFilterChange("riskLevel", e.target.value)}
                  >
                    <option value="">All Levels</option>
                    <option value="low">{t("low")}</option>
                    <option value="medium">{t("medium")}</option>
                    <option value="high">{t("high")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select
                    className="input-field"
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  >
                    <option value="newest">{t("newest")}</option>
                    <option value="rating">{t("highestRated")}</option>
                    <option value="funding">{t("mostFunded")}</option>
                    <option value="amount">Funding Goal</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedProjects.map((project) => (
            <div key={project.id} className="card hover:shadow-lg transition-shadow">
              <div className="relative mb-4">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-3 right-3 flex space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(project.riskLevel)}`}>
                    {t(project.riskLevel)} Risk
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{project.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{project.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t("fundingProgress")}</span>
                    <span className="font-medium">
                      ${project.currentFunding.toLocaleString()} / ${project.fundingGoal.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(project.currentFunding / project.fundingGoal) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Min Investment</span>
                    <div className="font-medium">${project.minInvestment.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Expected Return</span>
                    <div className="font-medium text-green-600">{project.expectedReturn}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{project.timeline} months</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{project.investors} investors</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="text-sm font-medium">{project.owner}</div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{project.ownerRating}</span>
                      </div>
                    </div>
                  </div>
                  <Link to={`/investor/project/${project.id}`} className="btn-primary text-sm px-4 py-2">
                    {t("viewDetails")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BrowseProjects
