"use client"
import { useLanguage } from "../../contexts/LanguageContext"
import { useAuth } from "../../contexts/AuthContext"
import { Users, BarChart3, TrendingUp, Shield, Activity, ArrowUpRight, AlertTriangle, CheckCircle } from "lucide-react"
import Header from "../../components/common/Header"

const AdminDashboard = () => {
  const { t } = useLanguage()
  const { user } = useAuth()

  // Mock data - in real app, this would come from API
  const stats = {
    totalUsers: 1247,
    activeProjects: 89,
    totalInvestments: 2450000,
    successRate: 78.5,
    newUsersThisWeek: 23,
    projectsAwaitingApproval: 12,
    flaggedContent: 3,
    systemHealth: 99.2,
  }

  const recentActivity = [
    {
      id: 1,
      type: "user_registration",
      message: "New investor registered: John Smith",
      time: "2 minutes ago",
      status: "info",
    },
    {
      id: 2,
      type: "project_submission",
      message: "New project submitted for review: AI Healthcare Platform",
      time: "15 minutes ago",
      status: "warning",
    },
    {
      id: 3,
      type: "investment_completed",
      message: "Investment of $50,000 completed successfully",
      time: "1 hour ago",
      status: "success",
    },
    {
      id: 4,
      type: "content_flagged",
      message: "Content flagged for review in project: EcoTech Solutions",
      time: "2 hours ago",
      status: "error",
    },
  ]

  const managementSections = [
    {
      title: "User Management",
      description: "Manage investors and project owners",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      actions: [
        { name: "Manage Investors", description: "View and manage investor accounts", count: 847 },
        { name: "Manage Project Owners", description: "View and manage project owner accounts", count: 400 },
      ],
    },
    {
      title: "Project Management",
      description: "Review and monitor projects",
      icon: BarChart3,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      actions: [
        {
          name: "Review Projects",
          description: "Approve or reject project submissions",
          count: stats.projectsAwaitingApproval,
        },
        {
          name: "Monitor Activity",
          description: "Track platform activity and performance",
          count: stats.activeProjects,
        },
      ],
    },
    {
      title: "Content Moderation",
      description: "Review flagged content and violations",
      icon: Shield,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      actions: [
        { name: "Flagged Content", description: "Review content flagged by users", count: stats.flaggedContent },
        { name: "Violation Reports", description: "Handle platform violation reports", count: 7 },
      ],
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-blue-500" />
    }
  }

  const getStatusBg = (status) => {
    switch (status) {
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
      case "error":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      default:
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="container-full">
        <div className="main-content">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">Admin Dashboard 🛡️</h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Welcome back, {user?.name}! Monitor and manage the Smart Bidder platform
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">System Health</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.systemHealth}%</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="stats-card border-l-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {stats.totalUsers.toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center mt-1">
                    <ArrowUpRight className="w-4 h-4 mr-1" />+{stats.newUsersThisWeek} this week
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="stats-card border-l-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Active Projects</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.activeProjects}</p>
                  <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                    <Activity className="w-4 h-4 mr-1" />
                    Currently funding
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
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Investments</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    ${(stats.totalInvestments / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-sm text-purple-600 dark:text-purple-400 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Platform volume
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
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Success Rate</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.successRate}%</p>
                  <p className="text-sm text-orange-600 dark:text-orange-400 flex items-center mt-1">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Funded projects
                  </p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <Shield className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Management Sections */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Platform Management</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {managementSections.map((section, index) => (
                <div key={index} className="card">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 bg-gradient-to-r ${section.color} rounded-xl`}>
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{section.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{section.description}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {section.actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        className="w-full text-left p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-gray-100">{action.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{action.description}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">
                              {action.count}
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Recent Platform Activity</h2>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center">
                View All <ArrowUpRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className={`p-4 rounded-xl border ${getStatusBg(activity.status)}`}>
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
