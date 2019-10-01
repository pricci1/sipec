import React from "react";
import AsyncSelect from "react-select/async";

const EstablishmentDestinationSelect = props => {
    return (
      <>
        <label htmlFor="establishmentDestination">
          Seleccióne un RUP/Establecimiento Destino
        </label>
        <AsyncSelect
          id="establishmentDestination"
          cacheOptions
          defaultOptions
          loadOptions={props.establishmentDestination}
          onChange={value => {
            props.onChange("establishmentDestination", value);
          }}
          onBlur={value => {
            props.onBlur("establishmentDestination", value);
          }}
          value={props.value}
          isDisabled={props.establishmentDestination === 0}
        />
        {!!props.error && props.touched && (
          <div className="text-danger">{props.error}</div>
        )}
      </>
    );
  };

  export default EstablishmentDestinationSelect