import { useState, useEffect } from "react";
import MovieCard from "../MovieCard";
import { API_URL, API_KEY } from "../../constants";

import './style.css'

function MoviesList({ genres }) {
  const [movies, setMovies] = useState([]);

  useEffect(async () => {
		const response_movies = await fetch(
			`${API_URL}/discover/movie?${new URLSearchParams({api_key: API_KEY})}`
		).then((res) => res.json())
    setMovies(response_movies.results)
  }, [movies]);

	return (
		<div className='list-container'>
			{movies ?
				movies.map((result) => (
					<MovieCard key={result.id} info={result} genres={genres} />
				))
				:
				null
			}
		</div>
	);
}

export default MoviesList;