"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useLanguage } from "../../contexts/LanguageContext"
import Header from "../../components/common/Header"
import { Sparkles,
  PlusCircle
 } from "lucide-react"
import { motion } from "framer-motion";
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
const [showEnhanceModal, setShowEnhanceModal] = useState(false)
const [enhancedText, setEnhancedText] = useState("")
const [enhancing, setEnhancing] = useState(false)

const enhanceDescription = async () => {
  setEnhancing(true)
  try {
    const response = await axios.post("http://localhost:8004/improve-description", {
      raw_description: formData.description,
    })
    setEnhancedText(response.data.improved_description)
    setShowEnhanceModal(true)
  } catch (error) {
    console.error("Enhancement failed:", error)
    alert("Failed to enhance description.")
  } finally {
    setEnhancing(false)
  }
}

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

    // إرسال الطلب لإنشاء المشروع
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

    // ✅ استدعاء خدمة الذكاء الاصطناعي لتقييم المشروع
// ✅ بعد إنشاء المشروع
const projectId = response.data.id
// ✅ استدعِ التقييم بدون عرض أي شيء للمستخدم
try {
  await axios.get(`http://127.0.0.1:8000/projectowner/evaluate-project/${projectId}/`)
} catch (aiError) {
  console.error("AI evaluation failed silently:", aiError.response?.data || aiError.message)
}



    navigate("/project-owner/projects")
  } catch (error) {
    console.error("Error creating project:", error.response?.data || error.message)
    alert("فشل في إرسال المشروع.")
  } finally {
    setLoading(false)
  }
}


const isDescriptionValid = formData.description.trim().split(/\s+/).length >= 7;



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div>

    <div className="w-full max-w-6xl -mt-14 px-2 py-6 md:py-8 flex items-center gap-4 bg-transparent">
  {/* أيقونة العنوان */}
  <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md">
    <PlusCircle  className="h-6 w-6" />
  </div>

  {/* نص العنوان والوصف */}
  <div>
    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
      Create <span className="text-blue-600">Project</span>
    </h1>
    <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2" />
  </div>
</div>
                <p className="text-m text-gray-500 -mt-6 mb-6 px-16">Create a new investment opportunity for potential investors</p>
            </div>
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
  <textarea
    name="description"
    placeholder="Describe your project"
    className="w-full px-3 py-2 rounded border border-gray-300 text-black"
    rows={4}
    onChange={handleChange}
  ></textarea>

  <div className="relative group flex justify-end mt-2">
  <button
  type="button"
  onClick={enhanceDescription}
  disabled={!isDescriptionValid || enhancing}
  className={`flex items-center gap-2 px-5 py-2 rounded-full shadow transition-all duration-200 font-medium ${
    isDescriptionValid
      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  <Sparkles className="w-5 h-5" />
  {enhancing ? "Enhancing..." : "Enhance with AI"}
</button>



    {/* Tooltip يظهر عند تمرير الماوس */}
    <div className="absolute bottom-full mb-2 right-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-md z-10 max-w-xs text-center">
      {isDescriptionValid
        ? "Enhance your project description with AI"
        : "Please write at least 7 words to enable AI enhancement"}
    </div>
  </div>
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
  {showEnhanceModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-xl w-full min-h-[500px] p-6"
    >
      <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white flex items-center gap-2">
        ✨ Enhanced Description
      </h2>

      <textarea
        className="w-full h-[300px] p-4 bg-gray-50 dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100 rounded-md shadow-sm focus:outline-none resize-none overflow-y-auto border border-gray-200 dark:border-gray-700"
        value={enhancedText}
        readOnly
      />

      <div className="flex justify-end mt-6 gap-3">
        <button
          onClick={() => {
            navigator.clipboard.writeText(enhancedText);
            setShowEnhanceModal(false);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-4 8a9 9 0 110-18 9 9 0 010 18z" />
          </svg>
          Copy
        </button>

        <button
          onClick={() => setShowEnhanceModal(false)}
          className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-white transition-all"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  </div>
)}


      </div>
    </div>
  )
}

export default CreateProject
