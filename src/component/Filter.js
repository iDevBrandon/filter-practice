import React from "react";

function Filter({ searchCountries, searchInput }) {
  return (
    <div>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search by the country name"
        value={searchInput}
        onChange={(e) => searchCountries(e.target.value)} 
      />
    </div>
  );
}

export default Filter;
