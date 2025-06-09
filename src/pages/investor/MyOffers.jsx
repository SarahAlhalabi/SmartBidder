"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Edit, Trash2, MessageSquare, Eye, Clock, DollarSign, TrendingUp } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import Header from "../../components/common/Header"

const MyOffers = () => {
  const { t, isRTL } = useLanguage()
  const [statusFilter, setStatusFilter] = useState("all")
  const [editingOffer, setEditingOffer] = useState(null)
  const [editData, setEditData] = useState({})

  // Mock offers data
  const offers = [
    {
      id: 1,
      projectId: 1,
      projectTitle: "AI-Powered E-commerce Platform",
      projectOwner: "Sarah Johnson",
      amount: 25000,
      ownership: 15,
      terms: "Looking for strategic partnership and mentorship opportunities",
      status: "pending",
      submittedAt: "2024-01-20T10:30:00Z",
      responseAt: null,
      projectImage: "/placeholder.svg?height=100&width=150",
      canEdit: true,
    },
    {
      id: 2,
      projectId: 2,
      projectTitle: "Sustainable Energy Solution",
      projectOwner: "Michael Chen",
      amount: 50000,
      ownership: 25,
      terms: "Interested in long-term growth potential",
      status: "approved",
      submittedAt: "2024-01-18T14:20:00Z",
      responseAt: "2024-01-19T09:15:00Z",
      projectImage: "/placeholder.svg?height=100&width=150",
      canEdit: false,
    },
    {
      id: 3,
      projectId: 3,
      projectTitle: "Healthcare Mobile App",
      projectOwner: "Emily Rodriguez",
      amount: 15000,
      ownership: 10,
      terms: "Healthcare expertise and network connections available",
      status: "rejected",
      submittedAt: "2024-01-15T16:45:00Z",
      responseAt: "2024-01-17T11:30:00Z",
      projectImage: "/placeholder.svg?height=100&width=150",
      canEdit: false,
    },
    {
      id: 4,
      projectId: 4,
      projectTitle: "EdTech Learning Platform",
      projectOwner: "David Kim",
      amount: 30000,
      ownership: 18,
      terms: "Education sector experience and advisory role",
      status: "withdrawn",
      submittedAt: "2024-01-12T09:00:00Z",
      responseAt: null,
      projectImage: "/placeholder.svg?height=100&width=150",
      canEdit: false,
    },
  ]

  const filteredOffers = offers.filter((offer) => statusFilter === "all" || offer.status === statusFilter)

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "withdrawn":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
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
    // In real app, this would update via API
    console.log("Updating offer:", offerId, editData)
    setEditingOffer(null)
    alert(t("offerUpdated"))
  }

  const handleWithdrawOffer = (offerId) => {
    if (window.confirm("Are you sure you want to withdraw this offer?")) {
      // In real app, this would update via API
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("myOffers")}</h1>
          <p className="text-gray-600 mt-2">Track and manage your investment offers</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="card text-center">
            <div className="text-2xl font-bold text-gray-900">{offers.length}</div>
            <div className="text-sm text-gray-600">Total Offers</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {offers.filter((o) => o.status === "pending").length}
            </div>
            <div className="text-sm text-gray-600">{t("pending")}</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600">
              {offers.filter((o) => o.status === "approved").length}
            </div>
            <div className="text-sm text-gray-600">{t("approved")}</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-600">
              $
              {offers
                .filter((o) => o.status === "approved")
                .reduce((sum, o) => sum + o.amount, 0)
                .toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Invested Amount</div>
          </div>
        </div>

        {/* Filter */}
        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Your Offers</h2>
            <select className="input-field w-48" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="pending">{t("pending")}</option>
              <option value="approved">{t("approved")}</option>
              <option value="rejected">{t("rejected")}</option>
              <option value="withdrawn">{t("withdrawn")}</option>
            </select>
          </div>
        </div>

        {/* Offers List */}
        <div className="space-y-4">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <img
                  src={offer.projectImage || "/placeholder.svg"}
                  alt={offer.projectTitle}
                  className="w-24 h-16 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{offer.projectTitle}</h3>
                      <p className="text-sm text-gray-600">by {offer.projectOwner}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(offer.status)}`}>
                      {t(offer.status)}
                    </span>
                  </div>

                  {editingOffer === offer.id ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t("amount")} (USD)</label>
                        <input
                          type="number"
                          className="input-field"
                          value={editData.amount}
                          onChange={(e) => setEditData({ ...editData, amount: Number.parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ownership (%)</label>
                        <input
                          type="number"
                          className="input-field"
                          value={editData.ownership}
                          onChange={(e) => setEditData({ ...editData, ownership: Number.parseInt(e.target.value) })}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t("additionalTerms")}</label>
                        <textarea
                          rows={2}
                          className="input-field"
                          value={editData.terms}
                          onChange={(e) => setEditData({ ...editData, terms: e.target.value })}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-600">
                          <span className="font-medium">${offer.amount.toLocaleString()}</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">
                          <span className="font-medium">{offer.ownership}%</span> ownership
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{formatTimeAgo(offer.submittedAt)}</span>
                      </div>
                    </div>
                  )}

                  {offer.terms && !editingOffer && (
                    <p className="text-sm text-gray-700 mb-4">
                      <span className="font-medium">Terms:</span> {offer.terms}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Link
                        to={`/investor/project/${offer.projectId}`}
                        className="btn-secondary text-sm px-3 py-1 inline-flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {t("viewDetails")}
                      </Link>

                      {offer.status === "approved" && (
                        <Link
                          to="/investor/messages"
                          className="btn-secondary text-sm px-3 py-1 inline-flex items-center"
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Link>
                      )}
                    </div>

                    {editingOffer === offer.id ? (
                      <div className="flex space-x-2">
                        <button onClick={() => setEditingOffer(null)} className="btn-secondary text-sm px-3 py-1">
                          Cancel
                        </button>
                        <button onClick={() => handleSaveEdit(offer.id)} className="btn-primary text-sm px-3 py-1">
                          Save
                        </button>
                      </div>
                    ) : (
                      offer.canEdit &&
                      offer.status === "pending" && (
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
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No offers found</h3>
            <p className="text-gray-600 mb-6">
              {statusFilter === "all"
                ? "You haven't submitted any offers yet."
                : `No offers with ${statusFilter} status.`}
            </p>
            <Link to="/investor/browse" className="btn-primary">
              {t("browseProjects")}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOffers
