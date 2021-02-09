import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function MovieCard({ info, genres }) {
  let date = new Date(info.release_date);
  let formattedDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  return (
    <article>
      <figure>
        <img
          src={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
          alt={`${info.title}-poster`}
        />
      </figure>
      <main>
        <Link to={`/movie/${info.id}`} style={{ textDecoration: "none" }}>
          <header className="card-header">
            <h2> {info.title} </h2>
          </header>
        </Link>
        <div className="vote-back-circle">
          <div className="vote-middle-circle">
            <p className="vote-average"> {`${info.vote_average * 10}%`} </p>
          </div>
        </div>
        <p className="release-date"> {formattedDate} </p>
        <p className="overview"> {info.overview} </p>
        <footer>
          <ul>
            {genres
              .filter(({ id }) => info.genre_ids.includes(id))
              .map((g) => (
                <li key={g.id}> {g.name} </li>
              ))}
          </ul>
        </footer>
      </main>
    </article>
  );
}

export default MovieCard;
