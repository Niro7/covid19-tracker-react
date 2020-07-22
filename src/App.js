import React, { useState, useEffect } from "react";

import { FormControl, MenuItem, Select } from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
function App() {
  const [countries, setCountries] = useState(["USA", "UK"]);
  const [country, setCountry] = useState("worldwide");
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            // value: country.country,
          }));
          setCountries(countries);
          // console.log(data);
          // console.log(countries);
        });
    };
    getCountriesData();
  }, []);
  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    // console.log("Hello >>", countryCode);
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={1234} total={2000} />
        <InfoBox title="Recovered" cases={123} total={3000} />
        <InfoBox title="Deaths" cases={12} total={4000} />
      </div>
      <Map />
    </div>
  );
}

export default App;
