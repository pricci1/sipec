
export const postDiioPurchase = async(
  apiInstance,
  provider_id,
  establishment_id,
  diio_ranges
) => {
  let data = { provider_id, establishment_id, diio_ranges };
  const result = await apiInstance.post("/diio_purchases/range", data);
  return result
};

export const getProviders = async apiInstance => {
  const result = await apiInstance.get("/providers");
  return result.data.map(({id, rut}) => ({
    value: id,
    label: rut
  }));
  
};

export const dropDiioRanges = (
  apiInstance,
  range
) => {
  
  let data = {range}
  apiInstance.post('/diio_drops', data)
}

export const getSpecies = async apiInstance =>{
  const result = await apiInstance.get("/species");
  console.log(result)
  return result.data.map(({id, name}) => ({
    value:id, 
    label: name
  }))
}