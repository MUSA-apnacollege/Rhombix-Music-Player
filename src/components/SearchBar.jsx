import { Search } from "lucide-react"
import PropTypes from "prop-types"

const SearchBar = ({ onSearch, isDark }) => {
  return (
    <div className={`relative ${isDark ? "text-white" : "text-gray-900"}`}>
      <input
        type="text"
        placeholder="Search for songs, artists, or albums"
        onChange={(e) => onSearch(e.target.value)}
        className={`w-full py-2 pl-10 pr-4 rounded-full ${
          isDark ? "bg-gray-700 focus:bg-gray-600" : "bg-gray-200 focus:bg-gray-300"
        } focus:outline-none transition-colors duration-200`}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} />
    </div>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
}

export default SearchBar

