import { array } from "prop-types";

export const getUserEstablishmentsApi = async (apiInstance, user_id) => {
  const result = await apiInstance.get(`/user/${user_id}/establishments`);
  function boolToString(boolData) {
    if (boolData) {
      return "Sí";
    }
    return "No";
  }
  return result.data.map(
    ({ anabolics, blocked, area_id, created_at, id, name, place_id, rup }) => ({
      id: id,
      rup: rup,
      inscriptionDate: created_at,
      name: name,
      titular: "Titular",
      neighborhood: "Área " + area_id + ", Lugar " + place_id, //cambiar
      sagBlocked: boolToString(blocked),
      anabolics: boolToString(anabolics)
    })
  );
};

//TODO: Do this right
export const updateSpecieChangeApi = async (
  apiInstance,
  arraylist,
  establishment
) => {
  for (let arraylistobject of arraylist) {
    console.log(arraylistobject);
    let data = {
      establishment,
      arraylistobject
    };
    const result = await apiInstance.patch("/diio_changes", data);
    return result;
  }
};

export const getEstablishmentAnimalsApi = async (
  apiInstance,
  establishmentId,
  species
) => {
  console.log(
    "RUTA:",
    `/animal_search?id_del_establecimiento=${establishmentId}&especie=${species}`
  );
  const info = await apiInstance.get(
    `/animal_search?id_del_establecimiento=${establishmentId}&especie=${species}`
  );
  return info.data;
};

export const getSpeciesApi = async apiInstance => {
  const result = await apiInstance.get("/species");

  return result.data.map(({ id, name }) => ({
    value: id,
    label: name
  }));
};

export const getEstablishmentsApi = async apiInstance => {
  const result = await apiInstance.get("/establishments");

  return result.data.map(({ id, name, rup }) => ({
    value: id,
    label: rup + " - " + name
  }));
};

export const getEstablishmentByIdApi = async (apiInstance, establishmentId) => {
  const Establecimento = await apiInstance.get(
    `/establishments/${establishmentId}`
  );
  if (!Establecimento.success) {
    return Establecimento.succes;
  }
  return Establecimento.data;
};

export const getEstablishmentInfo = async (apiInstance, establishmentId) => {
  return await apiInstance.get(`/establishments/${establishmentId}/background`);
};
