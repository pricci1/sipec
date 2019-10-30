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
  return result;
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

    return result.data.map(({id, name, rup}) => ({
        value: id,
        label: rup + " - " + name
    }))
}

export const getBreedApi = async apiInstance => {
  const result = await apiInstance.get("/breeds");

    return result.data.map(({id, name}) => ({
        value: id,
        label: name
    }))
}

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
}
export const getChangeDiioDataApi = (api, titular_id) => {
  return []
}

export const getChangeRegistryDataApi = (api, registry_id) => {
  return []
}

export const getInfoSingleDiioConsult = async (apiInstance, diio) => {
  const info = await apiInstance.get(`/diios/${diio}`);
  return info.data[0];
}
