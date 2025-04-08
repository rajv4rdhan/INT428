// import { useState, useEffect } from "react";
// import Chat from "../components/chat.jsx";
// import Ytplayer from "../components/ytplayer.jsx";
// import Playlist from "../components/playlist.jsx";
// import ReactiveBackground from "../components/ReactiveBackground.jsx";
// import SideNavbar from "../components/SideNavbar.jsx"; // Import the SideNavbar

// function Player() {
//   const [playlist, setPlaylist] = useState([
//     { id: 1, title: "Song 1", url: "OEuiB_7iPl4" },
//     { id: 2, title: "Song 2", url: "Jg0UUvZcl2A" },
//     { id: 3, title: "Song 3", url: "7h6kUNlC6cs" },

//   ]);

//   const [currentSong, setCurrentSong] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const [isSidebar, setIsSidebar] = useState(true)
//   const [isCollapsed, setIsCollapsed] = useState(false)

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//     const addSong = (title, url) => {
//     const newSong = { id: Date.now(), title, url };
//     setPlaylist([...playlist, newSong]);
//   };

//   const removeSong = (id) => {
//     setPlaylist(playlist.filter((song) => song.id !== id));
//     if (currentSong && currentSong.id === id) {
//       setCurrentSong(null);
//     }
//   };

//   const playSong = (song) => {
//     setCurrentSong(song);
//   };

//   const toggleLoop = () => {
//     if (currentSong) {
//       setCurrentSong({ ...currentSong, loop: !currentSong.loop });
//     }
//   };

//   return (
//     <div className="flex min-h-screen text-white relative">
//       <div className="relative z-20 bg-black/90">
//         <SideNavbar
//           isSidebar={isSidebar}
//           isCollapsed={isCollapsed}
//           setIsSidebar={setIsSidebar}
//           setIsCollapsed={setIsCollapsed}
//         />
//       </div>

//       <div className="flex-1 relative bg-gradient-to-b from-black to-purple-950 z-10">
//         {/* Noise texture overlay */}
//         <div className="fixed inset-0 bg-[url('/images/noise.png')] opacity-[0.02] pointer-events-none z-0"></div>

//         {/* Reactive Background */}
//         <ReactiveBackground currentSong={currentSong} />

//         {/* Decorative elements */}
//         <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>

//         <div className="container mx-auto px-4 py-6 h-screen flex flex-col relative z-10">
//           {/* Fixed height container with overflow hidden */}
//           <div className={`flex-1 min-h-0 flex flex-col transition-all duration-1000 ${
//             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//           }`}>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
//               {/* Left Column (Ytplayer and Playlist) */}
//               <div className="lg:col-span-2 flex flex-col h-[95vh]">
//                 {/* Ytplayer */}
//                 <div className="h-1/2 min-h-0 mb-6">
//                   <div className="relative h-full">
//                     <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-50"></div>
//                     <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-xl border border-white/10">
//                       <Ytplayer currentSong={currentSong} />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Playlist */}
//                 <div className="flex-1 min-h-0">
//                   <div className="relative h-full">
//                     <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-50"></div>
//                     <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-xl border border-white/10">
//                       <Playlist
//                         playlist={playlist}
//                         removeSong={removeSong}
//                         playSong={playSong}
//                         currentSong={currentSong}
//                         toggleLoop={toggleLoop}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column (Chat) */}
//               <div className="min-h-0">
//                 <div className="relative h-full">
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-50"></div>
//                   <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-xl border border-white/10">
//                     <Chat addSong={addSong} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Player;

import { useState, useEffect } from "react";
import Chat from "../components/chat.jsx";
import Ytplayer from "../components/ytplayer.jsx";
import Playlist from "../components/playlist.jsx";
import ReactiveBackground from "../components/ReactiveBackground.jsx";
import SideNavbar from "../components/SideNavbar.jsx";

