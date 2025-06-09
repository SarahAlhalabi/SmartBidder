"use client"
import { Link } from "react-router-dom"
import {
  Search,
  TrendingUp,
  MessageSquare,
  Bell,
  Trophy,
  Target,
  DollarSign,
  BarChart3,
  Star,
  ArrowUpRight,
  Activity,
  Brain,
  Bot,
} from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import { useAuth } from "../../contexts/AuthContext"
import Header from "../../components/common/Header"

const InvestorDashboard = () => {
  const { t, isRTL } = useLanguage()
  const { user } = useAuth()

  // Mock data - in real app, this would come from API
  const stats = {
    totalInvested: 125000,
    activeInvestments: 5,
    portfolioReturn: 18.5,
    pendingOffers: 3,
  }

  const recentInvestments = [
    {
      id: 1,
      projectTitle: "AI-Powered E-commerce Platform",
      amount: 25000,
      ownership: 15,
      status: "active",
      return: 12.3,
      projectOwner: "Sarah Johnson",
      category: "Technology",
    },
    {
      id: 2,
      projectTitle: "Sustainable Energy Solution",
      amount: 50000,
      ownership: 20,
      status: "pending",
      return: 0,
      projectOwner: "Michael Chen",
      category: "Energy",
    },
  ]

  const trendingProjects = [
    {
      id: 1,
      title: "Healthcare Mobile App",
      category: "Healthcare",
      fundingProgress: 75,
      rating: 4.8,
      minInvestment: 5000,
      totalFunding: 150000,
      investors: 12,
    },
    {
      id: 2,
      title: "EdTech Learning Platform",
      category: "Education",
      fundingProgress: 60,
      rating: 4.6,
      minInvestment: 10000,
      totalFunding: 200000,
      investors: 8,
    },
    {
      id: 3,
      title: "FinTech Payment Solution",
      category: "Finance",
      fundingProgress: 85,
      rating: 4.9,
      minInvestment: 15000,
      totalFunding: 300000,
      investors: 15,
    },
  ]

  const quickActions = [
    {
      title: t("browseProjects"),
      description: "Discover new investment opportunities",
      icon: Search,
      link: "/investor/browse",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: t("myOffers"),
      description: "Manage your investment offers",
      icon: Target,
      link: "/investor/offers",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: t("messages"),
      description: "Communicate with project owners",
      icon: MessageSquare,
      link: "/investor/messages",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: t("notifications"),
      description: "Stay updated with alerts",
      icon: Bell,
      link: "/investor/notifications",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      title: t("projectLeaderboard"),
      description: "Top performing projects",
      icon: Trophy,
      link: "/investor/leaderboard",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      title: t("aiAssistant"),
      description: "Get AI-powered investment insights",
      icon: Brain,
      link: "/investor/ai-assistant",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="container-full">
        <div className="main-content">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Discover and invest in promising projects</p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Portfolio Value</p>
                  <p className="text-2xl font-bold gradient-text">${stats.totalInvested.toLocaleString()}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* AI Assistant Banner */}
          <div className="mb-8">
            <Link
              to="/investor/ai-assistant"
              className="block p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl text-white hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">AI Investment Assistant</h3>
                    <p className="text-purple-100">Get personalized recommendations and market insights</p>
                  </div>
                </div>
                <ArrowUpRight className="w-6 h-6 text-white" />
              </div>
            </Link>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="stats-card border-l-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Invested</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    ${stats.totalInvested.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="stats-card border-l-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Active Investments</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.activeInvestments}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center mt-1">
                    <Activity className="w-4 h-4 mr-1" />2 new this week
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="stats-card border-l-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Portfolio Return</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">+{stats.portfolioReturn}%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Above market avg
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>

            <div className="stats-card border-l-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Pending Offers</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.pendingOffers}</p>
                  <p className="text-sm text-orange-600 dark:text-orange-400 flex items-center mt-1">
                    <Target className="w-4 h-4 mr-1" />
                    Awaiting response
                  </p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <Target className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link} className="card-hover group">
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <action.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                      {action.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{action.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Recent Investments */}
            <div className="xl:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Recent Investments</h3>
                  <Link
                    to="/investor/offers"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center"
                  >
                    View All <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentInvestments.map((investment) => (
                    <div
                      key={investment.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                              {investment.projectTitle}
                            </h4>
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                              {investment.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">by {investment.projectOwner}</p>
                        </div>
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${
                            investment.status === "active"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                              : investment.status === "pending"
                                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                                : "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {t(investment.status)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Investment Amount</p>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            ${investment.amount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Ownership</p>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">{investment.ownership}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Return</p>
                          <p
                            className={`font-semibold ${investment.return > 0 ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}`}
                          >
                            {investment.return > 0 ? `+${investment.return}%` : "Pending"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
                          <div className="flex items-center">
                            <div
                              className={`w-2 h-2 rounded-full mr-2 ${investment.status === "active" ? "bg-green-500" : "bg-yellow-500"}`}
                            ></div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                              {investment.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trending Projects */}
            <div className="xl:col-span-1">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Trending Projects</h3>
                  <Link
                    to="/investor/browse"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center"
                  >
                    Browse All <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {trendingProjects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{project.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{project.category}</p>
                        </div>
                        <div className="flex items-center space-x-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                            {project.rating}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Funding Progress</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {project.fundingProgress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${project.fundingProgress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Min. Investment</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">
                              ${project.minInvestment.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Investors</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">{project.investors}</p>
                          </div>
                        </div>
                      </div>

                      <Link
                        to={`/investor/project/${project.id}`}
                        className="btn-primary w-full mt-4 text-sm py-2 flex items-center justify-center space-x-2"
                      >
                        <span>{t("viewDetails")}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Preview */}
          <div className="mt-8">
            <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">Recent Notifications</h3>
                </div>
                <Link
                  to="/investor/notifications"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center"
                >
                  View All <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      New project matching your interests: "Blockchain Analytics Platform"
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Your offer for "AI-Powered E-commerce Platform" has been accepted
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Portfolio performance update: +2.3% this week
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestorDashboard
