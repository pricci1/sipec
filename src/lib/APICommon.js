export const getSpecies = async apiInstance => {
  const result = await apiInstance.get("/species");

  return result.data.map(({ id, name }) => ({
    value: id,
    label: name
  }));
};

export const getTitularEstablishments = async apiInstance => {
  const titularId = apiInstance.titular.id;
  const establishments = await apiInstance.get(
    `/diio_purchases/user_establishment/${titularId}`
  );
  return establishments.data;
};

export const getRegions = async apiInstance => {
  const regions = await apiInstance.get(`/regions`);
  return regions.data.map(({ id: value, name: label }) => ({ value, label }));
};

export const getNeighborhoods = async apiInstance => {
  const regions = await apiInstance.get(`/neighborhoods`);
  return regions.data.map(({ id: value, name: label }) => ({ value, label }));
};
