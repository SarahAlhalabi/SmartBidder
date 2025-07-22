"use client"

import { Bell, AlertTriangle } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import Header from "../../components/common/Header"
import { useState, useEffect } from "react"
import axios from "axios"

const MonitorActivity = () => {
  const { t } = useLanguage()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchImportantNotifications = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("accessToken")
        const res = await axios.get("http://127.0.0.1:8000/accounts/notifications/admin-important/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setNotifications(res.data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch important notifications")
      } finally {
        setLoading(false)
      }
    }

    fetchImportantNotifications()
  }, [])

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now - time) / (1000 * 60))
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Monitor Activity
        </h1>

        {loading ? (
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No important activity found.</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((n) => (
              <div key={n.id} className="card bg-white dark:bg-gray-800 p-4 flex items-start gap-4 border-l-4 border-yellow-400">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-white">{n.message}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {formatTimeAgo(n.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MonitorActivity
