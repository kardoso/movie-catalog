import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard";
import Search from "../Search";
import { API_URL, API_KEY, API_LANGUAGE } from "../../constants";

import "./style.css";

function MoviesList({ genres }) {
  const [apiMovies, setApiMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [apiPage, setApiPage] = useState(1);
  const [apiTotalPages, setApiTotalPages] = useState(0);
  const [apiTotalResults, setApiTotalResults] = useState(0);
  const apiResultsPerPage = 20;
  const [appPage, setAppPage] = useState(1);
  const appResultsPerPage = 5;
  const [appTotalPages, setAppTotalPages] = useState(0);
  const [appResultOffset, setAppResultOffset] = useState(0);
  const [searchString, setSearchString] = useState("");

  useEffect(async () => {
    const response_movies = await fetch(
      `${API_URL}${
        searchString.length > 0 ? "/search/movie?" : "/discover/movie?"
      }${new URLSearchParams({
        query: searchString,
        api_key: API_KEY,
        language: API_LANGUAGE,
        page: 1,
      })}`
    ).then((res) => res.json());
    setApiMovies(response_movies.results);
    setApiPage(1);
    setApiTotalPages(response_movies.total_pages);
    setApiTotalResults(response_movies.total_results);
    setAppPage(1);
    setAppTotalPages(response_movies.total_pages * appResultsPerPage);
    setAppResultOffset(0);
    setMovies(
      response_movies.results.slice(
        appResultOffset,
        appResultOffset + appResultsPerPage
      )
    );
  }, [searchString]);

  const loadResultsFromApi = async (
    newApiPage,
    newAppPage,
    newAppResultsOffset
  ) => {
    const response_movies = await fetch(
      `${API_URL}/discover/movie?${new URLSearchParams({
        api_key: API_KEY,
        language: API_LANGUAGE,
        page: newApiPage,
      })}`
    ).then((res) => res.json());
    setApiMovies(response_movies.results);
    setMovies(
      response_movies.results.slice(
        newAppResultsOffset,
        newAppResultsOffset + appResultsPerPage
      )
    );
    setApiPage(newApiPage);
    setAppPage(newAppPage);
    setAppResultOffset(newAppResultsOffset);
    window.scrollTo(0, 0);
  };

  const loadResultsFromFetched = (newAppPage, newAppResultsOffset) => {
    setMovies(
      apiMovies.slice(
        newAppResultsOffset,
        newAppResultsOffset + appResultsPerPage
      )
    );
    setAppPage(newAppPage);
    setAppResultOffset(newAppResultsOffset);
    window.scrollTo(0, 0);
  };

  const nextPage = async () => {
    if (appPage % 4 === 0) {
      var newApiPage = apiPage + 1;
    }
    let newAppPage = appPage + 1;

    if (appResultOffset === 15) {
      let newAppResultsOffset = 0;
      await loadResultsFromApi(newApiPage, newAppPage, newAppResultsOffset);
    } else {
      let newAppResultsOffset = appResultOffset + 5;
      loadResultsFromFetched(newAppPage, newAppResultsOffset);
    }
  };

  const previousPage = async () => {
    if (appPage > 4) {
      var newApiPage = apiPage - 1;
    }
    let newAppPage = appPage - 1;

    if (appResultOffset === 0) {
      let newAppResultsOffset = 15;
      await loadResultsFromApi(newApiPage, newAppPage, newAppResultsOffset);
    } else {
      let newAppResultsOffset = appResultOffset - 5;
      loadResultsFromFetched(newAppPage, newAppResultsOffset);
    }
  };

  return (
    <>
      <Search searchString={searchString} setSearchString={setSearchString} />
      <div className="list-container">
        {movies
          ? movies.map((result) => (
              <MovieCard key={result.id} info={result} genres={genres} />
            ))
          : null}
        <div className="buttons-container">
          <button
            onClick={previousPage}
            disabled={appPage <= 1}
            className="action-button"
          >
            {"<"}
          </button>
          <p className="page-count">{`${appPage} / ${appTotalPages}`}</p>
          <button
            onClick={nextPage}
            disabled={appPage >= appTotalPages}
            className="action-button"
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
}

export default MoviesList;
