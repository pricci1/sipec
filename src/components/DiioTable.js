import React from "react";

const DiioTable = props => {
  const { headers, data } = props;

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          {headers.map(header => (
            <th key={header.replace(" ", "-")} scope="col">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index + 1}>
            <th scope="row">{index + 1}</th>
            {item.map(el => (
              <td key={el.replace(" ", "-")}>{el}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DiioTable;
