export const getAnimalExistnceDeclarations = async apiInstance => {
  const declarations = await apiInstance.get("/existence_declarations");
  //   const establishments = await apiInstance.get(
  //     `/establishments`
  //   );
  var responseData = declarations.data.map(d => ({
    id: d.id,
    rup: d.establishment_id,
    name: d.establishment_id,
    year: d.year,
    neighborhood: d.establishment_id,
    declarationDate: d.created_at,
    registrationDate: d.created_at,
    existence_specie_declarations: d.existence_specie_declarations,
    type: "Anual"
  }));
  return responseData;
};
