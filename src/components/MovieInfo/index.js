import React from "react";
import { useParams } from "react-router-dom";

const MovieInfo = () => {
  let { movieId } = useParams();
  return <div>{movieId}</div>;
};

export default MovieInfo;
