// export const getDiiosRange = (apiInstance, from, to) => {
//   apiInstance
//     .get(...)
//     .then(...);

export const postDiioPurchase = (
  apiInstance,
  provider_id,
  establishment_id,
  diio_ranges
) => {
  let data = { provider_id, establishment_id, diio_ranges };
  apiInstance.post("/diio_purchases/range", data);
};

export const getProviders = async apiInstance => {
  const result = await apiInstance.get("/providers");
  return result.data.map(({id, rut}) => ({
    value: id,
    label: rut
  }));
  
};
