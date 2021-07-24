import { CircleMarker, Popup } from "react-leaflet";
import moment from "moment";
import numeral from "numeral";
//example of sorting numbers in descending orders
const points = [40, 100, 1, 5, 25, 10];
points.sort(function (a, b) {
  return b - a;
});

export const sortedCountryByCases = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => b.cases - a.cases);
  return sortedData;
};

export const createChartData = (data, type) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data[type]) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: moment(date, "MM/DD/YYYY"),
        y: data[type][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[type][date];
  }
  return chartData;
};

// export const createChartData = (data, type = "cases") => {
//   console.log(data);
//   let chartData = [];

//   for (let date in data[type]) {
//     const dataPoint = {
//       x: moment(date, "MM/DD/YYYY"),
//       y: data[type][date],
//     };
//     chartData.push(dataPoint);
//   }
//   return chartData;
// };

export const casesTypeColor = {
  cases: {
    hex: "#CC1034",
    mulitiplier: 800,
  },

  recovered: {
    hex: "#7DD71D",
    mulitiplier: 1200,
  },

  deaths: {
    hex: "#716F81",
    mulitiplier: 2000,
  },
};

export const prettyNumbers = (stats) =>
  stats ? `+${numeral(stats).format("0.0a")}` : "+0";

export const showDataonMap = (data, type = "cases") => {
  data.map((country) => (
    <CircleMarker
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={{
        color: casesTypeColor[type].hex,
        fillColor: casesTypeColor[type].hex,
      }}
      radius={Math.sqrt(country[type] / 100) * casesTypeColor[type].mulitiplier}
    >
      <Popup>I am a popup</Popup>
    </CircleMarker>
  ));
};
