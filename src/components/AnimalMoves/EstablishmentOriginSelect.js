import React from "react";
import AsyncSelect from "react-select/async";

const EstablishmentOriginSelect = props => {
  return (
    <>
      <label htmlFor="establishmentOrigin">
        Seleccione RUP/Establecimento Origen
      </label>
      <AsyncSelect
        id="establishmentOrigin"
        cacheOptions
        defaultOptions
        loadOptions={props.establishmentOrigin}
        onChange={value => {
          props.onChange("establishmentOrigin", value);
        }}
        onBlur={value => {
          props.onBlur("establishmentOrigin", value);
        }}
        value={props.value}
      />
      {!!props.error && props.touched && (
        <div className="text-danger">{props.error}</div>
      )}
    </>
  );
};

export default EstablishmentOriginSelect;
