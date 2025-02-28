import React, { useRef, useEffect } from 'react';
import { Play, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Pause } from 'lucide-react';
import PropTypes from 'prop-types';

const Controls = ({ 
  isDark, 
  currentSong, 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrevious,
  volume,
  onVolumeChange,
  shuffle,
  onShuffleToggle,
  repeat,
  onRepeatToggle
}) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
      const newTime = clickPosition * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <audio 
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
      />
      
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onShuffleToggle}
            className={`${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            } transform hover:scale-110 transition-all duration-300 ${shuffle ? 'text-green-500' : ''}`}
          >
            <Shuffle className="w-5 h-5" />
          </button>
          <button 
            onClick={onPrevious}
            className={`${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            } transform hover:scale-110 transition-all duration-300`}
          >
            <SkipBack className="w-5 h-5" />
          </button>
          <button 
            onClick={onPlayPause}
            className="play-button w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-400 transform hover:scale-105 transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </button>
          <button 
            onClick={onNext}
            className={`${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            } transform hover:scale-110 transition-all duration-300`}
          >
            <SkipForward className="w-5 h-5" />
          </button>
          <button 
            onClick={onRepeatToggle}
            className={`${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            } transform hover:scale-110 transition-all duration-300 ${repeat ? 'text-green-500' : ''}`}
          >
            <Repeat className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <Volume2 className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <div className="relative w-24 h-1 bg-gray-300 rounded-full">
            <div 
              className="absolute h-full bg-green-500 rounded-full" 
              style={{ width: `${volume}%` }}
            />
            <input
              type="range"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => onVolumeChange(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>
      
      <div className="w-full">
        <div className="relative h-1 bg-gray-300 rounded-full cursor-pointer" onClick={handleProgressClick}>
          <div 
            className="absolute h-full bg-green-500 rounded-full transition-all duration-150"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
        <div className={`flex justify-between text-xs ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        } mt-1`}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

Controls.propTypes = {
  isDark: PropTypes.bool.isRequired,
  currentSong: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  shuffle: PropTypes.bool.isRequired,
  onShuffleToggle: PropTypes.func.isRequired,
  repeat: PropTypes.bool.isRequired,
  onRepeatToggle: PropTypes.func.isRequired
};

export default Controls;