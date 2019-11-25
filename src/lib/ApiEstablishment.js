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
