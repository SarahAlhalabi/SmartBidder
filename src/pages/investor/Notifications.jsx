"use client"
import { useState } from "react"
import { Bell, Check, X, Star, TrendingUp, MessageSquare, DollarSign } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import Header from "../../components/common/Header"

const Notifications = () => {
  const { t, isRTL } = useLanguage()
  const [filter, setFilter] = useState("all")

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "project_match",
      title: t("newProjectAlert"),
      message: "New project 'Blockchain Analytics Platform' matches your investment interests in Technology",
      timestamp: "2024-01-20T10:30:00Z",
      read: false,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      projectId: 5,
    },
    {
      id: 2,
      type: "offer_accepted",
      title: t("offerAcceptedNotification"),
      message: "Your investment offer of $25,000 for 'AI-Powered E-commerce Platform' has been accepted",
      timestamp: "2024-01-19T15:45:00Z",
      read: false,
      icon: Check,
      color: "text-green-600",
      bgColor: "bg-green-100",
      projectId: 1,
    },
    {
      id: 3,
      type: "negotiation",
      title: t("negotiationStarted"),
      message: "Sarah Johnson wants to negotiate terms for your investment offer",
      timestamp: "2024-01-19T09:15:00Z",
      read: true,
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      projectId: 1,
    },
    {
      id: 4,
      type: "project_update",
      title: "Project Milestone Completed",
      message: "'Sustainable Energy Solution' has completed their MVP development milestone",
      timestamp: "2024-01-18T14:20:00Z",
      read: true,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      projectId: 2,
    },
    {
      id: 5,
      type: "offer_rejected",
      title: t("offerRejectedNotification"),
      message: "Your offer for 'Healthcare Mobile App' was not accepted. Consider revising your terms.",
      timestamp: "2024-01-17T11:30:00Z",
      read: true,
      icon: X,
      color: "text-red-600",
      bgColor: "bg-red-100",
      projectId: 3,
    },
    {
      id: 6,
      type: "project_match",
      title: t("matchingProjects"),
      message: "3 new projects in Healthcare category match your investment criteria",
      timestamp: "2024-01-16T08:45:00Z",
      read: true,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      projectId: null,
    },
    {
      id: 7,
      type: "funding_milestone",
      title: "Funding Milestone Reached",
      message: "'EdTech Learning Platform' has reached 75% of their funding goal",
      timestamp: "2024-01-15T16:20:00Z",
      read: true,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      projectId: 4,
    },
  ])

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.read
    if (filter === "read") return notification.read
    return true
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("notifications")}</h1>
          <p className="text-gray-600 mt-2">Stay updated with your investment activities and opportunities</p>
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="card text-center">
            <Bell className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{notifications.length}</div>
            <div className="text-sm text-gray-600">Total Notifications</div>
          </div>
          <div className="card text-center">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-red-600 font-bold text-sm">{unreadCount}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{unreadCount}</div>
            <div className="text-sm text-gray-600">Unread</div>
          </div>
          <div className="card text-center">
            <Check className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{notifications.length - unreadCount}</div>
            <div className="text-sm text-gray-600">Read</div>
          </div>
        </div>

        {/* Controls */}
        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <select className="input-field w-48" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
              </select>
            </div>
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="btn-secondary text-sm">
                  {t("markAsRead")} All
                </button>
              )}
              <button onClick={clearAll} className="btn-secondary text-sm">
                {t("clearAll")}
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`card hover:shadow-md transition-shadow ${
                !notification.read ? "border-l-4 border-l-primary-500 bg-primary-50" : ""
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 ${notification.bgColor} rounded-lg`}>
                  <notification.icon className={`w-5 h-5 ${notification.color}`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`font-semibold ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                        {notification.title}
                      </h3>
                      <p className={`text-sm ${!notification.read ? "text-gray-800" : "text-gray-600"}`}>
                        {notification.message}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{formatTimeAgo(notification.timestamp)}</span>
                      {!notification.read && <div className="w-2 h-2 bg-primary-600 rounded-full"></div>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        {t("markAsRead")}
                      </button>
                    )}
                    {notification.projectId && (
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View Project
                      </button>
                    )}
                    {notification.type === "negotiation" && (
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">Open Chat</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t("noNotifications")}</h3>
            <p className="text-gray-600">
              {filter === "unread"
                ? "All notifications have been read."
                : filter === "read"
                  ? "No read notifications found."
                  : "You're all caught up! No notifications to show."}
            </p>
          </div>
        )}

        {/* Notification Preferences */}
        <div className="card mt-8 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <Bell className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">Notification Preferences</h3>
              <p className="text-blue-800 text-sm mb-4">
                Customize your notification settings to receive updates about projects that match your investment
                interests.
              </p>
              <button className="btn-primary text-sm">Manage Preferences</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