function Player() {
  const [playlist, setPlaylist] = useState([
    { id: 1, title: "Midnight City – M83", url: "pwuFTsvJL34" },
    { id: 2, title: "Nightcall – Kavinsky", url: "MV_3Dpw-BRY" },
    { id: 3, title: "Sanctuary – Joji", url: "R2zXxQHBpd8" },
    { id: 4, title: "Let It Happen – Tame Impala", url: "odeHP8N4LKc" },
    { id: 5, title: "A Moment Apart – ODESZA", url: "vWW5Kx0F6rM" },
    { id: 6, title: "After Hours – The Weeknd", url: "ygTZZpVkmKg" },
    { id: 7, title: "Awake – Tycho", url: "Z6ih1aKeETk" },
    { id: 8, title: "Never Be Like You – Flume ft. Kai", url: "Ly7uj0JwgKg" },
    { id: 9, title: "Day 1 ◑ – HONNE", url: "4BranEUNxdc" },
    { id: 10, title: "I Like Me Better – Lauv", url: "bEdcJgPngtM" },
  ]);

  const [currentSong, setCurrentSong] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("playlist"); // For mobile view: "playlist" or "chat"

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const addSong = (title, url) => {
    const newSong = { id: Date.now(), title, url };
    setPlaylist([...playlist, newSong]);
  };

  const removeSong = (id) => {
    setPlaylist(playlist.filter((song) => song.id !== id));
    if (currentSong && currentSong.id === id) {
      setCurrentSong(null);
    }
  };

  const playSong = (song) => {
    setCurrentSong(song);
  };

  const toggleLoop = () => {
    if (currentSong) {
      setCurrentSong({ ...currentSong, loop: !currentSong.loop });
    }
  };

  return (
    <div className="flex min-h-screen text-white relative">
      <div className="relative z-20 bg-black/90">
        <SideNavbar
          isSidebar={isSidebar}
          isCollapsed={isCollapsed}
          setIsSidebar={setIsSidebar}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      <div className="flex-1 relative bg-gradient-to-b from-black to-purple-950 z-10">
        {/* Noise texture overlay */}
        <div className="fixed inset-0 bg-[url('/images/noise.png')] opacity-[0.02] pointer-events-none z-0"></div>

        {/* Reactive Background */}
        <ReactiveBackground currentSong={currentSong} />

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 py-6 h-screen flex flex-col relative z-10">
          {/* Fixed height container with overflow hidden */}
          <div
            className={`flex-1 min-h-0 flex flex-col transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Desktop Layout (unchanged) */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6 flex-1 min-h-0">
              {/* Left Column (Ytplayer and Playlist) */}
              <div className="lg:col-span-2 flex flex-col h-[95vh]">
                {/* Ytplayer */}
                <div className="h-1/2 min-h-0 mb-6">
                  <div className="relative h-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-50"></div>
                    <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-xl border border-white/10">
                      <Ytplayer currentSong={currentSong} />
                    </div>
                  </div>
                </div>

                {/* Playlist */}
                <div className="flex-1 min-h-0">
                  <div className="relative h-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-50"></div>
                    <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-xl border border-white/10">
                      <Playlist
                        playlist={playlist}
                        removeSong={removeSong}
                        playSong={playSong}
                        currentSong={currentSong}
                        toggleLoop={toggleLoop}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (Chat) */}
              <div className="min-h-0">
                <div className="relative h-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-50"></div>
                  <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-xl border border-white/10">
                    <Chat addSong={addSong} />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout (new) */}
            <div className="flex flex-col lg:hidden h-[95vh] gap-4">
              {/* YTPlayer at the top */}
              <div className="h-2/5">
                <div className="relative h-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-50"></div>
                  <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-xl border border-white/10">
                    <Ytplayer currentSong={currentSong} />
                  </div>
                </div>
              </div>

              {/* Tab Switcher */}
              <div className="flex justify-center mb-2">
                <div
                  className="inline-flex rounded-md shadow-sm backdrop-blur-sm relative overflow-hidden"
                  role="group"
                >
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-pink-900/10 rounded-lg pointer-events-none"></div>
                  <div className="absolute inset-0 border border-white/10 rounded-lg pointer-events-none"></div>

                  <button
                    type="button"
                    onClick={() => setActiveTab("playlist")}
                    className={`px-4 py-2 text-sm font-medium rounded-l-lg relative ${
                      activeTab === "playlist"
                        ? "bg-gradient-to-r from-purple-600/90 to-pink-600/90 text-white"
                        : "bg-black/60 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    Playlist
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("chat")}
                    className={`px-4 py-2 text-sm font-medium rounded-r-lg relative ${
                      activeTab === "chat"
                        ? "bg-gradient-to-r from-purple-600/90 to-pink-600/90 text-white"
                        : "bg-black/60 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    Chat
                  </button>
                </div>
              </div>

              {/* Content based on active tab */}
              <div className="flex-1 min-h-0">
                <div className="relative h-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-50"></div>
                  <div className="relative h-full bg-black/80 backdrop-blur-sm rounded-xl border border-white/10">
                    {activeTab === "playlist" ? (
                      <Playlist
                        playlist={playlist}
                        removeSong={removeSong}
                        playSong={playSong}
                        currentSong={currentSong}
                        toggleLoop={toggleLoop}
                      />
                    ) : (
                      <Chat addSong={addSong} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
