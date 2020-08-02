import React from "react";
// import { Table } from "@material-ui/core";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7DD71D",
    multiplier: 1200,
  },
  deaths: {
    hex: "#FB4443",
    multiplier: 2000,
  },
};
export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
  //   sortedData.sort((a, b) => {
  //     if (a.cases > b.cases) {
  //       return -1;
  //     } else {
  //       return 1;
  //     }
  //   });
  //   return sortedData;
};

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          {/* <img src={country.countryInfo.flag} alt="flag" /> */}

          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">Cases: {country.cases}</div>
          <div className="info-recovered">Recovered: {country.recovered}</div>
          <div className="info-deaths">Deaths: {country.deaths}</div>
        </div>
      </Popup>
    </Circle>
  ));
