import "./MovieCard.css"

function MovieCard({ movie, inWatchlist, onWatchlistToggle }) {
  const { Title, Year, Poster, Type, imdbID } = movie

  const posterUrl = Poster && Poster !== "N/A" ? Poster : null

  const handleCardClick = () => {
    window.open(`https://www.imdb.com/title/${imdbID}/`, "_blank")
  }

  const handleWatchlist = (e) => {
    e.stopPropagation()
    onWatchlistToggle(movie)
  }

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <div className="card-poster">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={Title}
            loading="lazy"
            onError={(e) => {
              e.target.parentNode.innerHTML = `<div class="poster-placeholder"><span>🎞️</span><p>NO POSTER</p></div>`
            }}
          />
        ) : (
          <div className="poster-placeholder">
            <span>🎞️</span>
            <p>NO POSTER</p>
          </div>
        )}

        <div className="card-overlay">
          <div className="overlay-type">{(Type || "").toUpperCase()}</div>
          <div className="overlay-title">{Title}</div>
        </div>

        {Type && Type !== "N/A" && (
          <div className="card-type-badge">{Type}</div>
        )}

        <button
          className={`watchlist-btn ${inWatchlist ? "saved" : ""}`}
          onClick={handleWatchlist}
          title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        >
          {inWatchlist ? "★" : "☆"}
        </button>
      </div>

      <div className="card-info">
        <div className="card-title" title={Title}>{Title}</div>
        <div className="card-year">{Year || "—"}</div>
      </div>
    </div>
  )
}

export default MovieCard