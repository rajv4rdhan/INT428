"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import HowItWorks from "./components/HowItWorks"
import CallToAction from "./components/CallToAction"
import Footer from "./components/Footer"
import AudioWave from "./components/AudioWave"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Home from "./pages/Player"
const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${VITE_API_URL}/auth/validate-token`, {
        method: 'POST',
        headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.valid && data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      setIsAuthenticated(data.valid);
      } catch (error) {
      console.error('Token validation error:', error);
      setIsAuthenticated(false);
      } finally {
      setIsLoading(false);
      }
    };

    validateToken();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-pulse flex space-x-2 mb-4">
            <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
            <div className="h-3 w-3 bg-indigo-500 rounded-full"></div>
            <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
          </div>
          <p className="text-xl font-medium bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            Loading VibeTunes...
          </p>
        </div>
        <div className="fixed inset-0 bg-[url('/images/noise.png')] opacity-[0.02] pointer-events-none z-0"></div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.setItem('authToken', null);
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 text-white">
        <div className="fixed inset-0 bg-[url('/images/noise.png')] opacity-[0.02] pointer-events-none z-0"></div>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/player" /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/player" /> : <Signup />} />
          <Route path="/player" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
          <Route path="/logout" element={<Navigate to="/" replace state={{ loggedOut: true }} />} />
          <Route
            path="/"
            element={
              <>
                <Navbar scrolled={scrolled} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                <main>
                  <Hero isAuthenticated={isAuthenticated} />
                  <AudioWave />
                  <Features />
                  <HowItWorks />
                  <CallToAction />
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

