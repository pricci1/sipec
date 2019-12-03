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
  speciesId,
  birthEstablishmentId,
  sex,
  breed,
  diioStart,
  diioEnd,
  dateFrom,
  dateTo
) => {
  let request = `/animal_search?id_del_establecimiento=${establishmentId}&especie=${speciesId}`;

  let info;
  if (typeof birthEstablishmentId !== "undefined") {
    request =
      request + `&establecimiento_de_nacimiento=${birthEstablishmentId}`;
  }
  if (typeof sex !== "undefined") {
    request = request + `&sexo=${sex}`;
  }
  if (typeof breed !== "undefined") {
    request = request + `&raza=${breed}`;
  }
  if (diioStart != "") {
    request = request + `&diio_desde=${diioStart}`;
  }
  if (diioEnd != "") {
    request = request + `&diio_hasta=${diioEnd}`;
  }
  if (dateFrom != "") {
    request = request + `&fecha_desde=${dateFrom}`;
  }
  if (dateTo != "") {
    request = request + `&fecha_hasta=${dateTo}`;
  }
  //console.log("RUTA:", request);

  info = await apiInstance.get(request);
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

export const getBreedApi = async apiInstance => {
  const result = await apiInstance.get("/breeds");
  return result.data.map(({ id, name }) => ({
    value: id,
    label: name
  }));
};

export const getSpecies = async apiInstance => {
  const result = await apiInstance.get("/species");
  return result.data.map(({ id, name }) => ({
    value: id,
    label: name
  }));
};

export const getEntries = async apiInstance => {
  const result = await apiInstance.get("/entries");
  return result.data.map(({ id, name }) => ({
    value: id,
    label: name
  }));
};

export const getEstablishmentInfo = async (apiInstance, establishmentId) => {
  return await apiInstance.get(`/establishments/${establishmentId}/background`);
};

export const getEstablishmentSpeciesApi = async (
  apiInstance,
  establishmentId
) => {
  let result = await apiInstance.get(
    `/species_by_establishment/${establishmentId}`
  );
  return result.data.species_group.map(({ id, name }) => ({
    value: id,
    label: name
  }));
};
