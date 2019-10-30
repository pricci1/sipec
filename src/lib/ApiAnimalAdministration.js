export const postDiioChange = async (
  apiInstance,
  specie,
  establishment,
  owner,
  mva,
  verification_date,
  diio_changes
) => {
  let data = {
    specie,
    establishment,
    owner,
    mva,
    verification_date,
    diio_changes
  };
  const result = await apiInstance.post("/diio_changes", data);
  console.log(data);

  return result;
};

export const getSpeciesApi = async apiInstance => {
  const result = await apiInstance.get("/species");

  return result.data.map(({ id, name }) => ({
    value: id,
    label: name
  }));
};

export const getMvasApi = async (apiInstance, establishment_id) => {
  const result = await apiInstance.get(
    `/establishments/${establishment_id}/personals?role_id=1`
  );

  return result.data.map(({ id, name, run }) => ({
    value: id,
    label: run + " - " + name
  }));
};

export const getOwnersApi = async (apiInstance, establishment_id) => {
  const result = await apiInstance.get(
    `/establishments/${establishment_id}/personals?role_id=5`
  );

  return result.data.map(({ id, name, run }) => ({
    value: id,
    label: run + " - " + name
  }));
};

export const getEstablishmentsApi = async apiInstance => {
  const result = await apiInstance.get("/establishments");

  return result.data.map(({ id, name, rup }) => ({
    value: id,
    label: rup + " - " + name
  }));
};

export const getBreedApi = async apiInstance => {
  const result = await apiInstance.get("/breeds");
};

export const getWorkerApi = async apiInstance => {
  const result = await apiInstance.get("/personal_by_company");
  return result.data.map(({ id, name }) => ({
    value: id,
    label: name
  }));
};
export const getCategoriesApi = async apiInstance => {
  const result = await apiInstance.get("/diio_models");
  return result.data.map(({ id, name }) => ({
    value: id,
    label: name
  }));
};

export const getAnimalTableApi = async apiInstance => {
  const result = await apiInstance.get("/animals_by_personal");
  console.log(result);

  return result.data.map(({ diio, specie, rut, breed, sex, date, model }) => ({
    diio: diio,
    specie: specie,
    rut: rut,
    breed: breed.name,
    sex: sex,
    date: date,
    category: model
  }));
};
export const getChangeDiioDataApi = async (apiInstance, titular_id) => {
  const result = await apiInstance.get("/diio_changes_details/1");
  return result;
};

export const getChangeRegistryDataApi = (api, registry_id) => {
  return [];
};

export const getUserEstablishmentsApi = async (apiInstance, user_id) => {
  const result = await apiInstance.get(
    `/diio_purchases/user_establishment/${user_id}`
  );
  return result.data.map(({ id, name, rup }) => ({
    value: id,
    label: rup + " - " + name
  }));
};

export const getInfoSingleDiioConsult = async (apiInstance, diio) => {
  const info = await apiInstance.get(`/diios/${diio}`);
  return info.data[0];
};

export const getMva = async apiInstance => {
  /* cambiar */
  const info = await apiInstance.get("/mva");
  return info.data[0];
};

export const postAnimalDeathRegistration = async (
  apiInstance,
  owner,
  mva,
  down,
  down_details,
  death_date,
  diio_array
) => {
  let data = {
    owner,
    mva,
    down,
    down_details,
    death_date,
    diio_array
  };
  console.log(data);
  const result = await apiInstance.post("/report_death", data);
  return result;
};

export const getAnimalDeathTableApi = async apiInstance => {
  const result = await apiInstance.get("/animal_death_list");
  return result.data.map(
    ({ diio, specie, date, down_type, detail, establishment }) => ({
      diio: diio,
      specie: specie,
      date: date,
      down_type: down_type,
      detail: detail,
      establishment: establishment
    })
  );
};
