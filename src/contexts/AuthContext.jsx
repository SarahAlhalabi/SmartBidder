"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/accounts/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.detail || "Login failed" }
      }

      localStorage.setItem("accessToken", data.access)
      localStorage.setItem("refreshToken", data.refresh)

      const roleFromBackend = data.role?.toLowerCase()

      // ✅ تحسين التحقق من الدور
      const normalizedRole = ["owner", "project_owner", "project-owner"].includes(roleFromBackend)
        ? "project-owner"
        : roleFromBackend || "investor"

      const loggedUser = {
        id: data.user_id || 1,
        username,
        role: normalizedRole,
      }

      // ✅ طباعة للمساعدة على التحقق
      console.log("🟡 الدور المستلم من الباك:", data.role)
      console.log("🟢 الدور المستخدم فعليًا:", normalizedRole)
      console.log("🔵 بيانات المستخدم:", loggedUser)

      localStorage.setItem("user", JSON.stringify(loggedUser))
      setUser(loggedUser)

      return { success: true, user: loggedUser }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Login failed due to network error" }
    }
  }

  const register = async (userData) => {
    try {
      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.fullName,
        role: userData.userType,
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: "Registration failed" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
