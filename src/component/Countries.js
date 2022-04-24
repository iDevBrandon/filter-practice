import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import "./styles.scss";
function Countries() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCountries(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  // search countries
  const searchCountries = (searchValue) => {
    setSearchInput(searchValue);

    if (searchValue) {
      const filteredCountries = countries.filter((country) =>
        Object.values(country)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFiltered(filteredCountries);
    } else {
      setFiltered(countries);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="wrapper">
        <Filter searchCountries={searchCountries} searchInput={searchInput} />

        {searchInput.length > 0 ? (
          <ul className="card-grid">
            {filtered.map((item) => (
              <li>
                <article className="card" key={item.callingCodes}>
                  <div className="card-image">
                    <img src={item.flag} alt={item.name.common} />
                  </div>
                  <div className="card-content">
                    <h2 className="card-name">{item.name}</h2>
                    <ol className="card-list">
                      <li>
                        population: <span>{item.population}</span>
                      </li>
                      <li>
                        Region: <span>{item.region}</span>
                      </li>
                      <li>
                        Capital: <span>{item.capital}</span>
                      </li>
                    </ol>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="card-grid">
            {countries.map((item) => (
              <li>
                <article className="card" key={item.callingCodes}>
                  <div className="card-image">
                    <img src={item.flag} alt={item.name.common} />
                  </div>
                  <div className="card-content">
                    <h2 className="card-name">{item.name}</h2>
                    <ol className="card-list">
                      <li>
                        population: <span>{item.population}</span>
                      </li>
                      <li>
                        Region: <span>{item.region}</span>
                      </li>
                      <li>
                        Capital: <span>{item.capital}</span>
                      </li>
                    </ol>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Countries;
