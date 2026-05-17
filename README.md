# Cinemex — Movie Search App

A movie search app built with React and the OMDB API.

## Features

- Loads random popular movies on startup
- Live search with debounce (no API spam)
- Autocomplete suggestions with poster thumbnails
- Filter by type — Movies, Series, Episodes
- Sort by year or title
- Watchlist (add/remove with ★)
- Skeleton loaders while fetching
- Click any card to open on IMDB

## Tech Used

- React
- Vite
- OMDB API
- CSS (component-scoped)

## Setup

```bash
git clone https://github.com/your-username/cinemex.git
cd cinemex
npm install
npm run dev
```

Get a free API key at [omdbapi.com](http://www.omdbapi.com/apikey.aspx) and replace it in `App.jsx`:

```js
const API_KEY = "your_key_here"
```

## Folder Structure

```
src/
├── App.jsx
├── index.css
└── components/
    ├── Header.jsx
    ├── SearchBox.jsx
    ├── MovieCard.jsx
    ├── Filters.jsx
    └── Footer.jsx
```
