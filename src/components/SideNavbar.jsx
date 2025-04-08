"use client"

import { useEffect, useState } from "react"
import { Home, Headphones, Heart, History, Mic, Settings, Sparkles, LogOut, Menu, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

function SideNavbar({ isSidebar, setIsSidebar, isCollapsed, setIsCollapsed }) {
  
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
  // Initialize sidebar state
  setIsSidebar(true)
  setIsCollapsed(true)
  
  // Function to handle screen resize
  const handleResize = () => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    setIsCollapsed(true)
    
    if (mobile && !isMobile) {
    setIsCollapsed(true)
    }
  }
  
  // Set initial state
  handleResize()
  
  // Add resize listener
  window.addEventListener('resize', handleResize)
  
  // Clean up
  return () => window.removeEventListener('resize', handleResize)
  }, [setIsSidebar, setIsCollapsed, isMobile])

  const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Headphones, label: "Discover", path: "/discover" },
  { icon: Heart, label: "Favorites", path: "/favorites" },
  { icon: History, label: "History", path: "/history" },
  { icon: Mic, label: "Live Sessions", path: "/live" },
  ]

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    // Set token to null in state if you have it in component state
    window.location.reload();
  };

  const secondaryNavItems = [
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: LogOut, label: "Log Out", onClick: handleLogout },
  ]

  const toggleCollapse = () => {
  setIsCollapsed(!isCollapsed)
  }
  
  const toggleSidebar = () => {
  setIsSidebar(!isSidebar)
  }

  // Handle navigation clicks
  const handleNavClick = (path, onClick) => {
    if (onClick) {
      onClick();
    } else {
      navigate(path);
    }
    // Only auto-close on mobile
    if (isMobile) {
      setIsSidebar(false);
    }
  }

  return (
  <>
    {/* Mobile menu button */}
    {isMobile && (
    <button 
      onClick={toggleSidebar}
      className="fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full shadow-lg md:hidden"
      aria-label="Toggle menu"
    >
      {isSidebar ? (
      <X size={20} className="text-white" />
      ) : (
      <Menu size={20} className="text-white" />
      )}
    </button>
    )}
    
    {/* Main sidebar */}
    <aside
    className={`h-screen flex flex-col fixed top-0 left-0 z-40 ${
      isCollapsed ? "w-20" : "w-64"
    } bg-black/80 backdrop-blur-sm border-r border-white/10 transition-all duration-300 ${
      isSidebar ? "translate-x-0" : "-translate-x-full"
    }`}
    >
    {/* Glassmorphism effect overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-pink-900/10 rounded-r-xl pointer-events-none"></div>

    {/* Collapse button - hidden on mobile */}
    {!isMobile && (
      <button
      onClick={toggleCollapse}
      className="absolute -right-3 top-8 bg-gradient-to-r from-purple-500 to-pink-500 p-1.5 rounded-full shadow-lg z-10"
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
      <div className="bg-black rounded-full p-0.5">
        {isCollapsed ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        )}
      </div>
      </button>
    )}

    {/* Header */}
    <div className="flex items-center px-6 py-6 border-b border-white/10">
      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
      <Sparkles size={20} className="text-white" />
      </div>
      {!isCollapsed && (
      <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
        MeloMind
      </h1>
      )}
    </div>

    {/* Main Navigation */}
    <div className="flex-1 px-4 py-6 overflow-y-auto">
      <ul className="space-y-2">
      {navItems.map((item, index) => (
        <li key={index}>
        <button
          onClick={() => handleNavClick(item.path)}
          className={`flex items-center w-full rounded-lg transition-all duration-200 ${
          window.location.pathname === item.path
            ? "bg-gradient-to-r from-purple-900/40 to-pink-900/40 text-white"
            : "hover:bg-white/10 text-gray-300 hover:text-white"
          } ${isCollapsed ? "justify-center p-3" : "px-4 py-3"}`}
        >
          <item.icon size={20} className={`${isCollapsed ? "" : "mr-3"}`} />
          {!isCollapsed && <span>{item.label}</span>}
        </button>
        </li>
      ))}
      </ul>

      {/* Now Playing Section (visible only in expanded mode) */}
      {!isCollapsed && (
      <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
        <p className="text-xs text-gray-400 mb-2">Now Playing</p>
        <div className="flex items-center">
        <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30 flex items-center justify-center">
          <Headphones size={20} className="text-gray-300" />
        </div>
        <div className="ml-3 overflow-hidden">
          <p className="text-sm font-medium text-white truncate">Cosmic Harmony</p>
          <p className="text-xs text-gray-400 truncate">Stellar Waves</p>
        </div>
        </div>
        <div className="mt-3 flex gap-1 h-1 bg-white/10 rounded-full">
        <div className="w-2/3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </div>
      </div>
      )}
    </div>

    {/* Secondary Navigation */}
    <div className="px-4 pb-6 border-t border-white/10 pt-4">
      <ul className="space-y-2">
      {secondaryNavItems.map((item, index) => (
        <li key={index}>
        <button
          onClick={() => handleNavClick(item.path, item.onClick)}
          className={`flex items-center w-full rounded-lg transition-all duration-200 ${
          window.location.pathname === item.path
            ? "bg-gradient-to-r from-purple-900/40 to-pink-900/40 text-white"
            : "hover:bg-white/10 text-gray-300 hover:text-white"
          } ${isCollapsed ? "justify-center p-3" : "px-4 py-3"}`}
        >
          <item.icon size={20} className={`${isCollapsed ? "" : "mr-3"}`} />
          {!isCollapsed && <span>{item.label}</span>}
        </button>
        </li>
      ))}
      </ul>
    </div>

    {/* Pro Badge (visible only in expanded mode) */}
    {!isCollapsed && (
      <div className="mx-4 mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
      <div className="inline-flex items-center justify-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full mb-2">
        <Sparkles size={12} className="text-purple-400" />
        <span className="text-xs font-medium text-purple-300">Pro</span>
      </div>
      <p className="text-sm text-white">Upgrade to Premium</p>
      <p className="text-xs text-gray-400 mt-1">Unlock all features</p>
      <button className="mt-3 w-full bg-gradient-to-r from-purple-500 to-pink-500 py-2 rounded-lg text-white text-sm font-medium">
        Upgrade
      </button>
      </div>
    )}
    </aside>
    
    {/* Overlay for mobile - closes sidebar when clicking outside */}
    {isMobile && isSidebar && (
    <div 
      className="fixed inset-0 bg-black/50 z-30 md:hidden"
      onClick={() => setIsSidebar(false)}
      aria-label="Close menu"
    ></div>
    )}
  </>
  )
}

export default SideNavbar