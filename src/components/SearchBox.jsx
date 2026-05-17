import { useRef, useEffect } from "react"
import "./SearchBox.css"

function SearchBox({
  searchMovie,
  setSearchMovie,
  fetchMovies,
  suggestions,
  showSuggestions,
  setShowSuggestions,
}) {
  const wrapRef = useRef(null)

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [setShowSuggestions])

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false)
      fetchMovies(searchMovie)
    }
    if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (title) => {
    setSearchMovie(title)
    setShowSuggestions(false)
    fetchMovies(title)
  }

  const getPoster = (url) => url && url !== "N/A" ? url : null

  return (
    <div className="search-section">
      <div className="search-tagline">
        FIND YOUR NEXT <em>OBSESSION</em>
      </div>
      <div className="search-sub">SEARCH MILLIONS OF FILMS & SERIES</div>

      <div className="search-wrap" ref={wrapRef}>
        <input
          className="search-input"
          type="text"
          placeholder="Search movies, series, actors..."
          value={searchMovie}
          onChange={(e) => {
            setSearchMovie(e.target.value)
            if (e.target.value.trim()) setShowSuggestions(true)
            else setShowSuggestions(false)
          }}
          onFocus={() => {
            if (suggestions.length && searchMovie.trim()) setShowSuggestions(true)
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck="false"
        />
        <span className="search-icon">⌕</span>

        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.slice(0, 6).map((movie) => {
              const poster = getPoster(movie.Poster)
              return (
                <div
                  key={movie.imdbID}
                  className="sug-item"
                  onClick={() => handleSuggestionClick(movie.Title)}
                >
                  {poster ? (
                    <img className="sug-thumb" src={poster} alt={movie.Title} loading="lazy" />
                  ) : (
                    <div className="sug-thumb sug-thumb-placeholder">🎞️</div>
                  )}
                  <div className="sug-info">
                    <div className="sug-title">{movie.Title}</div>
                    <div className="sug-year">{movie.Year} · {movie.Type}</div>
                  </div>
                  <span className="sug-arrow">↗</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBox