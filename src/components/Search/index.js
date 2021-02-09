import React from "react";

const Search = ({ searchString, setSearchString }) => {
  return (
    <input
      value={searchString}
      onChange={(e) => setSearchString(e.target.value)}
    ></input>
  );
};

export default Search;
