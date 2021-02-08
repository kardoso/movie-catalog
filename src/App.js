import { useState, useEffect } from "react";
import MoviesList from "./components/MoviesList";
import { API_URL, API_KEY } from "./constants";

function App() {
  const [genres, setGenres] = useState([]);

  useEffect(async () => {
		const response_genres = await fetch(
			`${API_URL}/genre/movie/list?${new URLSearchParams({api_key: API_KEY})}`
		).then((res) => res.json())
    setGenres(response_genres.genres);
  }, [genres]);

  return (
    <div className="App">
      <MoviesList genres={genres} />
    </div>
  );
}

export default App;
