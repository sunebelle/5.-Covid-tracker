//So try npm i react-leaflet@3.1.0 @react-leaflet/core@1.0.2
import React from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  CircleMarker,
} from "react-leaflet";
import { casesTypeColor } from "../util";
import "./Map.css";
import numeral from "numeral";

const Map = ({ type, mapCountries, center, zoom }) => {
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <div className="map">
      <MapContainer
        className="map__container"
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapCountries.map((country) => (
          <CircleMarker
            key={country.country}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            pathOptions={{
              color: casesTypeColor[type].hex,
              fillColor: casesTypeColor[type].hex,
            }}
            radius={Math.sqrt(country[type] / 3000)}
          >
            <Popup>
              <div className="info-container">
                {/* <div
                  className="info-flag"
                  style={{
                    backgroundImage: `url(${country.countryInfo.flag})`,
                  }}
                /> */}
                <div className="info-flag">
                  <img src={country.countryInfo.flag} alt={country.country} />
                </div>
                <div className="info-name">{country.country}</div>
                <div className="info-cases">
                  Cases: {numeral(country.cases).format("0,0")}
                </div>
                <div className="info-recovered">
                  Recovered: {numeral(country.recovered).format("0,0")}
                </div>
                <div className="info-deaths">
                  Deaths: {numeral(country.deaths).format("0,0")}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default React.memo(Map);
