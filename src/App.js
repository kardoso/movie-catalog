import React, { useState, useEffect } from "react";
import MoviesList from "./components/MoviesList";
import Header from "./components/Header";
import MovieInfo from "./components/MovieInfo";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { API_URL, API_KEY } from "./constants";

function App() {
  const [genres, setGenres] = useState([]);

  useEffect(async () => {
    const response_genres = await fetch(
      `${API_URL}/genre/movie/list?${new URLSearchParams({ api_key: API_KEY })}`
    ).then((res) => res.json());
    setGenres(response_genres.genres);
  }, [genres]);

  return (
    <div className="App">
      <Router>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Header />
        </Link>
        <Switch>
          <Route exact path="/">
            <MoviesList genres={genres} />
          </Route>
          <Route path="/movie/:movieId">
            <MovieInfo />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
