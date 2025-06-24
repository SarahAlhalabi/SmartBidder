"use client"

import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
  Filter, Search, TrendingUp, User, Clock,
  Star, MessageSquare, Check, X
} from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import Header from "../../components/common/Header"

const InvestmentOffers = () => {
  const { t, isRTL } = useLanguage()
  const navigate = useNavigate()
  const [offers, setOffers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filters, setFilters] = useState({
    minAmount: "", maxAmount: "", minOwnership: "", maxOwnership: "", minRating: "", sortBy: "time"
  })
  const [showFilters, setShowFilters] = useState(false)

 useEffect(() => {
  const fetchOffers = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      const res = await axios.get("http://127.0.0.1:8000/projectowner/project-owner/offers/", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search: searchTerm,
          amount__gte: filters.minAmount || undefined,
          amount__lte: filters.maxAmount || undefined,
          equity_percentage__gte: filters.minOwnership || undefined,
          equity_percentage__lte: filters.maxOwnership || undefined,
          status: filters.status || undefined,
        }
      })
      setOffers(res.data)
    } catch (err) {
      setError("Failed to load offers")
    } finally {
      setLoading(false)
    }
  }

  fetchOffers()
}, [searchTerm, filters])



  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value })
  }

const handleOfferAction = async (offerId, action) => {
  const token = localStorage.getItem("accessToken");

  if (action === "reject") {
    try {
      await axios.post(`http://127.0.0.1:8000/investor/offers/${offerId}/reject/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Offer rejected successfully");

      setOffers((prev) =>
        prev.map((offer) =>
          offer.id === offerId ? { ...offer, status: "rejected" } : offer
        )
      );
    } catch (error) {
      console.error("رفض العرض فشل:", error);
      toast.error("❌ Failed to reject the offer");
    }
  }

  if (action === "accept") {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/projectowner/offers/${offerId}/update-status/`,
        { status: "Accepted" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Offer accepted successfully");

      // تحديث الحالة في الواجهة
      setOffers((prev) =>
        prev.map((offer) =>
          offer.id === offerId
            ? { ...offer, status: "accepted" }
            : { ...offer, status: "rejected" }
        )
      );
    } catch (error) {
      console.error("قبول العرض فشل:", error);
      toast.error("❌ Failed to accept the offer");
    }
  }

  if (action === "negotiate") {
    navigate(`/project-owner/messages?offer=${offerId}`);
  }
};

  const filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      offer.investor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.project?.title?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAmount =
      (!filters.minAmount || offer.amount >= +filters.minAmount) &&
      (!filters.maxAmount || offer.amount <= +filters.maxAmount)

    const matchesOwnership =
      (!filters.minOwnership || offer.equity_percentage >= +filters.minOwnership) &&
      (!filters.maxOwnership || offer.equity_percentage <= +filters.maxOwnership)

    return matchesSearch && matchesAmount && matchesOwnership
  })

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (filters.sortBy) {
      case "amount": return b.amount - a.amount
      case "ownership": return b.equity_percentage - a.equity_percentage
      default: return new Date(b.created_at) - new Date(a.created_at)
    }
  })

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60))
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("investmentOffers")}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Review and manage investment offers for your projects</p>

        {/* Filters */}
        <div className="card mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search offers..."
                className="input-field pl-10 dark:bg-gray-900 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="btn-secondary inline-flex items-center">
              <Filter className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t("filterOffers")}
            </button>
          </div>
        </div>

        {/* Offers */}
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Loading offers...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : sortedOffers.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="mx-auto w-10 h-10 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No offers found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or wait for new offers.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedOffers.map((offer) => (
              <div key={offer.id} className="card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="relative w-12 h-12">
                    <img src="/placeholder.svg?height=40&width=40" alt={offer.investor_name} className="rounded-full w-12 h-12 object-cover" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{offer.investor_name}</h3>
                      <div className="flex items-center gap-1 text-yellow-500 text-sm">
                        <Star className="w-4 h-4 fill-current" />
                        {/* العرض لا يحتوي على rating حاليًا */}
                        4.5
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                        {offer.status}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        ${offer.amount.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4 text-blue-500" />
                        {offer.equity_percentage}% ownership
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {formatTimeAgo(offer.created_at)}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                      <strong>Project:</strong> {offer.project}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {offer.additional_terms || "No message provided."}
                    </p>

                    <div className="flex gap-2 mt-4">
                      <button onClick={() => handleOfferAction(offer.id, "accept")} className="btn-primary text-sm px-4 py-2 flex items-center gap-1">
                        <Check className="w-4 h-4" /> {t("accept")}
                      </button>
                      <button onClick={() => handleOfferAction(offer.id, "reject")} className="btn-secondary text-sm px-4 py-2 flex items-center gap-1">
                        <X className="w-4 h-4" /> {t("reject")}
                      </button>
                      <button onClick={() => handleOfferAction(offer.id, "negotiate")} className="btn-secondary text-sm px-4 py-2 flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" /> {t("negotiate")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default InvestmentOffers
