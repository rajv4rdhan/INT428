import { Music } from "lucide-react"

function Ytplayer({ currentSong }) {
  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden">
      <div className="flex-1 min-h-0 flex items-center justify-center bg-black/60">
        {currentSong ? (
          <div className="w-full h-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${currentSong.url}?autoplay=1`}
              title="YouTube video player"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-purple-900/30 to-pink-900/30 flex items-center justify-center mb-4">
              <Music size={40} className="text-gray-300" />
            </div>
            <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Select a song to play
            </p>
            <p className="text-gray-500 text-sm mt-2">Your music will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Ytplayer

