"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Edit,
  Trash2,
  MessageSquare,
  Eye,
  Clock,
  DollarSign,
  TrendingUp,
  FolderKanban, CheckCircle2, XCircle,
} from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import Header from "../../components/common/Header"
import { useEffect } from "react"
import axios from "axios"

const MyOffers = () => {
  const { t, isRTL } = useLanguage()
  const [statusFilter, setStatusFilter] = useState("all")
  const [editingOffer, setEditingOffer] = useState(null)
  const [stats, setStats] = useState(null)
  const [editData, setEditData] = useState({})
  const [offers, setOffers] = useState([])

 useEffect(() => {
  const fetchOffers = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      const res = await axios.get("http://127.0.0.1:8000/investor/my-offers/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setOffers(res.data || [])
    } catch (err) {
      console.error("❌ Error loading offers", err)
    }
  }

  fetchOffers()
}, [])
const filteredOffers = offers.filter(
  (offer) => statusFilter === "all" || offer.status === statusFilter
)


  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "withdrawn":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }
  }

  const handleEditOffer = (offer) => {
    setEditingOffer(offer.id)
    setEditData({
      amount: offer.amount,
      ownership: offer.ownership,
      terms: offer.terms,
    })
  }

  const handleSaveEdit = (offerId) => {
    console.log("Updating offer:", offerId, editData)
    setEditingOffer(null)
    alert(t("offerUpdated"))
  }

  const handleWithdrawOffer = (offerId) => {
    if (window.confirm("Are you sure you want to withdraw this offer?")) {
      console.log("Withdrawing offer:", offerId)
      alert(t("offerWithdrawn"))
    }
  }

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }
useEffect(() => {
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      const res = await axios.get("http://127.0.0.1:8000/investor/offer-statistics/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setStats(res.data)
    } catch (err) {
      console.error("❌ Error loading offer statistics", err)
    }
  }

  fetchStats()
}, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

 <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-8 lg:px-12">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("myOffers")}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Track and manage your investment offers
        </p>

    

<div className="flex flex-wrap justify-between gap-4 mb-6">
  <div className="card flex-1 min-w-[180px] text-center p-5 bg-white dark:bg-gray-800 shadow-lg rounded-xl hover:scale-[1.03] transition-transform duration-300">
    <FolderKanban className="mx-auto mb-2 w-6 h-6 text-indigo-500" />
    <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
      {stats ? stats.total_offers : "-"}
    </div>
    <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">Total Offers</div>
  </div>

  <div className="card flex-1 min-w-[180px] text-center p-5 bg-white dark:bg-gray-800 shadow-lg rounded-xl hover:scale-[1.03] transition-transform duration-300">
    <Clock className="mx-auto mb-2 w-6 h-6 text-yellow-500" />
    <div className="text-2xl font-extrabold text-yellow-600">
      {stats ? stats.pending_offers : "-"}
    </div>
    <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">{t("pending")}</div>
  </div>

  <div className="card flex-1 min-w-[180px] text-center p-5 bg-white dark:bg-gray-800 shadow-lg rounded-xl hover:scale-[1.03] transition-transform duration-300">
    <CheckCircle2 className="mx-auto mb-2 w-6 h-6 text-green-500" />
    <div className="text-2xl font-extrabold text-green-600">
      {stats ? stats.accepted_offers : "-"}
    </div>
    <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">{t("approved")}</div>
  </div>

  <div className="card flex-1 min-w-[180px] text-center p-5 bg-white dark:bg-gray-800 shadow-lg rounded-xl hover:scale-[1.03] transition-transform duration-300">
    <XCircle className="mx-auto mb-2 w-6 h-6 text-red-500" />
    <div className="text-2xl font-extrabold text-red-600">
      {stats ? stats.rejected_offers : "-"}
    </div>
    <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">{t("rejected")}</div>
  </div>

  <div className="card flex-1 min-w-[180px] text-center p-5 bg-white dark:bg-gray-800 shadow-lg rounded-xl hover:scale-[1.03] transition-transform duration-300">
    <DollarSign className="mx-auto mb-2 w-6 h-6 text-blue-500" />
    <div className="text-2xl font-extrabold text-blue-600">
      ${stats ? Number(stats.total_invested_amount).toLocaleString() : "-"}
    </div>
    <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">Invested Amount</div>
  </div>
</div>




        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Offers</h2>
            <select
              className="input-field w-48"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">{t("pending")}</option>
              <option value="approved">{t("approved")}</option>
              <option value="rejected">{t("rejected")}</option>
              <option value="withdrawn">{t("withdrawn")}</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="card shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={offer.projectImage}
                  alt={offer.project.title}
                  className="w-24 h-16 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide">
                        {offer.project.title}
                      </h3>
                      {/* <p className="text-sm text-gray-600 dark:text-gray-300">
                        by {offer.projectOwner}
                      </p> */}
                    </div>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                        offer.status
                      )}`}
                    >
                      {t(offer.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    
    <div className="text-green-800 dark:text-green-300 text-base font-bold">
  ${offer.amount.toLocaleString()}
</div>



                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{offer.ownership}%</span> ownership
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>{offer.submittedAt ? formatTimeAgo(offer.submittedAt) : "N/A"}</span>
                    </div>
                  </div>

                  {offer.terms && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                      <span className="font-medium">Terms:</span> {offer.terms}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                     <Link
  to={`/investor/project/${offer.project.id}`}
  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-full inline-flex items-center shadow-md transition-all duration-300"
>
  <Eye className="w-4 h-4 mr-2" />
  {t("viewDetails")}
</Link>


                      {offer.status === "approved" && (
                        <Link
                          to="/investor/messages"
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full shadow-sm transition duration-200 inline-flex items-center"
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Link>
                      )}
                    </div>

                    {offer.canEdit && offer.status === "pending" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditOffer(offer)}
                          className="btn-secondary text-sm px-3 py-1 inline-flex items-center"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          {t("editOffer")}
                        </button>
                        <button
                          onClick={() => handleWithdrawOffer(offer.id)}
                          className="text-red-600 hover:text-red-700 text-sm px-3 py-1 inline-flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          {t("withdrawOffer")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </div>
  )
}

export default MyOffers;
