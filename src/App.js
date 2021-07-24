import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import InfoBox from "./components/InfoBox";
import LineGraph from "./components/LineGraph";
import Map from "./components/Map";
import { prettyNumbers } from "./util";
import Table from "./components/Table";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [getCountryData, setCountryData] = useState({});
  const [mapCenter, setMapCenter] = useState([10.82302, 106.62965]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  // Get the worldwide data at the first render
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setCountryData(data));
  }, []);

  // Get all the countries data
  useEffect(() => {
    const getCovidByCountry = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          const countriesData = data.map((el) => ({
            name: el.country,
            value: el.countryInfo.iso2,
            cases: el.cases,
          }));
          setCountries(countriesData);
          setMapCountries(data);
        });
    };
    getCovidByCountry();
  }, []);

  // Select the country to be shown covid data
  const changeCountry = async (e) => {
    const selectedCountry = e.target.value;
    const url =
      selectedCountry === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(selectedCountry);
        setCountryData(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1> COVID-21 TRACKER</h1>
          <FormControl>
            <Select variant="outlined" onChange={changeCountry} value={country}>
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.name} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onChangeCasesType={() => setCasesType("cases")}
            title="Covid cases"
            cases={prettyNumbers(getCountryData.todayCases)}
            total={numeral(getCountryData.cases).format("0.0a")}
          />
          <InfoBox
            isGreen
            active={casesType === "recovered"}
            onChangeCasesType={() => setCasesType("recovered")}
            title="Recovered"
            cases={prettyNumbers(getCountryData.todayRecovered)}
            total={numeral(getCountryData.recovered).format("0.0a")}
          />
          <InfoBox
            isDark
            active={casesType === "deaths"}
            onChangeCasesType={() => setCasesType("deaths")}
            title="Deaths"
            cases={prettyNumbers(getCountryData.todayDeaths)}
            total={numeral(getCountryData.deaths).format("0.0a")}
          />
        </div>
        <Map
          type={casesType}
          mapCountries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <div className="app__right">
        <h2> Live cases by country</h2>
        <Table countries={countries} />

        <h2 className="app__graphTitle"> Worldwide new {casesType}</h2>
        <LineGraph className="app__graph" type={casesType} />
      </div>
    </div>
  );
};

export default App;
