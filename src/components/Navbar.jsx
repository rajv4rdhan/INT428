"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

export default function Navbar({ scrolled, isAuthenticated }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    // Set token to null in state if you have it in component state
    window.location.reload();
  };
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-xl font-bold">M</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            TuneLoom
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#download" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Download
          </a>
          <Link
            to={isAuthenticated ? "" : "/login"}
            onClick={isAuthenticated ? handleLogout : undefined}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            {isAuthenticated?"Log Out":"Sign In"}
          </Link>
          
          <Link
            to={isAuthenticated?"/player":"/signup"}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {isAuthenticated?"Play Now":"Sign Up"}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md absolute top-full left-0 right-0 p-4 flex flex-col gap-4">
          <a
            href="#features"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </a>
          <a
            href="#download"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Download
          </a>
          <Link
            to="/login"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  )
}

