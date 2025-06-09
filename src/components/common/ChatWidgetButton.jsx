import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"

const ChatWidgetButton = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [hovered, setHovered] = useState(false)

  // الصفحات التي لا نريد ظهور الشات فيها
  const hideChatbotPages = ["/login", "/register", "/forgot-password", "/"]
  const shouldHide = hideChatbotPages.includes(location.pathname)

  // لا تعرض الزر في الصفحات المحددة
  if (shouldHide) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div className="mb-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm px-3 py-1 rounded-md shadow">
          Need help with bidding? 🤖
        </div>
      )}

      <button
        onClick={() => navigate("/chatbot")}
        className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 p-3 rounded-full shadow-2xl hover:scale-105 transition-all"
        aria-label="Open Chat"
      >
        <div className="bg-white p-1 rounded-full">
          <img
            src="/chatbot-icon.png"
            alt="SmartBidder Assistant"
            className="w-12 h-12 object-contain"
          />
        </div>
      </button>
    </div>
  )
}

export default ChatWidgetButton
