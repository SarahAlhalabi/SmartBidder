"use client"

import { useState, useEffect } from "react"
import { Trophy, Star, TrendingUp, User, Award, Medal } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import Header from "../../components/common/Header"
import { motion } from "framer-motion"
import axios from "axios"
const ProjectOwnerLeaderboard = () => {
  const { t } = useLanguage()
  const [timeFilter, setTimeFilter] = useState("all")

 const [projectOwners, setProjectOwners] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const stats = [
  {
    icon: <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />,
    value: projectOwners.length > 0 ? (projectOwners.reduce((acc, i) => acc + i.final_rating, 0) / projectOwners.length).toFixed(2) : "0",
    label: "Average Rating",
  },
  {
    icon: <Trophy className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />,
    value: projectOwners.length,
    label: "Top Project Owners",
  },
  // أضف إحصائيات أخرى إذا لزم الأمر
]
useEffect(() => {
  const fetchTopProjectOwners = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/projectowner/top-project-owners/");
console.log("Top Owners Data:", res.data); 
      const sortedOwners = res.data.sort((a, b) => b.final_rating - a.final_rating);
      const ownersWithRank = sortedOwners.map((owner, index) => ({
        ...owner,
        rank: index + 1,
        badge:
          index === 0 ? "gold" :
          index === 1 ? "silver" :
          index === 2 ? "bronze" :
          null,
      }));

      setProjectOwners(ownersWithRank);  // ✅ بعد ترتيبهم وتعيين الرتبة
      setError(null);
    } catch (err) {
      setError("Failed to load top project owners");
    } finally {
      setLoading(false);
    }
  };

  fetchTopProjectOwners();
}, []);




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

  if (loading) return <p>Loading top project owners...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
       <div>

    <div className="w-full max-w-6xl -mt-10 px-2 py-6 md:py-8 flex items-center gap-4 bg-transparent">
  {/* أيقونة العنوان */}
  <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md">
    <Star  className="h-6 w-6" />
  </div>

  {/* نص العنوان والوصف */}
  <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
      Top <span className="text-blue-600">Project Owners</span>
    </h1>
    <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2" />
  </div>
</div>
                <p className="text-m text-gray-500 -mt-6 mb-6 px-16">Discover and connect with the most successful project owners on our platform</p>
            </div>
         
       

        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Project Owners Rankings</h2>
            <select className="input-field w-48" value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
              <option value="all">All Time</option>
              <option value="year">This Year</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {projectOwners.slice(0, 3).map((owner) => (
            <motion.div
              key={owner.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.1 }}
              className="card text-center relative bg-white dark:bg-gray-800"
            >
              <div className="absolute top-4 right-4">{getBadgeIcon(owner.badge)}</div>
              <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold border-4 ${getRankColor(owner.rank)}`}>
                {owner.rank}
              </div>
              <img
                src={owner.profile_picture_url || "/placeholder.svg"}
               alt={owner.user.full_name}

                className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-transparent hover:border-green-500 transition"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{owner.user.full_name}</h3>
              <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-3">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-lg font-semibold text-gray-800 dark:text-white">{owner.final_rating}</span>
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
                <th className="px-4 py-2">Project Owners</th>
                <th className="px-4 py-2">Rating</th>
              
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {projectOwners.map((owner) => (
                <tr key={owner.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getRankColor(owner.rank)}`}>
                      {owner.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                  <img src={owner.profile_picture_url || "/placeholder.svg"} className="w-8 h-8 rounded-full" />
<span>{owner.user.full_name}</span>
                  </td>
                  <td className="px-4 py-3 flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" /> {owner.final_rating}
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

export default ProjectOwnerLeaderboard