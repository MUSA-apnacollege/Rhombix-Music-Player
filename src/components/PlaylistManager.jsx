import React from 'react';
import { Clock, MoreHorizontal, Play } from 'lucide-react';

const PlaylistManager = ({ songs, isDark, onSongSelect, currentSong }) => {
  return (
    <div className="mt-8">
      <div className={`grid grid-cols-[4fr,3fr,3fr,1fr,auto] gap-4 px-4 py-2 border-b ${
        isDark ? 'border-gray-800/50' : 'border-gray-200'
      } text-sm`}>
        <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>Title : Love</div>
        <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>ARTIST</div>
        <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>ALBUM</div>
        <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
          <Clock className="w-4 h-4" />
        </div>
        <div></div>
      </div>

      <div className="mt-2">
        {songs.map((song, index) => (
          <div 
            key={song.title}
            onClick={() => onSongSelect(song)}
            className={`grid grid-cols-[4fr,3fr,3fr,1fr,auto] gap-4 px-4 py-3 rounded-md group cursor-pointer ${
              isDark 
                ? 'hover:bg-gray-800/50' 
                : 'hover:bg-gray-100'
            } ${currentSong.src === song.src ? (isDark ? 'bg-gray-800/50' : 'bg-gray-100') : ''}`}
          >
            <div className="flex items-center space-x-4">
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'} group-hover:hidden ${
                currentSong.src === song.src ? 'hidden' : ''
              }`}>
                {index + 1}
              </span>
              <Play className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-900'} hidden ${
                currentSong.src === song.src || 'group-hover:'
              }block`} />
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                {song.title}
              </span>
            </div>
            <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {song.artist}
            </div>
            <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {song.album}
            </div>
            <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {song.duration}
            </div>
            <button className="opacity-0 group-hover:opacity-100">
              <MoreHorizontal className={`w-5 h-5 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistManager;