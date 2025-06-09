"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useLanguage } from "../../contexts/LanguageContext"
import Header from "../../components/common/Header"

const CreateProject = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()

const [formData, setFormData] = useState({
  title: "",
  description: "",
  ideaSummary: "",
  problemSolving: "",
  category: "",
  readiness: "",
  funding: "",
  marketing: "",
  team: "",
  monthlyRevenue: "",
  roiPeriod: "",
  profitMargin: "",
  growth: "",
  currentRevenue: "",
  files: []  // ✅ أضف هذا السطر لدعم رفع الملفات
})

  const [loading, setLoading] = useState(false)

const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "files") {
    setFormData({ ...formData, files: files }); // ⬅️ تخزين جميع الملفات المختارة
  } else {
    setFormData({ ...formData, [name]: value });
  }
};


 const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)

  try {
    const token = localStorage.getItem("accessToken")
    const form = new FormData()

    // الحقول العادية
    form.append("title", formData.title)
    form.append("description", formData.description)
    form.append("idea_summary", formData.ideaSummary)
    form.append("problem_solving", formData.problemSolving)
    form.append("category", formData.category)
    form.append("readiness_level", formData.readiness)

    // الجدوى الاقتصادية
    form.append("feasibility_study.funding_required", formData.funding)
    form.append("feasibility_study.marketing_investment_percentage", formData.marketing)
    form.append("feasibility_study.team_investment_percentage", formData.team)
    form.append("feasibility_study.expected_monthly_revenue", formData.monthlyRevenue)
    form.append("feasibility_study.roi_period_months", formData.roiPeriod)
    form.append("feasibility_study.expected_profit_margin", formData.profitMargin)
    form.append("feasibility_study.growth_opportunity", formData.growth)
    form.append("feasibility_study.current_revenue", formData.currentRevenue)

    // رفع الملفات
    for (let i = 0; i < formData.files.length; i++) {
      form.append("files", formData.files[i])
    }

    // إرسال الطلب
    const response = await axios.post(
      "http://127.0.0.1:8000/projectowner/projectowner/projects/add/",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )

    console.log("Project created:", response.data)
    navigate("/project-owner/projects")
  } catch (error) {
    console.error("Error creating project:", error.response?.data || error.message)
    alert("فشل في إرسال المشروع.")
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create New Project</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Create a new investment opportunity for potential investors.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Project Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
            <div className="bg-slate-800 dark:bg-slate-700 text-white rounded-t-xl px-6 py-3">
              <h2 className="text-lg font-semibold">Project Details</h2>
              <p className="text-sm text-gray-200">Basic information about your project</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Title</label>
                <input type="text" name="title" placeholder="Enter project title" className="w-full px-3 py-2 rounded border border-gray-300 text-black" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea name="description" placeholder="Describe your project" className="w-full px-3 py-2 rounded border border-gray-300 text-black" rows={3} onChange={handleChange}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Idea Summary</label>
                <input type="text" name="ideaSummary" placeholder="Summarize your idea" className="w-full px-3 py-2 rounded border border-gray-300 text-black" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Problem Solving</label>
                <textarea name="problemSolving" placeholder="How does your project solve a problem?" className="w-full px-3 py-2 rounded border border-gray-300 text-black" rows={2} onChange={handleChange}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select name="category" className="w-full px-3 py-2 rounded border border-gray-300 text-black" onChange={handleChange}>
                  <option value="">Select category</option>
                  <option value="medical">Medical</option>
                  <option value="general_trade">General Trade</option>
                  <option value="construction">Construction</option>
                  <option value="business">Business</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Readiness Level</label>
                <select name="readiness" className="w-full px-3 py-2 rounded border border-gray-300 text-black" onChange={handleChange}>
                  <option value="">Select stage</option>
                  <option value="idea">Idea</option>
                  <option value="prototype">Prototype</option>
                  <option value="existing">Existing Project</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Upload Files</label>
                <input
  type="file"
  name="files"
  multiple
  onChange={(e) => setFormData({ ...formData, files: e.target.files })}
/>

              </div>
            </div>
          </div>

          {/* Right: Feasibility Study */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
            <div className="bg-emerald-600 text-white rounded-t-xl px-6 py-3">
              <h2 className="text-lg font-semibold">Feasibility Study</h2>
              <p className="text-sm text-emerald-100">Financial and investment information</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Funding Required ($)</label>
                <input type="number" name="funding" placeholder="e.g. 10000" className="w-full px-3 py-2 rounded border border-gray-300 text-black" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Marketing Investment (%)</label>
                <input type="number" name="marketing" placeholder="e.g. 20" className="w-full px-3 py-2 rounded border border-gray-300 text-black" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Team Investment (%)</label>
                <input type="number" name="team" placeholder="e.g. 30" className="w-full px-3 py-2 rounded border border-gray-300 text-black" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Expected Monthly Revenue ($)</label>
                <input type="number" name="monthlyRevenue" placeholder="e.g. 5000" className="w-full px-3 py-2 rounded border border-gray-300 text-black" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ROI Period (months)</label>
                <input type="number" name="roiPeriod" placeholder="e.g. 12" className="w-full px-3 py-2 rounded border border-gray-300 text-black" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Expected Profit Margin (%)</label>
                <input type="number" name="profitMargin" placeholder="e.g. 25" className="w-full px-3 py-2 rounded border border-gray-300 text-black" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Growth Opportunity</label>
                <textarea name="growth" placeholder="Describe growth potential" className="w-full px-3 py-2 rounded border border-gray-300 text-black" rows={2} onChange={handleChange}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Current Revenue ($)</label>
                <input type="number" name="currentRevenue" placeholder="Required for non-idea stage" className="w-full px-3 py-2 rounded border border-gray-300 text-black" onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex justify-end pt-4">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProject
