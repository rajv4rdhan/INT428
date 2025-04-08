"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle signup logic here
    console.log("Signup with:", { name, email, password, agreeTerms })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 flex items-center justify-center px-4 py-12 relative">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 bg-[url('/images/noise.png')] opacity-[0.02] pointer-events-none z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>

      <div
        className={`w-full max-w-md transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-70"></div>
          <div className="relative bg-black/80 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <div className="flex flex-col items-center mb-8">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">M</span>
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Create Account
              </h1>
              <p className="text-gray-400 mt-2 text-center">
                Join MeloMind and discover music that speaks to your soul
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    required
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 rounded-lg pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    required
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 rounded-lg pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500 focus:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-300">
                    I agree to the{" "}
                    <Link to="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={!agreeTerms}
                className={`w-full ${
                  agreeTerms
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                    : "bg-gray-700 cursor-not-allowed"
                } text-white font-medium py-3 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
              >
                Create Account
              </button>

              <div className="relative flex items-center justify-center mt-6">
                <div className="border-t border-gray-700 absolute w-full"></div>
                <div className="bg-black/80 px-4 text-sm text-gray-400 relative">or sign up with</div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg py-2 px-4 flex justify-center hover:bg-white/10 transition-colors"
                >
                  <svg className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg py-2 px-4 flex justify-center hover:bg-white/10 transition-colors"
                >
                  <svg className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg py-2 px-4 flex justify-center hover:bg-white/10 transition-colors"
                >
                  <svg className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup

