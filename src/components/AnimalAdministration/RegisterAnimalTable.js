import React, { useState, useContext, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import ApiContext from "../APIProvider";
import DatePicker from "react-datepicker";
import { getAnimalTableApi } from "../../lib/ApiAnimalAdministration";
//import Selector from "../Diio/Utilities/FormikSelector";

export const RegisterAnimalTable = ({
  setModalRegistryId,
  getReload,
  setReloadHandler,
  toggleModal,
  setLoadingState,
  getLoadingState
}) => {
  const api = useContext(ApiContext);
  const [data, setData] = useState([]);

  useEffect(() => {}, []);
  async function getAnimal() {
    const data1 = await getAnimalTableApi(api);
    console.log(data1);
    
    const Data = {
      columns: [
        {
          label: "DIIO",
          field: "diio",
          sort: "asc",
          width: 150
        },
        {
          label: "Especie",
          field: "specie",
          sort: "asc",
          width: 270
        },
        {
          label: "Rut Comprador",
          field: "rut",
          sort: "asc",
          width: 150
        },
        {
          label: "raza",
          field: "breed",
          sort: "asc",
          width: 200
        },
        {
          label: "Sexo",
          field: "sex",
          sort: "asc",
          width: 150
        },
        {
          label: "Fecha de Nacimiento",
          field: "date",
          sort: "asc",
          width: 150
        },
        {
          label: "Categoria",
          field: "category",
          sort: "asc",
          width: 150
        }
      ],
      rows: data1
    };
    setData(Data);

    return Data;
  }
  const reloadHandler = () => {
    if (getReload()) {
      getAnimal();
      setReloadHandler();
    }
  };
  const handleEntryClick = registryId => {
    setModalRegistryId(registryId);
    toggleModal();
  };
  const fakeData = {
    columns: [
      {
        label: "Ver",
        field: "show",
        sort: "asc",
        width: 40
      },
      {
        label: "DIIO",
        field: "diio",
        sort: "asc",
        width: 150
      },
      {
        label: "Especie",
        field: "specie",
        sort: "asc",
        width: 270
      },
      {
        label: "Rut Comprador",
        field: "rut",
        sort: "asc",
        width: 150
      },
      {
        label: "raza",
        field: "breed",
        sort: "asc",
        width: 150
      },
      {
        label: "Sexo",
        field: "sex",
        sort: "asc",
        width: 150
      },
      {
        label: "Fecha de Nacimiento",
        field: "date",
        sort: "asc",
        width: 150
      },
      {
        label: "Categoria",
        field: "category",
        sort: "asc",
        width: 150
      }
    ],
    rows: [
      {
        show: (
          <button
            type="button"
            className="btn btn-info btn-sm p-0"
            onClick={() => handleEntryClick(1)}
          >
            &#10010;
          </button>
        ),
        rup: "1.1.1.1",
        establishment: "Lo Beltran",
        titular: "Richard Feynman",
        date: "12/12/13",
        quantity: "13"
      }
      /*{
        show: (
          <button
            type="button"
            className="btn btn-info btn-sm p-0"
            onClick={() => handleEntryClick(2)}
          >
            &#10010;
          </button>
        ),
        rup: "1.1.1.1",
        establishment: "Estancia La Fe",
        titular: "John Doe",
        date: "12/11/13",
        quantity: "99"
      }*/
    ]
  };
  useEffect(() => {
    getAnimal();
  }, []);
  reloadHandler();
  return (
    <>
      <MDBDataTable
        className="data-table"
        striped
        scrollY
        hover
        bordered
        small
        maxHeight="370px"
        data={data} // TODO: change with 'data'
        entriesLabel={["Entradas por página"]}
        infoLabel={["Mostrando de", "a", "entradas, de"]}
        paginationLabel={["Anterior", "Siguiente"]}
        searchLabel={["Filtrar"]}
      />
    </>
  );
};
