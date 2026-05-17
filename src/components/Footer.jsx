import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      POWERED BY <span>OMDB</span> · BUILT WITH CARE · <span>CINEMEX</span> © {new Date().getFullYear()}
    </footer>
  )
}

export default Footer