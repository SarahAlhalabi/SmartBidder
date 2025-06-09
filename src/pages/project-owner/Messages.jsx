"use client"

import { useState, useEffect } from "react"
import { Send, Search, MessageSquare } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import Header from "../../components/common/Header"
import { useLocation } from "react-router-dom"
import axios from "axios"

const Messages = () => {
  const { t } = useLanguage()
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [conversations, setConversations] = useState([])
  const location = useLocation()
  const token = localStorage.getItem("accessToken")

  // ✅ تحميل قائمة المحادثات عند الدخول
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/investor/conversations/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setConversations(res.data))
      .catch((err) => console.error("Error loading conversations", err))
  }, [])

  // ✅ تحميل محادثة محددة + تعليمها كمقروءة
  const loadConversation = async (offerId) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/investor/negotiations/${offerId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setMessages(res.data)

      // ✅ تعليم الرسائل كمقروءة
      await axios.post(
        `http://127.0.0.1:8000/investor/negotiations/${offerId}/mark-read/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // ✅ تعيين المحادثة المحددة
      const match = conversations.find((c) => c.id === offerId)
      if (match) {
        setSelectedConversation({
          id: match.id,
          investorName: match.other_user_name,
          projectTitle: match.project_title,
          investorImage: "/placeholder.svg?height=40&width=40",
        })
      }
    } catch (err) {
      console.error("Error loading conversation:", err)
    }
  }

  // ✅ في حال الدخول من زر "negotiate" نحمّل المحادثة المحددة
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const offerId = params.get("offer")
    if (offerId) {
      loadConversation(parseInt(offerId))
    }
  }, [location.search, conversations])

  // ✅ إرسال رسالة
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    await axios.post(
      `http://127.0.0.1:8000/investor/negotiations/${selectedConversation.id}/`,
      { message: newMessage },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    setNewMessage("")
    loadConversation(selectedConversation.id)
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.other_user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.project_title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return "Just now"
    if (hours < 24)
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t("messages")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Communicate with investors and manage negotiations
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Sidebar */}
          <div className="card flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  className="input-field pl-10"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => loadConversation(conv.id)}
                  className={`p-4 cursor-pointer border-b hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    selectedConversation?.id === conv.id
                      ? "bg-emerald-50 dark:bg-emerald-900/10"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                          {conv.other_user_name}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {conv.last_message_time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {conv.project_title}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {conv.last_message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="lg:col-span-2 card flex flex-col h-full">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b bg-white dark:bg-gray-800 rounded-t-xl">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedConversation.investorImage}
                      className="w-10 h-10 rounded-full ring-2 ring-primary-500"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedConversation.investorName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedConversation.projectTitle}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 space-y-4">
              {messages.map((msg) => (
  <div key={msg.id} className={`flex ${msg.is_owner ? "justify-end" : "justify-start"}`}>
    <div
      className={`relative px-4 py-2 max-w-xs md:max-w-md rounded-2xl shadow-md
      ${msg.is_owner
        ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-bl-none"
        : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-br-none"
      }`}
    >
      <p className="text-sm break-words whitespace-pre-wrap">{msg.message}</p>
      
      {/* التوقيت */}
      <div className="text-[10px] mt-1 text-right flex items-center justify-end gap-1 text-white dark:text-gray-300">
        <span>{formatTime(msg.timestamp)}</span>

        {/* ✅ علامة تمت القراءة */}
        {msg.is_owner && (
          <svg className="w-4 h-4 text-white opacity-80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 13l4 4L19 3" />
            <path d="M10 20l10-10" />
          </svg>
        )}
      </div>
    </div>
  </div>
))}

                </div>
                <div className="p-4 border-t bg-white dark:bg-gray-800 rounded-b-xl">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder={`${t("sendMessage")}...`}
                      className="flex-1 input-field dark:bg-gray-900"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="btn-primary px-4 py-2 disabled:opacity-50"
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
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Select a conversation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
