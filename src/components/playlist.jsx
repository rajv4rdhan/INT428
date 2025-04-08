"use client"

import { Play, Trash2, Pause, CircleArrowRight, CircleArrowLeft } from "lucide-react"

function Playlist({ playlist, removeSong, playSong, currentSong, toggleLoop }) {
  return (
    <div className="flex flex-col h-full rounded-xl">
      <div className="flex bg-black/60 px-6 py-4 border-b border-white/10 flex-shrink-0 items-center justify-between">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Playlist
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={() => {
              const currentIndex = playlist.findIndex((song) => song.id === currentSong?.id)
              if (currentIndex > 0) {
                playSong(playlist[currentIndex - 1])
              }
            }}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={!currentSong || playlist.findIndex((song) => song.id === currentSong?.id) <= 0}
          >
            <CircleArrowLeft
              size={24}
              className={
                !currentSong || playlist.findIndex((song) => song.id === currentSong?.id) <= 0 ? "opacity-50" : ""
              }
            />
          </button>

          <button
            onClick={() => {
              const currentIndex = playlist.findIndex((song) => song.id === currentSong?.id)
              if (currentIndex < playlist.length - 1) {
                playSong(playlist[currentIndex + 1])
              }
            }}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={!currentSong || playlist.findIndex((song) => song.id === currentSong?.id) >= playlist.length - 1}
          >
            <CircleArrowRight
              size={24}
              className={
                !currentSong || playlist.findIndex((song) => song.id === currentSong?.id) >= playlist.length - 1
                  ? "opacity-50"
                  : ""
              }
            />
          </button>
        </div>
      </div>

      {/* Set a fixed height container with overflow handling */}
      <div
        className="flex-1 min-h-0 overflow-y-auto p-5 space-y-3
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-black/30
          [&::-webkit-scrollbar-thumb]:bg-purple-900/50
          dark:[&::-webkit-scrollbar-track]:bg-black/30
          dark:[&::-webkit-scrollbar-thumb]:bg-purple-900/50"
      >
        {playlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="h-16 w-16 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center mb-4">
              <Play size={24} className="text-gray-400 ml-1" />
            </div>
            <p className="text-gray-400 text-sm">Your playlist is empty</p>
            <p className="text-gray-500 text-xs mt-2">Use the chat to get song recommendations</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {playlist.map((song) => (
              <li
                key={song.id}
                className={`flex items-center justify-between rounded-lg p-3 transition-all duration-200 ${
                  currentSong?.id === song.id
                    ? "bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-l-4 border-purple-500"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center flex-1 min-w-0 cursor-pointer" onClick={() => playSong(song)}>
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full mr-3 ${
                      currentSong?.id === song.id ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-white/10"
                    }`}
                  >
                    {currentSong?.id === song.id ? (
                      <Pause size={16} className="text-white" />
                    ) : (
                      <Play size={16} className="text-white ml-0.5" />
                    )}
                  </div>
                  <span
                    className={`truncate text-sm ${
                      currentSong?.id === song.id ? "text-white font-medium" : "text-gray-300"
                    }`}
                  >
                    {song.title}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeSong(song.id)
                  }}
                  className="ml-2 text-gray-400 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-white/5"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
export default Playlist

