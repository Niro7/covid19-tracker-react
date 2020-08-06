import React from "react";
import "./Table.css";
import { numeral } from "numeral";
import NumberFormat from "react-number-format";
function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>
              <NumberFormat
                value={cases}
                displayType={"text"}
                thousandSeparator={true}
              />
            </strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
