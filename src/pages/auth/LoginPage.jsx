"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { useTheme } from "../../contexts/ThemeContext"

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [logoSrc, setLogoSrc] = useState("")

  useEffect(() => {
    setLogoSrc(isDarkMode ? "/logo-dark2.png" : "/logo1.png")
  }, [isDarkMode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const result = await login(formData.username, formData.password)
    if (result.success) {
      const role = result.user.role
      switch (role) {
        case "admin":
          navigate("/admin/dashboard", { replace: true })
          break
        case "project-owner":
          navigate("/project-owner/dashboard", { replace: true })
          break
        default:
          navigate("/investor/dashboard", { replace: true })
      }
    } else {
      alert(result.error)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
     <nav className="bg-white dark:bg-gray-800 shadow-md w-full">
  <div className="flex justify-between items-center px-6 py-4">
    {/* الشعار في أقصى اليسار */}
    <Link to="/" className="flex items-center">
      <img
        src={logoSrc}
        alt="Smart Bidder Logo"
        className="h-10 w-auto object-contain"
      />
    </Link>

    {/* زر الوضع */}
    <button
      onClick={toggleTheme}
      className="text-gray-600 dark:text-gray-300 hover:text-emerald-500 transition"
      aria-label="Toggle Dark Mode"
    >
      {/* الشمس */}
      <svg className="h-6 w-6 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 3v1m0 16v1m8.66-11.66l-.7.7M4.34 4.34l.7.7M21 12h1M2 12H1m16.66 8.66l-.7-.7M4.34 19.66l.7-.7M12 5a7 7 0 000 14a7 7 0 000-14z" />
      </svg>
      {/* القمر */}
      <svg className="h-6 w-6 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
      </svg>
    </button>
  </div>
</nav>


      {/* Form Container */}
      <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src={logoSrc}
            alt="Smart Bidder Logo"
            className="h-24 w-auto object-contain mb-2 transition-all duration-300"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">Where Ideas Meet Investors</p>
          <h2 className="text-xl font-semibold mt-6">Login to Your Account</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 py-8 max-w-md w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 pr-10 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="text-right text-sm">
              <Link to="/forgot-password" className="text-emerald-600 hover:text-emerald-500">
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                </svg>
              ) : (
                <>
                  <ArrowRight className="w-5 h-5" />
                  Login
                </>
              )}
            </button>

            <div className="flex items-center justify-between">
              <hr className="w-full border-gray-300 dark:border-gray-600" />
              <span className="px-3 text-sm text-gray-500 dark:text-gray-400">Or</span>
              <hr className="w-full border-gray-300 dark:border-gray-600" />
            </div>

            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-emerald-600 hover:text-emerald-500 font-medium">Register now</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
