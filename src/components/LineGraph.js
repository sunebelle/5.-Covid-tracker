import React, { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { createChartData } from "../util";
import "./LineGraph.css";
import numeral from "numeral";
import "chartjs-adapter-moment";

const LineGraph = ({ type }) => {
  const [data, setData] = useState({});

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      // title: {
      //   display: true,
      //   text: `Worldwide new ${type}`,
      // },
      interaction: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (tooltipItem) {
            return numeral(tooltipItem.value).format("+0,0");
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        fill: true,
        backgroundColor: "rgba(204, 16, 52, 0.5)",
        borderColor: "#CC1034",
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    },
  };

  if (type === "recovered") {
    options.elements.line.backgroundColor = "#7DD71D";
    options.elements.line.borderColor = "rgb(29, 215, 29)";
  } else if (type === "deaths") {
    options.elements.line.backgroundColor = "#716F81";
    options.elements.line.borderColor = "rgb(77, 71, 71)";
  }

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const dataChart = createChartData(data, type);
        setData(dataChart);
      });
  }, [type]);

  return (
    <div className="line__chart">
      {data.length > 0 && (
        <Line
          className="chart"
          data={{
            datasets: [
              {
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default LineGraph;
