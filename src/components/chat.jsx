"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Plus, Sparkles } from "lucide-react"
const VITE_API_URL = import.meta.env.VITE_API_URL;

function Chat({ addSong }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const apiUrl = import.meta.env.VITE_API_URL
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const safeJsonParse = (jsonString) => {
    let cleanedString = jsonString

    const codeBlockMatch = jsonString.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (codeBlockMatch) {
      cleanedString = codeBlockMatch[1]
    }
    cleanedString = cleanedString.replace(/'/g, '"')
    cleanedString = cleanedString.replace(/&amp;/g, "&")

    try {
      return JSON.parse(cleanedString)
    } catch (error) {
      console.error("JSON Parse Error:", error)
      return null
    }
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { sender: "You", text: input, videos: [] }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const authToken = localStorage.getItem("authToken");
      const data1 = JSON.stringify({
      prompt: input,
      });

      const response = await fetch(`${VITE_API_URL}/gemini/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: data1,
      });

      
      const datav = await response.json()
      const data = datav.response
      console.log("Response from server:", data)
      
      // Handle DomainError case
      if (data.output?.DomainError || (typeof data.output === "string" && data.output.includes("DomainError"))) {
        let errorMessage = "This request couldn't be processed."
      
        // Direct access to DomainError when it's a direct property
        if (data.output?.DomainError) {
          errorMessage = data.output.DomainError;
        } 
        // Try to parse if it's a string
        else if (typeof data.output === "string") {
          try {
            const parsedOutput = JSON.parse(data.output);
            if (parsedOutput.DomainError) {
              errorMessage = parsedOutput.DomainError;
            }
          } catch (error) {
            console.error("Error parsing domain error:", error);
            
            // Try to extract using regex as fallback
            const errorMatch = data.output.match(/DomainError":\s*"([^"]+)"/);
            if (errorMatch && errorMatch[1]) {
              errorMessage = errorMatch[1];
            }
          }
        }
      
        setMessages((prev) => [...prev, { sender: "Bot", text: errorMessage, videos: [] }]);
        setInput("");
        setIsLoading(false);
        return;
      }

      if (data.output) {
      // Parse the output string which contains the songs array
      let parsedSongs = null;
      
      try {
        // Replace single quotes with double quotes for valid JSON
        const jsonString = data.output.replace(/'/g, '"');
        parsedSongs = JSON.parse(jsonString);
      } catch (error) {
        console.error("Error parsing songs from output:", error);
        
        // Fallback to the old parsing method
        if (typeof data.songs === "string") {
        parsedSongs = safeJsonParse(data.songs);
        } else if (Array.isArray(data.songs)) {
        parsedSongs = data.songs;
        } else if (typeof data.songs === "object") {
        parsedSongs = [data.songs];
        }
      }

      if (parsedSongs && (Array.isArray(parsedSongs) || typeof parsedSongs === "object")) {
        const videos = Array.isArray(parsedSongs) ? parsedSongs : [parsedSongs];

        const botMessage = {
        sender: "Bot",
        text: "Here are some video recommendations:",
        videos: videos,
        };

        setMessages((prev) => [...prev, botMessage]);
      } else {
        setMessages((prev) => [
        ...prev,
        {
          sender: "Bot",
          text: "Received an invalid format from the server. Please try again.",
          videos: [],
        },
        ]);
      }
      } else {
      setMessages((prev) => [
        ...prev,
        {
        sender: "Bot",
        text: "Sorry, I couldn't find any videos.",
        videos: [],
        },
      ]);
      }

      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
      ...prev,
      {
        sender: "Bot",
        text: "Error sending message. Try again later.",
        videos: [],
      },
      ]);
    } finally {
      setIsLoading(false);
    }
    }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full rounded-xl">
      <div className="bg-black/60 px-6 py-4 border-b border-white/10 flex-shrink-0 flex items-center justify-between">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          TuneLoom AI
        </h2>
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
          <Sparkles size={14} className="text-purple-400" />
          <span className="text-xs font-medium">AI-Powered</span>
        </div>
      </div>

      {/* Set a fixed height container with overflow handling - adjusted for responsiveness */}
      <div
        className="flex-1 min-h-0 overflow-y-auto p-5 space-y-4
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-black/30
          [&::-webkit-scrollbar-thumb]:bg-purple-900/50
          dark:[&::-webkit-scrollbar-track]:bg-black/30
          dark:[&::-webkit-scrollbar-thumb]:bg-purple-900/50"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-900/30 to-pink-900/30 flex items-center justify-center mb-4">
              <Sparkles size={24} className="text-purple-400" />
            </div>
            <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Music Discovery Assistant
            </p>
            <p className="text-gray-400 text-sm mt-2 text-center max-w-xs">
              Describe your mood or ask for music recommendations to get started
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex flex-col ${msg.sender === "You" ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-3/4 rounded-lg px-4 py-2 ${
                  msg.sender === "You"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-white/10 backdrop-blur-sm border border-white/10 text-gray-100"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>

              {msg.videos && msg.videos.length > 0 && (
                <div className="mt-3 w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                  <p className="text-gray-300 text-xs mb-3 flex items-center">
                    <Sparkles size={12} className="text-purple-400 mr-1" />
                    Recommended tracks:
                  </p>
                  <ul className="space-y-2">
                    {msg.videos.map((video, vidIndex) => (
                      <li
                        key={vidIndex}
                        className="flex items-center justify-between text-sm text-gray-300 bg-black/40 rounded-lg p-2.5"
                      >
                        <span className="truncate mr-2 max-w-full lg:max-w-xs">{video.title}</span>
                        <button
                          onClick={() => {
                            addSong(video.title, video.code)
                            video.added = true
                          }}
                          disabled={video.added}
                          className={`flex-shrink-0 flex items-center rounded-full px-3 py-1 text-xs text-white transition-all ${
                            video.added
                              ? "bg-gray-700"
                              : "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                          }`}
                        >
                          {video.added ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="hidden xs:inline">Added</span>
                            </>
                          ) : (
                            <>
                              <Plus size={12} className="mr-1" />
                              <span className="hidden xs:inline">Add</span>
                            </>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-2 w-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    ></div>
                  ))}
                </div>
                <p className="text-gray-300 text-sm">Finding music for you...</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-black/60 p-3 md:p-5 border-t border-white/10 flex-shrink-0">
        <div className="flex relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a mood or genre..."
            className="flex-1 bg-white/10 backdrop-blur-sm border border-white/10 text-gray-100 placeholder-gray-400 rounded-full px-4 md:px-5 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10 md:pr-12 text-sm md:text-base"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className={`absolute right-1 top-1 bottom-1 ${
              isLoading ? "bg-purple-400/80" : "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
            } text-white rounded-full w-8 md:w-10 flex items-center justify-center transition-all focus:outline-none`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat