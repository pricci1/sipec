import React, { useContext, useState, useEffect } from "react";
import { MyEstablishmentsTable } from "./MyEstablishmentsTable";
import useModal from "../Modal";
import APIContext from "../APIProvider";
import EstablishmentDetailsMenu from "../../routes/EstablishmentDetailsMenu";
import { getUserEstablishmentsApi } from "../../lib/ApiEstablishment";
const mockData = [
  {
    id: "1",
    rup: "1.1.1.1",
    inscriptionDate: "1/1/1",
    name: "Las Lilas",
    titular: "Pablo Ramirez",
    neighborhood: "Las Condes",
    sagBlocked: "No",
    anabolics: "No"
  },
  {
    id: "2",
    rup: "2.2.2.2",
    inscriptionDate: "2/2/2",
    name: "La Fe",
    titular: "Pablo Ramirez",
    neighborhood: "Vitacura",
    sagBlocked: "No",
    anabolics: "No"
  }
];

const MyEstablishments = () => {
  const api = useContext(APIContext);
  const { modal: Modal, modalIsOpened, toggleModal } = useModal();
  const [selectedEstablishmentId, setSelectedEstablishmentId] = useState();
  const [establishmentsData, setEstablishmentsData] = useState();

  useEffect(() => {
    getMyEstablishments();
    // Más cosas que hacer al inicio...
  }, []); // Acá el [] vacío significa componentWillMount. Si le pones otra cosa
  // ([selectedEstablishmentId]), el useEffect se ejecuta al cambiar selectedEstablishmentId

  async function getMyEstablishments() {
    const data = await getUserEstablishmentsApi(api, api.currentUserId);
    setEstablishmentsData(data);
  }

  return (
    <div>
      <h2>Establecimientos Asociados</h2>
      <MyEstablishmentsTable
        setModalEstablishmentId={setSelectedEstablishmentId}
        toggleModal={toggleModal}
        tableData={establishmentsData || []}
      />
      {modalIsOpened && (
        <Modal>
          <EstablishmentDetailsMenu establishmentId={selectedEstablishmentId} />
        </Modal>
      )}
    </div>
  );
};

export default MyEstablishments;
