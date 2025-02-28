"use client";

import { useState, useEffect } from "react";
import Controls from "./Controls";
import PlaylistManager from "./PlaylistManager";
import UploadMusic from "./UploadMusic";
import PropTypes from "prop-types";

const MusicPlayer = ({ isDark, activePlaylist }) => {
  const [songs, setSongs] = useState(() => {
    const savedSongs = localStorage.getItem("songs");
    return savedSongs
      ? JSON.parse(savedSongs)
      : [
          {
            id: "1",
            title: "So Heavy I Fell Through the Earth",
            artist: "Grimes",
            album: "Miss Anthropocene",
            cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
            duration: "3:52",
            addedAt: "20 minutes ago",
            src: "src/assets/song1.mp3",
          },
          {
            id: "2",
            title: "My Song 2",
            artist: "Local Artist",
            album: "Local Album",
            duration: "3:12",
            addedAt: "2 hours ago",
            src: "src/assets/song2.mp3",
          },
        ];
  });

  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [playHistory, setPlayHistory] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // New search state

  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    setIsPlaying(false);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (shuffle) {
      const availableSongs = songs.filter((song) => song.id !== currentSong.id);
      const randomSong = availableSongs[Math.floor(Math.random() * availableSongs.length)];
      setCurrentSong(randomSong);
    } else {
      const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      const nextSong = songs[(currentIndex + 1) % songs.length];
      setCurrentSong(nextSong);
    }
    setIsPlaying(true);
    setPlayHistory([...playHistory, currentSong]);
  };

  const handlePrevious = () => {
    if (playHistory.length > 0) {
      const previousSong = playHistory[playHistory.length - 1];
      setCurrentSong(previousSong);
      setPlayHistory(playHistory.slice(0, -1));
    } else {
      const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      const previousSong = songs[(currentIndex - 1 + songs.length) % songs.length];
      setCurrentSong(previousSong);
    }
    setIsPlaying(true);
  };

  const handleSongEnd = () => {
    if (repeat) {
      setIsPlaying(true);
    } else {
      handleNext();
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const handleShuffleToggle = () => {
    setShuffle(!shuffle);
  };

  const handleRepeatToggle = () => {
    setRepeat(!repeat);
  };

  const handleNewSongs = (newSongs) => {
    const updatedSongs = [...songs, ...newSongs];
    setSongs(updatedSongs);
    localStorage.setItem("songs", JSON.stringify(updatedSongs));
  };

  const handleDeleteSong = (id) => {
    const updatedSongs = songs.filter((song) => song.id !== id);
    setSongs(updatedSongs);
    localStorage.setItem("songs", JSON.stringify(updatedSongs));
    if (currentSong.id === id) {
      setCurrentSong(updatedSongs[0] || null);
    }
  };

  // ✅ Filter songs based on search input
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`p-8 ${isDark ? "bg-gradient-to-b from-[#1a1a1a] to-[#121212]" : "bg-gradient-to-b from-gray-50 to-white"}`}>
      {/* Playlist Header with Animation */}
      <div className="flex items-center space-x-6 mb-8">
        <div className="playlist-cover relative group">
          <img
            src={currentSong?.cover || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500"}
            alt="Playlist Cover"
            className="w-60 h-60 rounded-lg shadow-xl transition-transform duration-500 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
            <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                onClick={handlePlayPause}
                className="bg-green-500 text-white px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-green-400"
              >
                {isPlaying ? "Pause" : "Play All"}
              </button>
            </div>
          </div>
        </div>
        <div className="transform transition-all duration-300 hover:scale-105">
          <h1 className={`text-7xl font-bold mb-4 ${isDark ? "bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400" : "text-gray-900"}`}>
            {activePlaylist}
          </h1>
          <p className={`text-sm ${isDark ? "opacity-70" : "text-gray-600"} transform hover:translate-x-2 transition-transform duration-300`}>
            Created by Musa king
          </p>
        </div>
      </div>

      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="Search songs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-black transition-all text-yellow-300 bg-slate-600 font-bold"
      />

      {/* Upload Music Button */}
      <button
        onClick={() => setShowUpload(!showUpload)}
        className={`px-4 py-2 rounded-full ${isDark ? "bg-green-500 hover:bg-green-400" : "bg-green-500 hover:bg-green-400"} text-white transition-all duration-300 mb-4`}
      >
        {showUpload ? "Hide Upload" : "Add Music"}
      </button>

      {showUpload && (
        <div className="mb-8">
          <UploadMusic onUpload={handleNewSongs} isDark={isDark} existingSongs={songs} onDelete={handleDeleteSong} />
        </div>
      )}

      <Controls isDark={isDark} currentSong={currentSong} isPlaying={isPlaying} onPlayPause={handlePlayPause} onNext={handleNext} onPrevious={handlePrevious} volume={volume} onVolumeChange={handleVolumeChange} shuffle={shuffle} onShuffleToggle={handleShuffleToggle} repeat={repeat} onRepeatToggle={handleRepeatToggle} />

      {/* ✅ Pass Filtered Songs */}
      <PlaylistManager songs={filteredSongs} isDark={isDark} onSongSelect={(song) => { setCurrentSong(song); setIsPlaying(true); }} currentSong={currentSong} />
    </div>
  );
};

MusicPlayer.propTypes = {
  isDark: PropTypes.bool.isRequired,
  activePlaylist: PropTypes.string.isRequired,
};

export default MusicPlayer;
