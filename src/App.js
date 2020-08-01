import React, { useState, useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import numeral from "numeral";
import "leaflet/dist/leaflet.css";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({}); //An empty object
  const [tableData, setTableData] = useState([]); //An empty array
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
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
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);

          // console.log(data);
          // console.log(countries);
        });
    };
    getCountriesData();
  }, []);
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log("Hello >>", countryCode);
    // setCountry(countryCode);
    //condition to check the Selected option in dropdown and match with data
    //If countrycode is equal to worldwide the url is for all
    //if it's not true go with countryCode
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);//When you select an option from dropdown you get related info
        setCountry(countryCode); //set country in input field
        setCountryInfo(data); //storecountry's data
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(3);
      });
  };
  // console.log(countryInfo);
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={numeral(countryInfo.todayCases).format("+0,0").toUpperCase()}
            total={numeral(countryInfo.cases).format("0a").toUpperCase()}
          />
          <InfoBox
            title="Recovered"
            cases={numeral(countryInfo.todayRecovered)
              .format("+0,0")
              .toUpperCase()}
            total={numeral(countryInfo.recovered).format("0a").toUpperCase()}
          />
          <InfoBox
            title="Deaths"
            cases={numeral(countryInfo.todayDeaths)
              .format("+0,0")
              .toUpperCase()}
            total={numeral(countryInfo.deaths).format("0a").toUpperCase()}
          />
        </div>
        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />

          <h3>Worldwide New Cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
