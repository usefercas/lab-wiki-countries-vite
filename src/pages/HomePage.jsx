import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ih-countries-api.herokuapp.com/countries"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>WikiCountries: Tu guía del mundo</h1>
      <h2>Lista de países:</h2>
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>
            <Link to={`/${country.cca3}`}>
              <img
                src={`https://flagcdn.com/72x54/${country.cca2.toLowerCase()}.png`}
                alt={`${country.name.common} flag`}
              />
              {country.name.common}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
