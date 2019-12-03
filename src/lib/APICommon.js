export const getSpecies = async apiInstance => {
  const result = await apiInstance.get("/species");

  return result.data.map(({ id, name, species_group_id }) => ({
    value: id,
    label: name,
    species_group_id: species_group_id
  }));
};

export const getTitularEstablishments = async apiInstance => {
  const titularId = apiInstance.titular.id;
  const establishments = await apiInstance.get(
    `/diio_purchases/user_establishment/${titularId}`
  );
  return establishments.data;
};

export const getTitular = async apiInstance => {
  const titularId = apiInstance.titular.id;
  const titular = await apiInstance.get(
    `/company_user/`,{
      user_id: titularId
    }
  );
  return titular.data;
};

export const getRegions = async apiInstance => {
  const regions = await apiInstance.get(`/regions`);
  return regions.data.map(({ id: value, name: label }) => ({ value, label }));
};

export const getProvinces = async apiInstance => {
  const regions = await apiInstance.get(`/provinces`);
  return regions.data.map(({ id: value, name: label }) => ({ value, label }));
};

export const getNeighborhoods = async apiInstance => {
  const regions = await apiInstance.get(`/neighborhoods`);
  return regions.data.map(({ id: value, name: label }) => ({ value, label }));
};

export const getSpeciesGroups = async apiInstance => {
  const speciesGroups = await apiInstance.get("/species_groups");
  return speciesGroups.data.map(({ id: value, name: label }) => ({
    value,
    label
  }));
};

