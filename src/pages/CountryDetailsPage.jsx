import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CountryDetailsPage = () => {
  const [country, setCountry] = useState(null);
  const { alpha3Code } = useParams();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://ih-countries-api.herokuapp.com/countries/${alpha3Code}`
        );
        setCountry(response.data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountry();
  }, [alpha3Code]);

  if (!country) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <img
        src={`https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`}
        alt={`${country.name.common} flag`}
      />
      <h2>Detalles:</h2>
      <p>Capital: {country.capital}</p>
      <p>Área: {country.area} km²</p>
      <p>Fronteras:</p>
      <ul>
        {country.borders.map((border) => (
          <li key={border}>
            <Link to={`/country/${border}`}>{border}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryDetailsPage;

