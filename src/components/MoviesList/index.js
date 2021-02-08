import { useState, useEffect } from "react";
import MovieCard from "../MovieCard";
import { mock_api } from "../../mock/movies_result";
import './style.css'

function MoviesList({ genres }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(mock_api.results)
  }, [movies]);

	return (
		<div className='list-container'>
			{movies ?
			movies.map((result) => (
				<MovieCard key={result.id} info={result} genres={genres} />
			))
			:null}
		</div>
	);
}

export default MoviesList;