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
export const postSpecieChangeApi = async (
  apiInstance,
  arraylist,
  establishment
) => {
  for(let arraylistobject of arraylist){
    console.log(arraylistobject);
    let data = {
      establishment,
      arraylistobject
    };
    const result = await apiInstance.post("/diio_changes", data);
    return result;
  }
  
};
