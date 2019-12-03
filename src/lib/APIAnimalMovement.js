
export const getEstablishment = async apiInstance => {
  const result = await apiInstance.get("/establishments");

  return result.data.map(({ id, name, rup }) => ({
    value: id,
    label: rup + " - " + name
  }));
}

export const getAnimalMovements = async apiInstance => {
  const moves = await apiInstance.get("/animal_movement_table")
  return moves
}