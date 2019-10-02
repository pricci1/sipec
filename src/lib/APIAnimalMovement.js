
export const getEstablishment = async apiInstance => {
  const Establecimento = await apiInstance.get("/establishments");
  console.log(Establecimento)
  return Establecimento.data.map(({ name, rup }) => ({
    value: rup,
    label: rup + "/" + name
  }));
}

export const getAnimalMovements = async apiInstance => {
  const moves = await apiInstance.get("/animal_movement_table")
  return moves
}