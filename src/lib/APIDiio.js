export const postDiioPurchase = async (
  apiInstance,
  provider_id,
  establishment_id,
  diio_ranges
) => {
  let data = { provider_id, establishment_id, diio_ranges };
  const result = await apiInstance.post("/diio_purchases/range", data);
  return result;
};

export const dropDiioRanges = async (apiInstance, range, motive) => {
  let data = { range, motive };
  apiInstance.post("diio_drops", data);
};

export const getProviders = async apiInstance => {
  const result = await apiInstance.get("/providers");
  return result.data.map(({ id, rut }) => ({
    value: id,
    label: rut
  }));
};

export const getSpecies = async apiInstance => {
  const result = await apiInstance.get("/species");
  return result.data.map(({ id, name }) => ({
    value: id,
    label: name
  }));
};

export const getBrands = async apiInstance => {
  const result = await apiInstance.get("/diio_purchases");
  return result.data.map(({ id, brand }) => ({
    value: id,
    label: brand
  }));
};

export const getModels = async apiInstance => {
  const result = await apiInstance.get("/diio_models");
  return result.data.map(({ id, model }) => ({
    value: id,
    label: model
  }));
};

// export const getDataStockDIIOEstablecimiento = async apiInstance => {
//   const result = await apiInstance.get("/diio_stock_table");
//   return result.data.map(({data,index}) => ({
//     const{Nregister, vendor, comprador, fecha, nombre  }=data
//     return(

//     )
//   }));
// };
