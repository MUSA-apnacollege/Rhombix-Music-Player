"use client"

import { useState, useCallback } from "react"
import { Upload, X, Trash2 } from "lucide-react"
import PropTypes from "prop-types"

const UploadMusic = ({ onUpload, isDark, existingSongs, onDelete }) => {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = [...e.dataTransfer.files]
    handleFiles(files)
  }, [])

  const handleFileInput = useCallback((e) => {
    const files = [...e.target.files]
    handleFiles(files)
  }, [])

  const handleFiles = useCallback(
    (files) => {
      const musicFiles = files.filter((file) => file.type.includes("audio"))
      const newSongs = musicFiles.map((file) => ({
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        file,
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: "Unknown Artist",
        album: "Unknown Album",
        duration: "0:00",
        addedAt: new Date().toISOString(),
        src: URL.createObjectURL(file),
      }))

      setUploadedFiles((prev) => [...prev, ...newSongs])
      onUpload(newSongs)
    },
    [onUpload],
  )

  const removeUploadedFile = useCallback((id) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id))
  }, [])

  const deleteExistingSong = useCallback(
    (id) => {
      onDelete(id)
    },
    [onDelete],
  )

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`relative p-4 border-2 border-dashed rounded-lg ${
          dragActive
            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
            : isDark
              ? "border-gray-700 hover:border-gray-600"
              : "border-gray-300 hover:border-gray-400"
        } transition-all duration-200`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="audio/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center justify-center py-4">
          <Upload className={`w-10 h-10 mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Drag and drop music files here or click to select
          </p>
          <p className="text-xs text-gray-500 mt-1">Supports MP3 files</p>
        </div>
      </div>

      {(uploadedFiles.length > 0 || existingSongs.length > 0) && (
        <div className="mt-4 space-y-2">
          <p className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Music Files:</p>
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className={`flex items-center justify-between p-2 rounded ${isDark ? "bg-gray-800" : "bg-gray-100"}`}
            >
              <span className={`text-sm truncate ${isDark ? "text-gray-300" : "text-gray-700"}`}>{file.title}</span>
              <button
                onClick={() => removeUploadedFile(file.id)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
          {existingSongs.map((song) => (
            <div
              key={song.id}
              className={`flex items-center justify-between p-2 rounded ${isDark ? "bg-gray-800" : "bg-gray-100"}`}
            >
              <span className={`text-sm truncate ${isDark ? "text-gray-300" : "text-gray-700"}`}>{song.title}</span>
              <button
                onClick={() => deleteExistingSong(song.id)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                <Trash2 className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

UploadMusic.propTypes = {
  onUpload: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
  existingSongs: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default UploadMusic

