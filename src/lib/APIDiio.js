export const postDiioPurchase = async (
  apiInstance,
  provider_id,
  establishment_id,
  diio_ranges
) => {
  let data = { provider_id, establishment_id, diio_ranges };
  console.log(data);
  const result = await apiInstance.post("/diio_purchases/range", data);
  return result;
};

export const getProviders = async apiInstance => {
  const result = await apiInstance.get("/providers");
  return result.data.map(({ id, rut }) => ({
    value: id,
    label: rut
  }));
};

export const dropDiioRanges = async (apiInstance, range) => {
  const data = { range: range };
  const result = await apiInstance.post("/diio_drops", data);
  return result;
};

export const getSpecies = async apiInstance => {
  const result = await apiInstance.get("/species_groups");

  return result.data.map(({ id, name }) => ({
    value: id,
    label: name
  }));
};

export const getDiioPurchases = async (apiInstance, establishmentId) => {
  const diios = await apiInstance.get(
    `/diio_purchases/establishment/${establishmentId}`
  );
  return diios.data;
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

export const getDiioPurchaseDetails = async (apiInstance, purchaseId) => {
  const details = await apiInstance.get(`/diio_purchases/${purchaseId}`);
  return details.data;
};

export const getUserEstablishments = async apiInstance => {
  const titularId = apiInstance.titular.id;
  const establishments = await apiInstance.get(
    `/user/${titularId}/establishments`
  );
  return establishments.data;
};

export const getDroppedDiioList = async apiInstance => {
  const result = await apiInstance.get("/diio_drops")
  return result.data.diios.map(({diio_id, drop_cause, created_at, specie}) => ({
    diio_id,
    drop_cause,
    date: created_at.split("T")[0],
    specie: specie.name
  }))
}

//TODO: Create the route
export const getDownListTableApi = async (
  apiInstance,
  specie,
  desde,
  hasta
) => {
  let data = { specie, desde, hasta };
  const result = await apiInstance.get("/down_list_filtered", data);

  return result.data.map(({ diio, reason, date, specie }) => ({
    diio: diio,
    reason: reason,
    specie: specie,
    date: date
  }));
};

//CREATE ROUTE
export const getStockDIIOEstablishmentTableApi = async (
  apiInstance,
  buyer,
  seller,
  establishment,
  rup,
  brand,
  type,
  specie,
  desde,
  hasta
) => {
  let data = {
    buyer,
    seller,
    establishment,
    rup,
    brand,
    type,
    specie,
    desde,
    hasta
  };
  const result = await apiInstance.get("/down_list_filtered", data);

  return result.data.map(({ diio, buyer, date, name }) => ({
    diio: diio,
    buyer: buyer,
    date: date,
    name: name
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
