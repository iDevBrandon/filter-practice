import React, { useState, useEffect } from "react";

function Filter({ searchCountries, searchInput, setCountries }) {
  //   const [regions, setRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const region = [
    {
      name: "Africa",
    },
    {
      name: "Americas",
    },
    {
      name: "Asia",
    },
    {
      name: "Europe",
    },
    {
      name: "Oceania",
    },
  ];

  const fetchCountryByRegion = async (region) => {
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);

    const data = await res.json();
    setCountries(data);
  };

  useEffect(() => {
    fetchCountryByRegion();
  }, []);

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

      <select
        name="select"
        id="select"
        className=""
        value={region.name}
        onChange={(e) => fetchCountryByRegion(e.target.value)}
      >
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}

export default Filter;
