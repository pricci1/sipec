import React, { useContext, useState } from "react";
import { MyEstablishmentsTable } from "./MyEstablishmentsTable";
import useModal from "../Modal";
import APIContext from "../APIProvider";
import EstablishmentDetailsMenu from "../../routes/EstablishmentDetailsMenu";

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

  return (
    <div>
      <h2>Establecimientos Asociados</h2>
      <MyEstablishmentsTable
        setModalEstablishmentId={setSelectedEstablishmentId}
        toggleModal={toggleModal}
        tableData={mockData || []}
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
