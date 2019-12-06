import React, { useContext } from "react";
import { Formik, Field, FieldArray } from "formik";
import APIContext from "../APIProvider";
import Selector from "./Utilities/FormikSelector";
import * as Yup from "yup";
import { dropDiioRanges, getSpecies } from "../../lib/APIDiio";
import "./notAppliedDroppedDiio.css";

const NotAppliedDroppedDiio = () => {
  const api = useContext(APIContext);

  const getOwnerRut = () => {
    return api.titular.run;
  };
  const getOwnerName = () => {
    return `${api.titular.name} ${api.titular.last_name}`;
  };
  async function getSpeciesData() {
    const data = await getSpecies(api);
    return data;
  }
  async function getDropReasons() {
    return [
      { value: "ROBO O HURTO", label: "ROBO O HURTO" },
      { value: "EXTRAVIO", label: "EXTRAVIO" },
      { value: "FALLA PLASTICO", label: "FALLA PLASTICO" },
      { value: "FALLA TINTA", label: "FALLA TINTA" },
      { value: "RUPTURA POR TENAZA", label: "RUPTURA POR TENAZA" }
    ];
  }

  return (
    <div>
      <h2 className="title">Baja de DIIO no aplicados</h2>
      <Formik
        className="body"
        initialValues={{
          ownerRut: getOwnerRut(),
          specie: null,
          startDiio: null,
          endDiio: null,
          dropReason: null,
          diio_ranges: []
        }}
        onSubmit={(values, { setSubmitting }) => {
          dropDiioRanges(
            api,
            values.diio_ranges.map(range => [
              range.desde,
              range.hasta,
              values.specie,
              values.dropReason
            ])
          ).then(resp => {
            let dropNotApplied = resp.data.unprocesed_ids;
            if (dropNotApplied.length == 0) {
              dropNotApplied = "ninguno.";
            }
            resp.success
              ? alert(
                  `Baja realizada. Diios que no se dieron de baja: ${dropNotApplied}`
                )
              : alert(`Error en la baja. ${resp.data}`);
          });
          setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          ownerRut: Yup.string()
            .nullable()
            .required("Requerido"),
          specie: Yup.string()
            .nullable()
            .required("Requerido"),
          dropReason: Yup.string()
            .nullable()
            .required("Requerido"),
          diio_ranges: Yup.array()
            .of(
              Yup.object()
                .shape({
                  desde: Yup.number()
                    .min(0, "Desde debe ser >= 0")
                    .required("Requerido"),
                  hasta: Yup.number()
                    .min(
                      Yup.ref("desde"),
                      `"Hasta" debe ser igual o mayor a "Desde"`
                    )
                    .required("Requerido")
                })
                .required()
            )
            .required()
        })}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleSubmit,
            setFieldValue,
            setFieldTouched
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-1" align="right">
                  <p>Rut </p>
                  <p>Nombre </p>
                </div>
                <br />
                <div className="col-md-4">
                  <p>{values.ownerRut}</p>
                  <p> {getOwnerName()}</p>
                </div>
              </div>
              <div className="">
                <Selector
                  fieldName="specie"
                  fieldValue={values.specie}
                  labelName="Especie"
                  onChange={(field, fieldValue) => {
                    setFieldValue(field, fieldValue.label);
                  }}
                  onBlur={setFieldTouched}
                  touched={touched.selectedSpecie}
                  data={getSpeciesData}
                />
                <br />
                <Selector
                  fieldName="dropReason"
                  fieldValue={values.dropReason}
                  labelName="Motivo Baja"
                  onChange={(field, fieldValue) => {
                    setFieldValue(field, fieldValue.value);
                  }}
                  onBlur={setFieldTouched}
                  touched={touched.selectedDropReason}
                  data={getDropReasons}
                />
              </div>
              <br />
              <h4>Rangos de DIIO</h4>
              <FieldArray
                name="diio_ranges"
                render={arrayHelpers => (
                  <div name="rango">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => arrayHelpers.push({ desde: 0, hasta: 0 })}
                    >
                      Añadir rango
                    </button>
                    {values.diio_ranges && values.diio_ranges.length > 0
                      ? values.diio_ranges.map((_, index) => (
                          <div key={index}>
                            <div className="form-inline">
                              <Field
                                type="number"
                                className="form-control mr-3"
                                name={`diio_ranges[${index}].desde`}
                              />
                              <Field
                                type="number"
                                className="form-control"
                                name={`diio_ranges[${index}].hasta`}
                              />
                              <button
                                type="button"
                                className="btn btn-danger m-3"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </button>
                              {errors.diio_ranges && errors.diio_ranges[index] && (
                                <div className="text-danger">
                                  {errors.diio_ranges[index].desde || ""}
                                  {errors.diio_ranges[index].hasta || ""}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                )}
              />

              <br />
              <hr />
              <button
                className="btn btn-primary"
                type="submit"
                disabled={!dirty || isSubmitting}
              >
                Guardar cambios
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NotAppliedDroppedDiio;
