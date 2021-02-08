import { useState, useEffect } from "react";
import { mock_api_genres } from "./mock/genres_result";
import MoviesList from "./components/MoviesList";

function App() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    setGenres(mock_api_genres.genres);
  }, [genres]);

  return (
    <div className="App">
      <MoviesList genres={genres} />
    </div>
  );
}

export default App;
