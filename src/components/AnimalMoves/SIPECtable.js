import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

const AnimalMovesTable = props => {
  const { cases } = props;

  const data = [];
  var headers = [];
  if (cases == "1") {
    headers = [
      {
        Header: "ID Registro",
        acessor: "idregistro"
      },
      {
        Header: "RUP",
        acessor: "rup"
      },
      {
        Header: "Establecimiento",
        acessor: "establecimiento"
      },
      {
        Header: "Titular",
        acessor: "titular"
      },
      {
        Header: "Fecha Registro",
        acessor: "fecharegistro"
      },
      {
        Header: "Cantidad",
        acessor: "cantidad"
      }
    ];
  } else if (cases == "2") {
    headers = [
      {
        Header: "ID Registro",
        acessor: "idregistro"
      },
      {
        Header: "Vendedor",
        acessor: "vendedor"
      },
      {
        Header: "Comprador",
        acessor: "comprador"
      },
      {
        Header: "Fecha",
        acessor: "fecha"
      },
      {
        Header: "Estado",
        acessor: "estado"
      },
      {
        Header: "RUT-Comprador",
        acessor: "rutcomprador"
      }
    ];
  } else if (cases == "3") {
    headers = [
      {
        Header: "DIIO",
        acessor: "diio"
      },
      {
        Header: "Especie",
        acessor: "especie"
      },
      {
        Header: "Marca DIIO",
        acessor: "marcadiio"
      },
      {
        Header: "Rut Comprador",
        acessor: "rutcomprador"
      },
      {
        Header: "Raza",
        acessor: "raza"
      },
      {
        Header: "Sexo",
        acessor: "sexo"
      },
      {
        Header: "Fecha Nacimiento",
        acessor: "fechanacimiento"
      },
      {
        Header: "Categoria",
        acessor: "categoria"
      },
      {
        Header: "Agregar Animal",
        acessor: "agregaranimal"
      }
    ];
  } else if (cases == "listadebajas") {
    headers = [
      {
        Header: "DIIO",
        acessor: "diio"
      },
      {
        Header: "Causa",
        acessor: "causa"
      },
      {
        Header: "Fecha",
        acessor: "fecha"
      }
    ];
  } else {
    headers = [
      {
        Header: "Test1",
        acessor: "test1"
      },
      {
        Header: "Test2",
        acessor: "test2"
      },
      {
        Header: "Test3",
        acessor: "test3"
      },
      {
        Header: "Test4",
        acessor: "test4"
      }
    ];
  }

  return <ReactTable data={data} columns={headers} />;

  /*(


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
  );*/
};

export default AnimalMovesTable;
