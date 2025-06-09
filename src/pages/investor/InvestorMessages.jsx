"use client"
import { useState } from "react"
import { Send, Search, MessageSquare, Star } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import Header from "../../components/common/Header"

const InvestorMessages = () => {
  const { t, isRTL } = useLanguage()
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      projectOwnerName: "Sarah Johnson",
      projectOwnerImage: "/placeholder.svg?height=40&width=40",
      projectTitle: "AI-Powered E-commerce Platform",
      lastMessage: "Thank you for your interest! I'd be happy to discuss the technical details.",
      timestamp: "2024-01-20T10:30:00Z",
      unread: 1,
      status: "negotiation",
      projectOwnerRating: 4.8,
    },
    {
      id: 2,
      projectOwnerName: "Michael Chen",
      projectOwnerImage: "/placeholder.svg?height=40&width=40",
      projectTitle: "Sustainable Energy Solution",
      lastMessage: "Great! Let's schedule a call to discuss the partnership terms.",
      timestamp: "2024-01-19T15:45:00Z",
      unread: 0,
      status: "active",
      projectOwnerRating: 4.7,
    },
    {
      id: 3,
      projectOwnerName: "Emily Rodriguez",
      projectOwnerImage: "/placeholder.svg?height=40&width=40",
      projectTitle: "Healthcare Mobile App",
      lastMessage: "I appreciate your healthcare expertise. Your insights would be valuable.",
      timestamp: "2024-01-18T09:15:00Z",
      unread: 2,
      status: "negotiation",
      projectOwnerRating: 4.9,
    },
  ]

  // Mock messages for selected conversation
  const messages = selectedConversation
    ? [
        {
          id: 1,
          senderId: "owner",
          senderName: selectedConversation.projectOwnerName,
          content: "Thank you for your investment offer! I'm impressed by your background in the industry.",
          timestamp: "2024-01-20T09:00:00Z",
          isInvestor: false,
        },
        {
          id: 2,
          senderId: "investor",
          senderName: "You",
          content:
            "I'm excited about the potential of your platform. Could you share more details about the AI algorithms you're using?",
          timestamp: "2024-01-20T09:15:00Z",
          isInvestor: true,
        },
        {
          id: 3,
          senderId: "owner",
          senderName: selectedConversation.projectOwnerName,
          content:
            "We're using a combination of collaborative filtering and deep learning models. I can send you our technical documentation.",
          timestamp: "2024-01-20T09:30:00Z",
          isInvestor: false,
        },
        {
          id: 4,
          senderId: "investor",
          senderName: "You",
          content:
            "That would be great. I'm also interested in discussing the go-to-market strategy and potential partnerships.",
          timestamp: "2024-01-20T09:45:00Z",
          isInvestor: true,
        },
      ]
    : []

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.projectOwnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In real app, this would send the message via API
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("messages")}</h1>
          <p className="text-gray-600 mt-2">Communicate with project owners and negotiate deals</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <div className="card h-full flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="input-field pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation?.id === conversation.id ? "bg-primary-50 border-primary-200" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={conversation.projectOwnerImage || "/placeholder.svg"}
                        alt={conversation.projectOwnerName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {conversation.projectOwnerName}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-600">{conversation.projectOwnerRating}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {conversation.unread > 0 && (
                              <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1">
                                {conversation.unread}
                              </span>
                            )}
                            <span className="text-xs text-gray-500">{formatTime(conversation.timestamp)}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-1 truncate">{conversation.projectTitle}</p>
                        <p className="text-sm text-gray-700 truncate">{conversation.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="card h-full flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={selectedConversation.projectOwnerImage || "/placeholder.svg"}
                          alt={selectedConversation.projectOwnerName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              {selectedConversation.projectOwnerName}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{selectedConversation.projectOwnerRating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{selectedConversation.projectTitle}</p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          selectedConversation.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {selectedConversation.status}
                      </span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isInvestor ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isInvestor ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.isInvestor ? "text-primary-100" : "text-gray-500"}`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder={`${t("sendMessage")}...`}
                        className="flex-1 input-field"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestorMessages
