import React from "react";
import "./style.css";

const Search = ({ searchString, setSearchString }) => {
  return (
    <div className="search-container">
      <input
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        placeholder="Busque por um filme..."
      />
    </div>
  );
};

export default Search;
