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

  // Mock data for AI analysis
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
    {
      id: 3,
      title: "Healthcare Mobile App",
      category: "Healthcare",
      fundingGoal: 60000,
      currentFunding: 48000,
      riskLevel: "high",
      expectedReturn: "18-30%",
      rating: 4.8,
      aiScore: 85,
      strengths: ["High demand", "Scalable model", "Strong user engagement"],
      risks: ["Regulatory compliance", "Data privacy concerns"],
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
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const simulateAIResponse = (userMessage) => {
    setIsTyping(true)

    setTimeout(() => {
      let aiResponse = ""

      // Simple AI logic based on keywords
      const messageLower = userMessage.toLowerCase()

      if (messageLower.includes("best project") || messageLower.includes("recommend")) {
        const topProject = mockProjects[0]
        aiResponse = `Based on your investment profile, I recommend the "${topProject.title}" project. It has an AI score of ${topProject.aiScore}/100 with strong market potential. The project is ${Math.round((topProject.currentFunding / topProject.fundingGoal) * 100)}% funded and offers an expected return of ${topProject.expectedReturn}.`
        setSelectedProject(topProject)
      } else if (messageLower.includes("risk") || messageLower.includes("analyze")) {
        aiResponse = `I've analyzed the current projects in your preferred categories. Technology projects show medium risk with high growth potential, while energy projects offer lower risk with steady returns. Healthcare projects have higher risk but potentially higher rewards. Would you like a detailed risk assessment of any specific project?`
      } else if (messageLower.includes("portfolio") || messageLower.includes("diversify")) {
        aiResponse = `For optimal portfolio diversification, I recommend allocating: 40% to technology projects (high growth), 35% to energy projects (stability), and 25% to healthcare projects (innovation). This balance provides good risk-return optimization based on current market conditions.`
      } else if (messageLower.includes("market trend") || messageLower.includes("trend")) {
        aiResponse = `Current market trends show strong growth in AI and healthcare sectors. Technology investments are up 23% this quarter, with particular strength in AI-powered solutions. Healthcare projects are seeing increased funding due to post-pandemic focus on digital health solutions.`
      } else if (messageLower.includes("roi") || messageLower.includes("return")) {
        aiResponse = `ROI analysis shows: Technology projects average 18-25% returns, Energy projects 12-18%, and Healthcare projects 15-30%. However, returns vary significantly based on project maturity, team experience, and market conditions. I can provide detailed analysis for specific projects.`
      } else {
        aiResponse = `I understand you're asking about "${userMessage}". Based on the current market data and your investment profile, I can provide personalized recommendations. Would you like me to analyze specific projects or provide general investment guidance?`
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "ai",
          content: aiResponse,
          timestamp: new Date().toISOString(),
          projectData: selectedProject,
        },
      ])
      setIsTyping(false)
    }, 2000)
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        type: "user",
        content: newMessage,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, userMessage])
      simulateAIResponse(newMessage)
      setNewMessage("")
    }
  }

  const handleSuggestedQuestion = (question) => {
    setNewMessage(question)
    handleSendMessage()
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const ProjectAnalysisCard = ({ project }) => (
    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100">{project.title}</h4>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">AI Score:</span>
          <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-sm font-bold">{project.aiScore}/100</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-sm text-blue-600 dark:text-blue-400">Funding Progress</span>
          <div className="font-medium text-blue-900 dark:text-blue-100">
            {Math.round((project.currentFunding / project.fundingGoal) * 100)}%
          </div>
        </div>
        <div>
          <span className="text-sm text-blue-600 dark:text-blue-400">Expected Return</span>
          <div className="font-medium text-green-600 dark:text-green-400">{project.expectedReturn}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Strengths:</span>
          <ul className="text-sm text-blue-800 dark:text-blue-200 ml-4">
            {project.strengths.map((strength, index) => (
              <li key={index} className="list-disc">
                {strength}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Risks:</span>
          <ul className="text-sm text-orange-800 dark:text-orange-200 ml-4">
            {project.risks.map((risk, index) => (
              <li key={index} className="list-disc">
                {risk}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t("aiAssistant")}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Get personalized investment insights and recommendations
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Chat Area */}
          <div className="xl:col-span-3">
            <div className="card h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Investment Assistant</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-600 dark:text-green-400">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs lg:max-w-md ${message.type === "user" ? "order-2" : "order-1"}`}>
                      <div className="flex items-center space-x-2 mb-1">
                        {message.type === "ai" ? (
                          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                            <Bot className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {message.type === "ai" ? "AI Assistant" : user?.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>

                      <div
                        className={`px-4 py-3 rounded-lg ${
                          message.type === "user"
                            ? "bg-blue-600 dark:bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        {message.projectData && <ProjectAnalysisCard project={message.projectData} />}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Assistant</span>
                      </div>
                      <div className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{t("aiTyping")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={t("askQuestion")}
                      className="input-field"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Analysis</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="font-medium text-blue-900 dark:text-blue-100">{t("projectAnalysis")}</div>
                      <div className="text-sm text-blue-600 dark:text-blue-400">Analyze project potential</div>
                    </div>
                  </div>
                </button>

                <button className="w-full text-left p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-700 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <div className="font-medium text-green-900 dark:text-green-100">{t("riskAssessment")}</div>
                      <div className="text-sm text-green-600 dark:text-green-400">Evaluate investment risks</div>
                    </div>
                  </div>
                </button>

                <button className="w-full text-left p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <div className="font-medium text-purple-900 dark:text-purple-100">
                        {t("portfolioOptimization")}
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">Optimize your portfolio</div>
                    </div>
                  </div>
                </button>

                <button className="w-full text-left p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-700 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <div>
                      <div className="font-medium text-orange-900 dark:text-orange-100">{t("marketInsights")}</div>
                      <div className="text-sm text-orange-600 dark:text-orange-400">Get market trends</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Suggested Questions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{t("suggestedQuestions")}</h3>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="w-full text-left p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">{question}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Capabilities */}
            <div className="card bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-700">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">AI Capabilities</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-1" />
                  <p className="text-purple-800 dark:text-purple-200">Personalized project recommendations</p>
                </div>
                <div className="flex items-start space-x-3">
                  <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-1" />
                  <p className="text-purple-800 dark:text-purple-200">Real-time market analysis</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-1" />
                  <p className="text-purple-800 dark:text-purple-200">Risk assessment and mitigation</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-1" />
                  <p className="text-purple-800 dark:text-purple-200">Portfolio optimization strategies</p>
                </div>
              </div>
            </div>

            {/* Top Recommendations */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Top AI Recommendations</h3>
              <div className="space-y-3">
                {mockProjects.slice(0, 2).map((project) => (
                  <div key={project.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{project.title}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{project.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">AI Score: {project.aiScore}/100</span>
                      <span className="text-green-600 dark:text-green-400">{project.expectedReturn}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
