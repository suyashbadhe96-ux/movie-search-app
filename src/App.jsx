import { useEffect, useState, useRef, useCallback } from "react"
import Header from "./components/Header"
import SearchBox from "./components/SearchBox"
import MovieCard from "./components/MovieCard"
import Filters from "./components/Filters"
import Footer from "./components/Footer"
import "./index.css"

const API_KEY = "2e5d11c"

// Random popular queries shown on first load
const RANDOM_QUERIES = [
  "avengers", "inception", "interstellar", "joker", "matrix",
  "godfather", "titanic", "parasite", "oppenheimer", "dune",
  "spider-man", "dark knight", "pulp fiction", "forrest gump", "gladiator"
]

function getRandomQuery() {
  return RANDOM_QUERIES[Math.floor(Math.random() * RANDOM_QUERIES.length)]
}

function App() {
  const [movies, setMovies] = useState([])
  const [searchMovie, setSearchMovie] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeType, setActiveType] = useState("")
  const [sortOrder, setSortOrder] = useState("default")
  const [watchlist, setWatchlist] = useState(new Set())
  const [toast, setToast] = useState({ show: false, msg: "" })
  const [initialQuery, setInitialQuery] = useState("")

  const debounceRef = useRef(null)
  const toastRef = useRef(null)

  const showToast = (msg) => {
    setToast({ show: true, msg })
    clearTimeout(toastRef.current)
    toastRef.current = setTimeout(() => setToast({ show: false, msg: "" }), 2400)
  }

  const fetchMovies = useCallback(async (query) => {
    if (!query.trim()) return
    setLoading(true)
    setError("")
    setShowSuggestions(false)
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
      )
      if (!res.ok) throw new Error("Network error")
      const data = await res.json()
      if (data.Response === "True") {
        setMovies(data.Search)
        setSuggestions(data.Search)
        setError("")
      } else {
        setMovies([])
        setSuggestions([])
        setError(data.Error || "No results found.")
      }
    } catch {
      setMovies([])
      setError("Failed to fetch results. Check your connection.")
    }
    setLoading(false)
  }, [])

  // On mount: load random popular movies
  useEffect(() => {
    const q = getRandomQuery()
    setInitialQuery(q)
    fetchMovies(q)
  }, [])

  // Debounced search on input change
  useEffect(() => {
    if (!searchMovie.trim()) return
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchMovies(searchMovie)
    }, 480)
    return () => clearTimeout(debounceRef.current)
  }, [searchMovie, fetchMovies])

  const getFilteredAndSorted = () => {
    let result = [...movies]
    if (activeType) result = result.filter((m) => m.Type === activeType)
    if (sortOrder === "year-desc") result.sort((a, b) => parseInt(b.Year) - parseInt(a.Year))
    else if (sortOrder === "year-asc") result.sort((a, b) => parseInt(a.Year) - parseInt(b.Year))
    else if (sortOrder === "title-asc") result.sort((a, b) => a.Title.localeCompare(b.Title))
    return result
  }

  const toggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const next = new Set(prev)
      if (next.has(movie.imdbID)) {
        next.delete(movie.imdbID)
        showToast(`Removed "${movie.Title}" from watchlist`)
      } else {
        next.add(movie.imdbID)
        showToast(`★ "${movie.Title}" added to watchlist`)
      }
      return next
    })
  }

  const displayedMovies = getFilteredAndSorted()
  const currentQuery = searchMovie.trim() || initialQuery

  return (
    <div className="app">
      <Header resultCount={movies.length} />

      <SearchBox
        searchMovie={searchMovie}
        setSearchMovie={setSearchMovie}
        fetchMovies={fetchMovies}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
      />

      <Filters
        activeType={activeType}
        setActiveType={setActiveType}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {error && <div className="error-bar">⚠ {error}</div>}

      <main className="main">
        {!error && movies.length > 0 && (
          <div className="results-meta">
            <span className="results-count">
              Showing <b>{displayedMovies.length}</b> results
            </span>
            <span className="results-query">"{currentQuery.toUpperCase()}"</span>
          </div>
        )}

        <div className="movie-container">
          {loading ? (
            Array(8).fill(0).map((_, i) => (
              <div className="skeleton" key={i}>
                <div className="skeleton-poster" />
                <div className="skeleton-info">
                  <div className="skeleton-line" />
                  <div className="skeleton-line short" />
                </div>
              </div>
            ))
          ) : displayedMovies.length > 0 ? (
            displayedMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                inWatchlist={watchlist.has(movie.imdbID)}
                onWatchlistToggle={toggleWatchlist}
              />
            ))
          ) : !error ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <div className="empty-title">NO RESULTS</div>
              <div className="empty-sub">Try a different search term or filter</div>
            </div>
          ) : null}
        </div>
      </main>

      <div className={`toast ${toast.show ? "show" : ""}`}>{toast.msg}</div>

      <Footer />
    </div>
  )
}

export default App