import React, { useState } from 'react';
import MusicPlayer from './components/MusicPlayer';
import { 
  Home,
  Search,
  Library,
  PlusCircle,
  Sun,
  Moon,
  Music,
  Radio,
  Mic2,
  Heart,
  Clock,
  UserCircle,
} from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [activePlaylist, setActivePlaylist] = useState('Pure Fire!!1 🔥');

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const playlists = [
    'Pure Fire!!1 🔥',
    'Inspired 🎭',
    'Nostalgia',
    'Calm',
  ];

  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: Search, label: 'Search' },
    { icon: Library, label: 'Library' },
    { icon: Music, label: 'Songs' },
    { icon: Radio, label: 'Radio' },
    { icon: Mic2, label: 'Podcasts' },
    { icon: Heart, label: 'Liked' },
    { icon: Clock, label: 'History' },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#121212] text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="flex">
        {/* Sidebar */}
        <div className={`sidebar w-64 h-screen fixed ${
          isDark ? 'bg-black' : 'bg-white border-r border-gray-200'
        } p-6`}>
          <div className="flex items-center justify-between mb-8 window-controls">
            <div className="flex items-center space-x-2">
              <div className="window-dot w-3 h-3 rounded-full bg-red-500"></div>
              <div className="window-dot w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="window-dot w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <button 
              onClick={toggleTheme}
              className={`theme-toggle p-2 rounded-full ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <nav className="sidebar-nav space-y-6">
            <div className="space-y-3">
              {navItems.map((item) => (
                <a 
                  key={item.label}
                  href="#" 
                  className={`nav-item flex items-center space-x-3 ${
                    isDark ? 'opacity-70 hover:opacity-100' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            <div className={`pt-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <button className={`nav-item flex items-center space-x-3 ${
                isDark ? 'opacity-70 hover:opacity-100' : 'text-gray-600 hover:text-gray-900'
              }`}>
                <PlusCircle className="w-5 h-5" />
                <span>New Playlist</span>
              </button>

              <div className="mt-4 space-y-2">
                {playlists.map((playlist, index) => (
                  <button
                    key={playlist}
                    onClick={() => setActivePlaylist(playlist)}
                    className={`playlist-item block w-full text-left py-1 px-2 rounded ${
                      activePlaylist === playlist 
                        ? isDark 
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-900'
                        : isDark
                          ? 'hover:bg-gray-800/50'
                          : 'hover:bg-gray-100'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {playlist}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <button className={`nav-item flex items-center space-x-2 ${
              isDark ? 'opacity-70 hover:opacity-100' : 'text-gray-600 hover:text-gray-900'
            } w-full`}>
              <UserCircle className="w-6 h-6" />
              <span>Musa king</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content ml-64 flex-1">
          <MusicPlayer isDark={isDark} activePlaylist={activePlaylist} />
        </div>
      </div>
    </div>
  );
}

export default App;