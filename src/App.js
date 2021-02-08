import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import { mock_api } from "./mock/movies_result";
import { mock_api_genres } from "./mock/genres_result";

function App() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    setGenres(mock_api_genres.genres);
  }, [genres]);

  return (
    <div className="App">
      {mock_api.results.map((result) => (
        <MovieCard key={result.id} info={result} genres={genres} />
      ))}
    </div>
  );
}

export default App;
