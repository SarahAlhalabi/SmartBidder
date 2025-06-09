import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { LanguageProvider } from "./contexts/LanguageContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import ProtectedRoute from "./components/common/ProtectedRoute"
import LandingPage from "./pages/visitor/LandingPage"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import InvestorDashboard from "./pages/investor/Dashboard"
import ProjectOwnerDashboard from "./pages/project-owner/Dashboard"
import AdminDashboard from "./pages/admin/Dashboard"
import ProjectsList from "./pages/project-owner/ProjectsList"
import CreateProject from "./pages/project-owner/CreateProject"
import InvestmentOffers from "./pages/project-owner/InvestmentOffers"
import Messages from "./pages/project-owner/Messages"
import InvestorLeaderboard from "./pages/project-owner/InvestorLeaderboard"
import AIAnalysis from "./pages/project-owner/AIAnalysis"
import BrowseProjects from "./pages/investor/BrowseProjects"
import ProjectDetails from "./pages/investor/ProjectDetails"
import MyOffers from "./pages/investor/MyOffers"
import InvestorMessages from "./pages/investor/InvestorMessages"
import ProjectLeaderboard from "./pages/investor/ProjectLeaderboard"
import Notifications from "./pages/investor/Notifications"
import NegotiationRoom from "./pages/common/NegotiationRoom"
import AIAssistant from "./pages/investor/AIAssistant"
import ForgotPassword from "./pages/auth/ForgotPassword"
import Profile from "./pages/project-owner/Profile"
import EditProfile from "./pages/project-owner/EditProfile"
import Settings from "./pages/project-owner/Settings"
import ChatWidgetButton from "./components/common/ChatWidgetButton";
import ChatBot from "./components/common/ChatBot";
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ToastContainer />
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Routes */}
                <Route
                  path="/investor/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["investor"]}>
                      <InvestorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/project-owner/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["project-owner"]}>
                      <ProjectOwnerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                {/* Additional Project Owner Routes */}
                <Route
                  path="/project-owner/projects"
                  element={
                    <ProtectedRoute allowedRoles={["project-owner"]}>
                      <ProjectsList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/project-owner/create-project"
                  element={
                    <ProtectedRoute allowedRoles={["project-owner"]}>
                      <CreateProject />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/project-owner/offers"
                  element={
                    <ProtectedRoute allowedRoles={["project-owner"]}>
                      <InvestmentOffers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/project-owner/messages"
                  element={
                    <ProtectedRoute allowedRoles={["project-owner"]}>
                      <Messages />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/project-owner/leaderboard"
                  element={
                    <ProtectedRoute allowedRoles={["project-owner"]}>
                      <InvestorLeaderboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/project-owner/ai-analysis"
                  element={
                    <ProtectedRoute allowedRoles={["project-owner"]}>
                      <AIAnalysis />
                    </ProtectedRoute>
                  }
                />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/project-owner/edit-profile" element={<EditProfile />} />


<Route path="/project-owner/settings" element={<Settings />} />

                {/* Additional Investor Routes */}
                <Route
                  path="/investor/browse"
                  element={
                    <ProtectedRoute allowedRoles={["investor"]}>
                      <BrowseProjects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/investor/project/:id"
                  element={
                    <ProtectedRoute allowedRoles={["investor"]}>
                      <ProjectDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/investor/offers"
                  element={
                    <ProtectedRoute allowedRoles={["investor"]}>
                      <MyOffers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/investor/messages"
                  element={
                    <ProtectedRoute allowedRoles={["investor"]}>
                      <InvestorMessages />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/investor/leaderboard"
                  element={
                    <ProtectedRoute allowedRoles={["investor"]}>
                      <ProjectLeaderboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/investor/notifications"
                  element={
                    <ProtectedRoute allowedRoles={["investor"]}>
                      <Notifications />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/investor/ai-assistant"
                  element={
                    <ProtectedRoute allowedRoles={["investor"]}>
                      <AIAssistant />
                    </ProtectedRoute>
                  }
                />
                {/* Negotiation Routes - Accessible by both investors and project owners */}
                <Route
                  path="/negotiation/:negotiationId"
                  element={
                    <ProtectedRoute allowedRoles={["investor", "project-owner"]}>
                      <NegotiationRoom />
                    </ProtectedRoute>
                  }
                />
                <Route path="/chatbot" element={<ChatBot />} />

              </Routes>
              <ChatWidgetButton />
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
    
  )
}

export default App
