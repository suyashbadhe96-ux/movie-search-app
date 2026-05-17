import "./Header.css"

function Header({ resultCount }) {
  return (
    <header className="header">
      <div className="header-logo">
        CINEMEX
        <span className="header-tagline">FILM DISCOVERY</span>
      </div>
      {resultCount > 0 && (
        <div className="header-stats">
          <b>{resultCount}</b> RESULTS
        </div>
      )}
    </header>
  )
}

export default Header