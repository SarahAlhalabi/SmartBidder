    import { useState, useEffect } from "react"
    import { useNavigate } from "react-router-dom"
    import axios from "axios"
    import Header from "../../components/common/Header"
    import { toast } from "react-toastify"
    import { UserCog} from "lucide-react"
    const AdminManageInvestors = () => {
    const navigate = useNavigate()
    const [investors, setInvestors] = useState([])
    const [search, setSearch] = useState("")
    const [filterActive, setFilterActive] = useState("all")
    const [loading, setLoading] = useState(true)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedInvestorId, setSelectedInvestorId] = useState(null)
    const [editModalOpen, setEditModalOpen] = useState(false)
const [editFormData, setEditFormData] = useState(null)
const [editSubmitting, setEditSubmitting] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        full_name: "",
        phone_number: "",
        company_name: "",
        commercial_register: "",
        profile_picture: null,
        id_card_picture: null,
        terms_agreed: "true",
    })
    const [submitting, setSubmitting] = useState(false)
    const confirmDelete = async () => {
    if (!selectedInvestorId) return
    try {
        const token = localStorage.getItem("accessToken")
        await axios.delete(`http://127.0.0.1:8000/adminAccounts/users/${selectedInvestorId}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
        })
        setInvestors((prev) => prev.filter((inv) => inv.id !== selectedInvestorId))
        setShowDeleteModal(false)
        setSelectedInvestorId(null)
    } catch (error) {
        console.error("Error deleting investor:", error)
    }
    }

    const handleModalOpen = () => {
    setFormData({
        username: "",
        email: "",
        password: "",
        full_name: "",
        phone_number: "",
        company_name: "",
        commercial_register: "",
        profile_picture: null,
        id_card_picture: null,
        terms_agreed: "false",
    })
    setShowModal(true)
    }

    const handleModalClose = () => {
        setFormData({ ...formData, password: "" })
        setShowModal(false)
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
        }))
    }

    const handleSubmit = async () => {
        try {
        setSubmitting(true)
        const token = localStorage.getItem("accessToken")
        const form = new FormData()
        for (let key in formData) {
    if (formData[key] !== null && formData[key] !== undefined) {
        form.append(key, formData[key])
    }
    }

        for (let [key, value] of form.entries()) {
    console.log(`${key}:`, value);
    }

        await axios.post(
            "http://127.0.0.1:8000/adminAccounts/create-investor/",
            form,
            { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
        )
        toast.success("Investor created successfully!")

        fetchInvestors()
        handleModalClose()
        } catch (error) {
            console.log(error.response?.data);
    
        alert("Failed to create investor")
        console.error(error)
        } finally {
        setSubmitting(false)
        }
    }

    useEffect(() => {
        fetchInvestors()
    }, [filterActive])

    const fetchInvestors = async () => {
        try {
        setLoading(true)
        const token = localStorage.getItem("accessToken")
        let url = "http://127.0.0.1:8000/adminAccounts/users/All/?role=investor"
        if (filterActive === "active") url += "&is_active=true"
        else if (filterActive === "inactive") url += "&is_active=false"

        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
        })
        setInvestors(response.data)
        } catch (error) {
        console.error("Error fetching investors:", error)
        } finally {
        setLoading(false)
        }
    }

    const handleEdit = async (id) => {
  try {
    const token = localStorage.getItem("accessToken")
    const res = await axios.get(`http://127.0.0.1:8000/adminAccounts/users/${id}/details/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = res.data
    setEditFormData({
      id: data.id,
      full_name: data.full_name || "",
      username: data.username || "",
      email: data.email || "",
      phone_number: data.phone_number || "",
     
      bio: data.owner_data?.bio || data.investor_data?.bio || "",
      role: data.role,
      is_active: data.is_active,
      profile_picture: null,
      id_card_picture: null,
      current_profile: data.owner_data?.profile_picture || data.investor_data?.profile_picture || null,
      current_card: data.owner_data?.id_card_picture || data.investor_data?.id_card_picture || null,
      terms_agreed: data.owner_data?.terms_agreed || data.investor_data?.terms_agreed || "false",
      investor_data: data.investor_data || null
    })
    setEditModalOpen(true)
  } catch (err) {
    console.error("Failed to load user", err)
  }
}
const handleEditSubmit = async () => {
  if (!editFormData) return;

  try {
    setEditSubmitting(true);
    const token = localStorage.getItem("accessToken");
    const form = new FormData();

    for (let key in editFormData) {
      if (editFormData[key] !== null && key !== "id" && key !== "role" && key !== "current_profile" && key !== "current_card" && key !== "investor_data") {
        form.append(key, editFormData[key]);
      }
    }

    await axios.put(
      `http://127.0.0.1:8000/adminAccounts/users/${editFormData.id}/update/`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    toast.success("Investor updated successfully!");
    fetchInvestors();
    setEditModalOpen(false);
  } catch (error) {
    console.error("Failed to update investor:", error.response?.data || error);
    alert("Failed to update investor.");
  } finally {
    setEditSubmitting(false);
  }
};

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this investor?")) {
        setInvestors((prev) => prev.filter((inv) => inv.id !== id))
        }
    }

    const filteredInvestors = investors.filter((inv) => {
        const q = search.toLowerCase()
        return (
        inv.full_name?.toLowerCase().includes(q) ||
        inv.username?.toLowerCase().includes(q) ||
        inv.email?.toLowerCase().includes(q)
        )
    })

    return (
      <div className="font-sans">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white ">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
            <div>

    <div className="w-full max-w-6xl -mt-14 px-2 py-6 md:py-8 flex items-center gap-4 bg-transparent">
  {/* أيقونة العنوان */}
  <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md">
    <UserCog className="h-6 w-6" />
  </div>

  {/* نص العنوان والوصف */}
  <div>
    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
      Manage <span className="text-blue-600">Investors</span>
    </h1>
    <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2" />
  </div>
</div>
                <p className="text-m text-gray-500 -mt-6 px-16">View, add, edit, or remove investors</p>
            </div>

            <div className="flex gap-3 flex-wrap items-center">
                <div className="relative w-[200px] md:w-[230px]">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="peer block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-slate-200 appearance-none focus:outline focus:outline-2 focus:outline-blue-500"
                />
                <div className="absolute top-3 right-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="slategray" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M10 2a8 8 0 015.292 13.708l4 4a1 1 0 01-1.414 1.414l-4-4A8 8 0 1110 2zm0 2a6 6 0 100 12A6 6 0 0010 4z" />
                    </svg>
                </div>
                </div>

                <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value)}
                className="h-[50px] px-4 text-sm bg-white border border-gray-300 rounded-[8px] shadow-sm focus:outline-blue-500 text-gray-700"
                >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                </select>

                <button
                onClick={handleModalOpen}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-semibold h-[50px] px-5 rounded-[8px] shadow transition duration-300 flex items-center gap-2"
                >
                <span className="text-xl">＋</span> Add Investor
                </button>
            </div>
            </div>

            <div className="bg-white shadow-md rounded-xl border border-gray-200 overflow-x-auto mt-6">
            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading investors...</div>
            ) : (
                <table className="min-w-full table-auto text-sm text-left text-gray-800">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 font-semibold text-sm tracking-wide">
                    <tr>
                    <th className="px-6 py-3">Full Name</th>
                    <th className="px-6 py-3">Username</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
              

                <tbody>
                    {filteredInvestors.map((inv) => (
                    <tr key={inv.id} className="border-t hover:bg-blue-50/50 hover:shadow-md transition duration-150">
                        <td className="px-6 py-4 font-medium flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {inv.full_name?.charAt(0) || "?"}
                        </div>
                        {inv.full_name}
                        </td>
                        <td className="px-6 py-4">@{inv.username}</td>
                        <td className="px-6 py-4">{inv.email}</td>
                        <td className="px-6 py-4">{inv.phone_number || "-"}</td>
                        <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${inv.is_active ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}`}>
                            {inv.is_active ? "Active" : "Inactive"}
                        </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => handleEdit(inv.id)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded">Edit</button>
                        <button
    onClick={() => {
        setSelectedInvestorId(inv.id)
        setShowDeleteModal(true)
    }}
    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
    >
    Delete
    </button>

                        </td>
                    </tr>
                    ))}
                    {filteredInvestors.length === 0 && (
                    <tr>
                        <td colSpan="6" className="text-center py-6 text-gray-500">No investors found.</td>
                    </tr>
                    )}
                </tbody>
                </table>
            )}
            </div>
        </div>

        {/* ✅ Modal for Add Investor */}
        {showModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-fade-in">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Investor</h2>

        <div className="space-y-3">
            <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <input type="text" name="company_name" placeholder="Company Name" value={formData.company_name} onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <input type="text" name="commercial_register" placeholder="Commercial Register" value={formData.commercial_register} onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <div>
            <label className="block text-sm mb-1 text-gray-600">Profile Picture</label>
            <input type="file" name="profile_picture" onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg text-sm p-2 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-100 file:text-blue-700" />
            </div>

            <div>
            <label className="block text-sm mb-1 text-gray-600">ID Card Picture</label>
            <input type="file" name="id_card_picture" onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg text-sm p-2 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-100 file:text-blue-700" />
                <div className="flex items-center space-x-3 mt-2">
    <input
        type="checkbox"
        id="terms_agreed"
        name="terms_agreed"
        checked={formData.terms_agreed === "true"}
        onChange={(e) =>
        setFormData((prev) => ({
            ...prev,
            terms_agreed: e.target.checked ? "true" : "false",
        }))
        }
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
    <label htmlFor="terms_agreed" className="text-sm text-gray-700">
        I agree to the terms and conditions
    </label>
    </div>

            </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-3">
            <button onClick={handleModalClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-100">
            Cancel
            </button>
            <button onClick={handleSubmit} disabled={submitting}
            className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-sm">
            {submitting ? "Submitting..." : "Submit"}
            </button>
        </div>
        </div>
    </div>
    )}
    {showDeleteModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-fade-in">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Delete</h2>
        <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this investor? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
            <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100"
            >
            Cancel
            </button>
            <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
            >
            Yes, Delete
            </button>
        </div>
        </div>
    </div>
    )}
{editModalOpen && editFormData && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Edit Investor</h2>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
    <input type="text" name="full_name" value={editFormData.full_name} onChange={(e) => setEditFormData({ ...editFormData, full_name: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" />
  </div>
  <div>
    <label className="text-sm text-gray-600 mb-1 block">Username</label>
    <input type="text" name="username" value={editFormData.username} onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" />
  </div>
  <div>
    <label className="text-sm text-gray-600 mb-1 block">Email</label>
    <input type="email" name="email" value={editFormData.email} onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" />
  </div>
  <div>
    <label className="text-sm text-gray-600 mb-1 block">Phone Number</label>
    <input type="text" name="phone_number" value={editFormData.phone_number} onChange={(e) => setEditFormData({ ...editFormData, phone_number: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" />
  </div>
</div>
<div className="mt-4">
  <label className="text-sm text-gray-600 mb-1 block">Bio</label>
  <textarea name="bio" value={editFormData.bio} onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" />
</div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-sm text-gray-600">Profile Picture</label>
         <input
  type="file"
  name="profile_picture"
  onChange={handleChange}
  className="block w-full text-sm text-gray-600
             file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-50 file:text-blue-700
             hover:file:bg-blue-100"
/>

        </div>
        <div>
          <label className="text-sm text-gray-600">ID Card Picture</label>
          <input
  type="file"
  name="id_card_picture"
  onChange={handleChange}
  className="block w-full text-sm text-gray-600
             file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-50 file:text-blue-700
             hover:file:bg-blue-100"
/>

        </div>
      </div>

      <div className="flex items-center mt-4 space-x-3">
        <input type="checkbox" id="terms_agreed" checked={editFormData.terms_agreed === "true"} onChange={(e) => setEditFormData({ ...editFormData, terms_agreed: e.target.checked ? "true" : "false" })} />
        <label htmlFor="terms_agreed" className="text-sm text-gray-700">I agree to the terms and conditions</label>
      </div>
<div className="flex items-center mt-4 space-x-3">
  <label className="text-sm text-gray-600">Status:</label>
  <div className="relative inline-block w-10 mr-2 align-middle select-none">
    <input
      type="checkbox"
      name="is_active"
      checked={editFormData.is_active}
      onChange={(e) => setEditFormData({ ...editFormData, is_active: e.target.checked })}
      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
      style={{ top: "2px", left: editFormData.is_active ? "20px" : "2px", transition: "left 0.2s" }}
    />
    <span
      className={`block overflow-hidden h-6 rounded-full bg-gray-300 ${editFormData.is_active ? 'bg-green-500' : 'bg-gray-300'}`}
    ></span>
  </div>
  <span className={`text-sm font-medium ${editFormData.is_active ? 'text-green-700' : 'text-gray-500'}`}>
    {editFormData.is_active ? "Active" : "Inactive"}
  </span>
</div>

      <div className="mt-6 flex justify-end gap-3">
        <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-100">Cancel</button>
        <button onClick={() => handleEditSubmit()} disabled={editSubmitting} className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-sm">
          {editSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  </div>
)}
        </div>
        </div>
    )
    }


    export default AdminManageInvestors
