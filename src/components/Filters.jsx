import "./Filters.css"

const TYPE_FILTERS = [
  { label: "All", value: "" },
  { label: "Movies", value: "movie" },
  { label: "Series", value: "series" },
  { label: "Episodes", value: "episode" },
]

function Filters({ activeType, setActiveType, sortOrder, setSortOrder }) {
  return (
    <div className="filters">
      <span className="filter-label">TYPE</span>

      {TYPE_FILTERS.map((f) => (
        <button
          key={f.value}
          className={`filter-btn ${activeType === f.value ? "active" : ""}`}
          onClick={() => setActiveType(f.value)}
        >
          {f.label}
        </button>
      ))}

      <select
        className="sort-select"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="default">Sort: Relevance</option>
        <option value="year-desc">Year: Newest</option>
        <option value="year-asc">Year: Oldest</option>
        <option value="title-asc">Title: A–Z</option>
      </select>
    </div>
  )
}

export default Filters