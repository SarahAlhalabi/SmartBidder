"use client"

import { useState } from "react"
import { Trophy, Star, TrendingUp, User, Award, Medal } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import Header from "../../components/common/Header"
import { motion } from "framer-motion"

const InvestorLeaderboard = () => {
  const { t } = useLanguage()
  const [timeFilter, setTimeFilter] = useState("all")

  const investors = [
    {
      id: 1,
      name: "Sarah Johnson",
      image: "/placeholder.svg",
      rating: 4.9,
      totalInvestments: 15,
      totalAmount: 750000,
      successRate: 87,
      specialties: ["Technology", "Healthcare"],
      rank: 1,
      badge: "gold",
    },
    {
      id: 2,
      name: "Michael Chen",
      image: "/placeholder.svg",
      rating: 4.8,
      totalInvestments: 12,
      totalAmount: 680000,
      successRate: 83,
      specialties: ["Finance", "Technology"],
      rank: 2,
      badge: "silver",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      image: "/placeholder.svg",
      rating: 4.7,
      totalInvestments: 18,
      totalAmount: 620000,
      successRate: 79,
      specialties: ["Retail", "Education"],
      rank: 3,
      badge: "bronze",
    },
    {
      id: 4,
      name: "David Kim",
      image: "/placeholder.svg",
      rating: 4.6,
      totalInvestments: 10,
      totalAmount: 450000,
      successRate: 75,
      specialties: ["Healthcare", "Technology"],
      rank: 4,
    },
    {
      id: 5,
      name: "Lisa Wang",
      image: "/placeholder.svg",
      rating: 4.5,
      totalInvestments: 8,
      totalAmount: 380000,
      successRate: 72,
      specialties: ["Education", "Finance"],
      rank: 5,
    },
  ]

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
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case 2:
        return "text-gray-600 bg-gray-100 dark:bg-gray-700/40"
      case 3:
        return "text-orange-600 bg-orange-100 dark:bg-orange-900/20"
      default:
        return "text-gray-500 dark:text-gray-400"
    }
  }

  const stats = [
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />,
      value: "$2.8M",
      label: "Total Platform Investment",
    },
    {
      icon: <User className="w-8 h-8 text-green-600 mx-auto mb-2" />,
      value: "63",
      label: "Active Investors",
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />,
      value: "4.7",
      label: "Average Rating",
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />,
      value: "78%",
      label: "Success Rate",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("topInvestors")}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Discover and connect with the most successful investors on our platform</p>
        </div>

        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Investor Rankings</h2>
            <select className="input-field w-48" value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
              <option value="all">All Time</option>
              <option value="year">This Year</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {investors.slice(0, 3).map((investor) => (
            <motion.div
              key={investor.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.1 }}
              className="card text-center relative bg-white dark:bg-gray-800"
            >
              <div className="absolute top-4 right-4">{getBadgeIcon(investor.badge)}</div>
              <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold border-4 ${getRankColor(investor.rank)}`}>
                {investor.rank}
              </div>
              <img
                src={investor.image}
                alt={investor.name}
                className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-transparent hover:border-green-500 transition"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{investor.name}</h3>
              <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-3">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-lg font-semibold text-gray-800 dark:text-white">{investor.rating}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Investments: <strong>{investor.totalInvestments}</strong></div>
                <div>Total: <strong>${investor.totalAmount.toLocaleString()}</strong></div>
                <div>Success Rate: <strong className="text-green-500">{investor.successRate}%</strong></div>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {investor.specialties.map((s, i) => (
                  <span key={i} className="bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 px-2 py-1 text-xs rounded-full">{s}</span>
                ))}
              </div>
             
            </motion.div>
          ))}
        </div>

        {/* Complete Leaderboard */}
        <div className="card mb-8 overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Complete Leaderboard</h2>
          <table className="w-full text-sm text-left">
            <thead className="border-b dark:border-gray-700">
              <tr>
                <th className="px-4 py-2">Rank</th>
                <th className="px-4 py-2">Investor</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Investments</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Success</th>
                <th className="px-4 py-2">Specialties</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {investors.map((inv) => (
                <tr key={inv.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getRankColor(inv.rank)}`}>
                      {inv.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img src={inv.image} className="w-8 h-8 rounded-full" />
                    <span className="text-gray-900 dark:text-white">{inv.name}</span>
                  </td>
                  <td className="px-4 py-3 flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" /> {inv.rating}
                  </td>
                  <td className="px-4 py-3">{inv.totalInvestments}</td>
                  <td className="px-4 py-3">${inv.totalAmount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">{inv.successRate}%</td>
                  <td className="px-4 py-3 flex gap-1 flex-wrap">
                    {inv.specialties.map((s) => (
                      <span key={s} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full text-xs">
                        {s}
                      </span>
                    ))}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.11, ease: "easeOut" }}
              className="card text-center dark:bg-gray-800"
            >
              {s.icon}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InvestorLeaderboard
