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
  const result = await apiInstance.get("/species_groups");

  return result.data.map(({ id, name }) => ({
    value: id,
    label: name
  }));
};

export const getEstablishmentMvasApi = async (
  apiInstance,
  establishment_id
) => {
  const result = await apiInstance.get(
    `/establishments/${establishment_id}/mvas`
  );
  return result.data.map(({ id, name, last_name, run }) => ({
    value: id,
    label: run + " - " + name + " " + last_name
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
  return result.data.map(({ id, name }) => ({
    value: id,
    label: name
  }));
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
  const result = await apiInstance.get(`/diio_changes_details/${titular_id}`);
  return result;
};

export const getChangeRegistryDataApi = async (apiInstance, registry_id) => {
  const result = await apiInstance.get(
    `/diio_changes_by_batch?diio_batch_id=${registry_id}`
  );

  return result.data.length == 0
    ? []
    : {
        mva: result.data[0].mva_name,
        specie: result.data[0].specie,
        date: result.data[0].date,
        verification: result.data[0].verification,
        establishment: result.data[0].establishment_name,
        changes: result.data[0].changes.map(change => {
          return {
            last_diio: change.last_diio_id,
            new_diio: change.new_diio_id
          };
        })
      };
};

export const getUserEstablishmentsApi = async (apiInstance, user_id) => {
  const result = await apiInstance.get(`/user/${user_id}/establishments`);

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
  const info = await apiInstance.get("/mvas");
  return info.data[0];
};

export const postAnimalDeathRegistration = async (
  apiInstance,
  specie,
  mva,
  down,
  death_date,
  diio_array
) => {
  let result = { success: false, data: [], not_applied: [] };
  let year = death_date.getFullYear();
  let month = death_date.getMonth() + 1;
  let day = death_date.getDate();
  for (let i = 0; i < diio_array.length; i++) {
    let data = {
      veterinario: mva,
      death_motive: down,
      death_date: year + "-" + month + "-" + day,
      serial_diio: diio_array[i].diio
    };
    const response = await apiInstance.post("/report_death", data);
    result.success = response.success;
    result.data.push(response.data);
    if (response.data.error !== undefined) {
      result.not_applied.push(data.serial_diio);
    }
  }
  return result;
};

export const getAnimalDeathTableApi = async apiInstance => {
  const result = await apiInstance.get("/animal_death_list");
  return result.data.map(
    ({ diio_id, especie, death_date, death_motive, establishment }) => ({
      diio_id,
      specie: especie.name,
      death_date: death_date.split("T")[0],
      death_motive,
      establishment: establishment.name
    })
  );
};

export const getAnimalDeathTableFilteredApi = async (
  apiInstance,
  establishment,
  desde,
  hasta
) => {
  let data = { establishment, desde, hasta };
  console.log("data:", data);
  console.log("try:", data.desde);
  const result = await apiInstance.get(
    `/animal_death_filtered?desde=${desde}&establishment_id=${establishment}&hasta=${hasta}`
  );
  console.log("Result: ", result.data);

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

export const getMvaApi = async (apiInstance, establishment_id) => {
  const result = await apiInstance.get("/veterinarios");
  console.log();

  return result.data.map(({ id, name, run }) => ({
    value: id,
    label: run + " - " + name
  }));
};
export const getAnimalsByRegisterApi = async apiInstance => {
  const result = await apiInstance.get("/animals_by_personal");
  return result;
};

export const getInfoDiioRange = async (apiInstance, diioStart, diioEnd) => {
  const info = await apiInstance.get(
    `/diio/range?desde=${diioStart}&hasta=${diioEnd}`
  );
  return info.data;
};
