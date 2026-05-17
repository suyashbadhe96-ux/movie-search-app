// components/Button.jsx
import "./Button.css"

function Button(props) {
  return (
    <button className="search-btn" onClick={props.onClick}>
      Search
    </button>
  )
}

export default Button