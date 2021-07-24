//So try npm i react-leaflet@3.1.0 @react-leaflet/core@1.0.2
// import { Circle, LayerGroup, Marker, Popup } from "leaflet";
import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Circle, Popup, Marker, CircleMarker } from "react-leaflet";
import { showDataonMap, casesTypeColor } from "../util";
import "./Map.css";

const Map = ({ type, mapCountries, center, zoom }) => {
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
  const showDataonMap = (data, type = "cases") => {
    data.map((country) => (
      <CircleMarker
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        pathOptions={{
          color: casesTypeColor[type].hex,
          fillColor: casesTypeColor[type].hex,
        }}
        radius={
          Math.sqrt(country[type] / 100) * casesTypeColor[type].mulitiplier
        }
      >
        <Popup>I am a popup</Popup>
      </CircleMarker>
    ));
  };

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

        {showDataonMap(mapCountries, type)}

        {/* <CircleMarker
          center={[10.82302, 106.62965]}
          pathOptions={{ color: "green", fillColor: "green" }}
          radius={100}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </CircleMarker> */}

        {/* <Marker position={[10.82302, 106.62965]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        */}
      </MapContainer>
    </div>
  );
};

export default Map;
// export default React.memo(Map);
