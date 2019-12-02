import React, { useState } from "react";

const EstablishmentOtherData = () => {
  const [data, setData] = useState({});
  const onChange = e => {
    const target = e.target;
    setData(old => {
      old[target.name] = target.value;
      return old;
    });
  };
  return (
    <>
      <h3>Editar Sectores y Superficie</h3>
      <table className="table table-borderless w-50">
        <tbody>
          <tr>
            <th className="text-nowrap">Establecimiento</th>
            <td>12.234.552-1 - Estancia Las Palmas</td>
          </tr>
          <tr>
            <th className="text-nowrap">Superficie en hectáreas</th>
            <td>
              <input
                type="number"
                name="area"
                className="form-control w-50"
                onBlur={onChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <table className="table table-borderless">
        <tbody>
          <tr>
            <th className="text-nowrap">Nombre</th>
            <td>
              <input
                type="text"
                className="form-control w-50"
                onBlur={onChange}
                name="name"
              />
            </td>
          </tr>
          <tr>
            <th className="text-nowrap">N⁰ de pabellones</th>
            <td>
              <input
                type="number"
                className="form-control w-25"
                onBlur={onChange}
                name="pabQuantity"
              />
            </td>
          </tr>
          <tr>
            <th className="text-nowrap">Coordenadas</th>
            <td className="form-check-inline">
              <div className="input-group  w-25">
                <input
                  type="number"
                  className="form-control"
                  name="xCoor"
                  onBlur={onChange}
                />
                <div className="input-group-prepend">
                  <span className="input-group-text">X</span>
                </div>
              </div>
              &nbsp;&nbsp;
              <div className="input-group  w-25">
                <input
                  type="number"
                  className="form-control"
                  name="yCoor"
                  onBlur={onChange}
                />
                <div className="input-group-prepend">
                  <span className="input-group-text">Y</span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th className="text-nowrap">Huso</th>
            <td>
              <input
                type="number"
                className="form-control w-25"
                onBlur={onChange}
                name="huso"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary">Agregar sector</button>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th scope="col"> </th>
            <th scope="col">Nombre</th>
            <th scope="col">Pabellones</th>
            <th scope="col">Coord. X</th>
            <th scope="col">Coord. Y</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">X</th>
            <td>Las Palmas 01</td>
            <td>3</td>
            <td>-1.112123</td>
            <td>12.123122</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default EstablishmentOtherData;
