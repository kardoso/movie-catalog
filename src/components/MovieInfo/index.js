import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL, API_KEY, API_LANGUAGE } from "../../constants";
import "./style.css";

const MovieInfo = ({ genres }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [genreIds, setGenreIds] = useState([]);
  const [formattedReleaseDate, setFormattedReleaseDate] = useState("");

  useEffect(async () => {
    const response_movie = await fetch(
      `${API_URL}/movie/${movieId}?${new URLSearchParams({
        api_key: API_KEY,
        language: API_LANGUAGE,
      })}`
    ).then((res) => res.json());
    setMovie(response_movie);
    const date = new Date(response_movie.release_date);
    setFormattedReleaseDate(
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
    setGenreIds(response_movie.genres.map((g) => g.id));
    console.log(response_movie.spoken_languages);
  }, []);

  return (
    <article className="info-container">
      <header className="info-header">
        <h2> {movie.title} </h2>
        <p className="release-date"> {formattedReleaseDate} </p>
      </header>
      <main className="info-box">
        <aside className="info-content">
          <h3>Sinopse</h3>
          <p className="info-overview"> {movie.overview} </p>

          <h3>Informações</h3>
          <div className="info-complement">
            <div>
              <h4>Situação</h4>
              <p>{movie.status}</p>
            </div>
            <div>
              <h4>Idioma</h4>
              <p>
                {movie.spoken_languages
                  ? movie.spoken_languages
                      .filter(
                        (language) =>
                          language.iso_639_1 === movie.original_language
                      )
                      .map((language) => language.name)
                  : null}
              </p>
            </div>
            <div>
              <h4>Duração</h4>
              <p>{`${movie.runtime}m`}</p>
            </div>
            <div>
              <h4>Orçamento</h4>
              <p>{`$${movie.budget}`}</p>
            </div>
            <div>
              <h4>Receita</h4>
              <p>{`$${movie.revenue}`}</p>
            </div>
            <div>
              <h4>Lucro</h4>
              <p>{`$${movie.revenue - movie.budget}`}</p>
            </div>
          </div>

          <footer className="info-footer">
            <ul>
              {genres
                .filter(({ id }) => genreIds.includes(id))
                .map((g) => (
                  <li key={g.id}> {g.name} </li>
                ))}
            </ul>
            <div className="votes-back-circle">
              <div className="votes-middle-circle">
                <p className="votes-average">
                  {" "}
                  {`${movie.vote_average * 10}%`}{" "}
                </p>
              </div>
            </div>
          </footer>
        </aside>
        <figure className="info-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title}-poster`}
          />
        </figure>
      </main>
    </article>
  );
};

export default MovieInfo;
