import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Search,
  TrendingUp,
  User,
  Clock,
  Check,
  X,
  MessageSquare
} from "lucide-react";
import Header from "../../components/common/Header";
import { toast } from "react-toastify";

const AdminOffers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [selectedNegotiations, setSelectedNegotiations] = useState([]);
const [showNegotiationModal, setShowNegotiationModal] = useState(false);
const fetchNegotiations = async (offerId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await axios.get(`http://127.0.0.1:8000/adminAccounts/offers/${offerId}/negotiations/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSelectedNegotiations(res.data);
    setShowNegotiationModal(true);
  } catch (err) {
    toast.error("Failed to load negotiations");
  }
};

  const projectTitle = new URLSearchParams(location.search).get("projectTitle");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("http://127.0.0.1:8000/adminAccounts/offers/", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const byProject = res.data.filter(o =>
          o.project_title?.trim().toLowerCase() === projectTitle?.trim().toLowerCase()
        );

        const filtered = searchTerm.trim()
          ? byProject.filter(offer =>
              offer.investor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              offer.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              offer.project_title?.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : byProject;

        setOffers(filtered);
      } catch (err) {
        setError("Failed to load offers.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [searchTerm, projectTitle]);

const handleOfferAction = async (offerId, action) => {
  const token = localStorage.getItem("accessToken");
  const updatedStatus = action === "accept" ? "accepted" : action === "reject" ? "rejected" : null;

  try {
    if (updatedStatus) {
      await axios.patch(
        `http://127.0.0.1:8000/adminAccounts/offers/${offerId}/`,
        { status: updatedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      toast.success(`Offer ${updatedStatus}`);
      setOffers((prev) =>
        prev.map((o) => o.id === offerId ? { ...o, status: updatedStatus } : o)
      );
    }

    if (action === "negotiate") {
      navigate(`/admin/messages?offer=${offerId}`);
    }
  } catch (error) {
    console.error("Error while updating offer status:", error);
    toast.error("Failed to process offer action");
  }
};


  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };
const [editingOffer, setEditingOffer] = useState(null);
const [editForm, setEditForm] = useState({
  amount: "",
  equity_percentage: "",
  status: "",
  additional_terms: ""
});

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Investment Offers</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">All offers made for this project</p>

        <div className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search offers..."
              className="input-field pl-10 dark:bg-gray-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Loading offers...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : offers.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="mx-auto w-10 h-10 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No offers found</h3>
          </div>
        ) : (
          <div className="space-y-4">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{offer.investor_name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        offer.status === "accepted" ? "bg-green-100 text-green-800" :
                        offer.status === "rejected" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
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
                        {offer.equity_percentage}% equity
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {formatTimeAgo(offer.created_at)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Project:</strong> {offer.project_title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Owner: {offer.project_owner_name}
                    </p>
                    <div className="flex justify-between items-center mt-4">
  <div className="flex gap-2">
    <button onClick={() => handleOfferAction(offer.id, "accept")} className="btn-primary text-sm px-4 py-2 flex items-center gap-1">
      <Check className="w-4 h-4" /> Accept
    </button>
    <button onClick={() => handleOfferAction(offer.id, "reject")} className="btn-secondary text-sm px-4 py-2 flex items-center gap-1">
      <X className="w-4 h-4" /> Reject
    </button>
   <button
  onClick={() => fetchNegotiations(offer.id)}
  className="btn-secondary text-sm px-4 py-2 flex items-center gap-1"
>
  Show Negotiation
</button>

  </div>

<button
  onClick={() => {
    setEditingOffer(offer);
    setEditForm({
      amount: offer.amount,
      equity_percentage: offer.equity_percentage,
      status: offer.status,
      additional_terms: offer.additional_terms || ""
    });
  }}
  className="btn-secondary text-sm px-6 py-2 ml-auto">
  Edit
</button>
</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
     {editingOffer && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
    <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Edit Offer</h2>

      {/* Amount */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Offer Amount (USD)
      </label>
      <input
        type="number"
        value={editForm.amount}
        onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
        className="input-field w-full mb-4"
        placeholder="e.g. 5000"
      />

      {/* Equity */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Offer Ownership (%)
      </label>
      <input
        type="number"
        value={editForm.equity_percentage}
        onChange={(e) => setEditForm({ ...editForm, equity_percentage: e.target.value })}
        className="input-field w-full mb-4"
        placeholder="e.g. 10"
      />

      {/* Additional Terms */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Additional Terms (Optional)
      </label>
      <textarea
        rows="3"
        value={editForm.additional_terms}
        onChange={(e) => setEditForm({ ...editForm, additional_terms: e.target.value })}
        className="input-field w-full mb-6"
        placeholder="Any additional terms or conditions..."
      />

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setEditingOffer(null)}
          className=" btn-secondary px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full  shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            const token = localStorage.getItem("accessToken");
            try {
              await axios.patch(
                `http://127.0.0.1:8000/adminAccounts/offers/${editingOffer.id}/`,
                editForm,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              toast.success("Offer updated");
              setOffers((prev) =>
                prev.map((o) => o.id === editingOffer.id ? { ...o, ...editForm } : o)
              );
              setEditingOffer(null);
            } catch (err) {
              toast.error("Failed to update offer");
            }
          }}
          className="btn-secondary px-6 py-3 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
{showNegotiationModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4">
    <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-xl p-6 shadow-lg overflow-y-auto max-h-[80vh]">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Negotiation Messages</h2>
      <div className="space-y-3">
        {selectedNegotiations.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No messages yet.</p>
        ) : (
          selectedNegotiations.map(msg => (
            <div key={msg.id} className="p-3 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-gray-800 dark:text-gray-100">{msg.sender_name}</span>
                <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{msg.message}</p>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setShowNegotiationModal(false)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default AdminOffers;
