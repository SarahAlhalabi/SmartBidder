"use client"

import { useState, useEffect, useRef } from "react"
import {
  Send,
  Bot,
  User,
  TrendingUp,
  BarChart3,
  Shield,
  Target,
  Lightbulb,
  Brain,
  Sparkles,
  ArrowRight,
  Star,
} from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import { useAuth } from "../../contexts/AuthContext"
import Header from "../../components/common/Header"

const AIAssistant = () => {
  const { t, isRTL } = useLanguage()
  const { user } = useAuth()
  const messagesEndRef = useRef(null)

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: t("aiWelcome"),
      timestamp: new Date().toISOString(),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const mockProjects = [
    {
      id: 1,
      title: "AI-Powered E-commerce Platform",
      category: "Technology",
      fundingGoal: 100000,
      currentFunding: 75000,
      riskLevel: "medium",
      expectedReturn: "15-25%",
      rating: 4.9,
      aiScore: 92,
      strengths: ["Strong market demand", "Experienced team", "Proven technology"],
      risks: ["Market competition", "Scaling challenges"],
    },
    {
      id: 2,
      title: "Sustainable Energy Solution",
      category: "Energy",
      fundingGoal: 80000,
      currentFunding: 45000,
      riskLevel: "low",
      expectedReturn: "12-20%",
      rating: 4.6,
      aiScore: 88,
      strengths: ["Government support", "Growing market", "Environmental impact"],
      risks: ["Regulatory changes", "Technology adoption"],
    },
  ]

  const suggestedQuestions = [
    "What are the best projects for a $50,000 investment?",
    "Analyze the risk profile of technology projects",
    "How should I diversify my investment portfolio?",
    "What are the current market trends in healthcare investments?",
    "Compare the ROI potential of different project categories",
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: newMessage,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        type: "ai",
        content: "This is a mock AI response.",
        timestamp: new Date().toISOString(),
        projectData: mockProjects[0],
      }
      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 1000)
  }

  const ProjectAnalysisCard = ({ project }) => (
    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
      <div className="flex justify-between mb-2">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100">{project.title}</h4>
        <span className="text-sm font-bold text-blue-700 dark:text-blue-300">AI Score: {project.aiScore}/100</span>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Expected Return: <span className="text-green-600 dark:text-green-400">{project.expectedReturn}</span></p>
      <div>
        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Strengths:</p>
        <ul className="list-disc ml-5 text-sm text-blue-800 dark:text-blue-200">
          {project.strengths.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
      <div className="mt-2">
        <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">Risks:</p>
        <ul className="list-disc ml-5 text-sm text-orange-800 dark:text-orange-200">
          {project.risks.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="col-span-2 card h-[600px] flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Investment Assistant</h2>
                <p className="text-sm text-green-600 dark:text-green-400">● Online</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-lg ${msg.type === "user" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"} px-4 py-2 rounded-xl shadow-md`}>
                  <p className="text-sm">{msg.content}</p>
                  {msg.projectData && <ProjectAnalysisCard project={msg.projectData} />}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 rounded-xl animate-pulse">
                  {t("aiTyping")}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 shadow-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="card p-4 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Analysis</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg hover:shadow">Project Analysis</button>
              <button className="w-full text-left px-4 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg hover:shadow">Risk Assessment</button>
              <button className="w-full text-left px-4 py-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg hover:shadow">Portfolio Optimization</button>
              <button className="w-full text-left px-4 py-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg hover:shadow">Market Insights</button>
            </div>
          </div>

          <div className="card p-4 space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Suggested Questions</h3>
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => setNewMessage(q)}
                className="w-full text-left text-sm px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >{q}</button>
            ))}
          </div>

          <div className="card p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-purple-900 dark:text-white">AI Capabilities</h3>
            </div>
            <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1 list-disc list-inside">
              <li>Personalized project recommendations</li>
              <li>Real-time market analysis</li>
              <li>Risk assessment and mitigation</li>
              <li>Portfolio optimization strategies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
