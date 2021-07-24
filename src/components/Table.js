import numeral from "numeral";
import React from "react";
import { sortedCountryByCases } from "../util";
import "./Table.css";

const Table = ({ countries }) => {
  const sortedData = sortedCountryByCases(countries);
  return (
    <div className="table">
      <table>
        <tbody>
          {sortedData.map(({ name, cases }) => (
            <tr key={name}>
              <td>{name}</td>
              <td>
                <strong>{numeral(cases).format("0,0")}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
