"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Trophy, Star, TrendingUp, DollarSign, Award, Medal, Target } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import Header from "../../components/common/Header"

const ProjectLeaderboard = () => {
  const { t, isRTL } = useLanguage()
  const [timeFilter, setTimeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Mock leaderboard data
  const projects = [
    {
      id: 1,
      title: "AI-Powered E-commerce Platform",
      category: "Technology",
      owner: "Sarah Johnson",
      ownerRating: 4.8,
      fundingGoal: 100000,
      currentFunding: 95000,
      investors: 12,
      rating: 4.9,
      expectedReturn: "15-25%",
      riskLevel: "medium",
      timeline: 12,
      rank: 1,
      badge: "gold",
      image: "/placeholder.svg?height=150&width=200",
      tags: ["AI", "E-commerce", "SaaS"],
    },
    {
      id: 2,
      title: "Healthcare Mobile App",
      category: "Healthcare",
      owner: "Emily Rodriguez",
      ownerRating: 4.9,
      fundingGoal: 60000,
      currentFunding: 54000,
      investors: 15,
      rating: 4.8,
      expectedReturn: "18-30%",
      riskLevel: "high",
      timeline: 8,
      rank: 2,
      badge: "silver",
      image: "/placeholder.svg?height=150&width=200",
      tags: ["Healthcare", "Mobile", "Telemedicine"],
    },
    {
      id: 3,
      title: "Sustainable Energy Solution",
      category: "Technology",
      owner: "Michael Chen",
      ownerRating: 4.7,
      fundingGoal: 80000,
      currentFunding: 68000,
      investors: 8,
      rating: 4.7,
      expectedReturn: "12-20%",
      riskLevel: "low",
      timeline: 18,
      rank: 3,
      badge: "bronze",
      image: "/placeholder.svg?height=150&width=200",
      tags: ["Clean Energy", "Sustainability"],
    },
    {
      id: 4,
      title: "EdTech Learning Platform",
      category: "Education",
      owner: "David Kim",
      ownerRating: 4.6,
      fundingGoal: 120000,
      currentFunding: 84000,
      investors: 10,
      rating: 4.6,
      expectedReturn: "10-18%",
      riskLevel: "medium",
      timeline: 15,
      rank: 4,
      badge: null,
      image: "/placeholder.svg?height=150&width=200",
      tags: ["Education", "AI", "Online Learning"],
    },
    {
      id: 5,
      title: "FinTech Payment Solution",
      category: "Finance",
      owner: "Lisa Wang",
      ownerRating: 4.5,
      fundingGoal: 90000,
      currentFunding: 63000,
      investors: 7,
      rating: 4.5,
      expectedReturn: "20-35%",
      riskLevel: "high",
      timeline: 10,
      rank: 5,
      badge: null,
      image: "/placeholder.svg?height=150&width=200",
      tags: ["FinTech", "Payments", "Blockchain"],
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "technology", label: t("technology") },
    { value: "healthcare", label: t("healthcare") },
    { value: "finance", label: t("finance") },
    { value: "education", label: t("education") },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = categoryFilter === "all" || project.category.toLowerCase() === categoryFilter
    return matchesCategory
  })

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case "gold":
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case "silver":
        return <Medal className="w-6 h-6 text-gray-400" />
      case "bronze":
        return <Award className="w-6 h-6 text-orange-600" />
      default:
        return null
    }
  }

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case 2:
        return "text-gray-600 bg-gray-50 border-gray-200"
      case 3:
        return "text-orange-600 bg-orange-50 border-orange-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("topProjects")}</h1>
          <p className="text-gray-600 mt-2">Discover the highest-rated and most successful projects on our platform</p>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Project Rankings</h2>
            <div className="flex space-x-4">
              <select
                className="input-field w-48"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <select className="input-field w-48" value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                <option value="all">All Time</option>
                <option value="year">This Year</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {filteredProjects.slice(0, 3).map((project, index) => (
            <div
              key={project.id}
              className={`card text-center relative ${
                index === 0 ? "md:order-2 transform md:scale-105" : index === 1 ? "md:order-1" : "md:order-3"
              }`}
            >
              <div className="absolute top-4 right-4">{getBadgeIcon(project.badge)}</div>

              <div
                className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold border-4 ${getRankColor(project.rank)}`}
              >
                {project.rank}
              </div>

              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-32 object-cover rounded-lg mx-auto mb-4"
              />

              <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-2">by {project.owner}</p>

              <div className="flex items-center justify-center space-x-1 mb-3">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold text-gray-900">{project.rating}</span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Funding:</span>
                  <span className="font-medium">
                    {Math.round((project.currentFunding / project.fundingGoal) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Investors:</span>
                  <span className="font-medium">{project.investors}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expected Return:</span>
                  <span className="font-medium text-green-600">{project.expectedReturn}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 justify-center mb-4">
                {project.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <Link to={`/investor/project/${project.id}`} className="btn-primary w-full">
                {t("viewDetails")}
              </Link>
            </div>
          ))}
        </div>

        {/* Full Leaderboard */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Complete Leaderboard</h2>

          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-2 ${getRankColor(project.rank)}`}
                    >
                      {project.rank}
                    </span>
                    {getBadgeIcon(project.badge)}
                  </div>

                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-16 h-12 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                        <p className="text-sm text-gray-600">by {project.owner}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(project.riskLevel)}`}
                        >
                          {t(project.riskLevel)} Risk
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{project.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Funding Progress</span>
                        <div className="font-medium">
                          {Math.round((project.currentFunding / project.fundingGoal) * 100)}%
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Amount Raised</span>
                        <div className="font-medium">${project.currentFunding.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Investors</span>
                        <div className="font-medium">{project.investors}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Expected Return</span>
                        <div className="font-medium text-green-600">{project.expectedReturn}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">{t("timeline")}</span>
                        <div className="font-medium">{project.timeline} months</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link to={`/investor/project/${project.id}`} className="btn-primary text-sm px-4 py-2">
                        {t("viewDetails")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="card text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">$2.8M</div>
            <div className="text-sm text-gray-600">Total Funding Raised</div>
          </div>
          <div className="card text-center">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">47</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </div>
          <div className="card text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4.7</div>
            <div className="text-sm text-gray-600">Average Project Rating</div>
          </div>
          <div className="card text-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">82%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectLeaderboard
