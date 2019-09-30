import React from "react";

import AsyncSelect from "react-select/async";


const Selector = props => {
    //props: {fieldName: "", data:..., fieldValue:"", labelName:""}
    return (
      <>
        <label htmlFor={props.fieldName}>{props.labelName}</label>
        <AsyncSelect
          id={props.fieldName}
          cacheOptions
          defaultOptions
          loadOptions={props.data}
          onChange={value => {
            props.onChange(props.fieldName, value);
          }}
          onBlur={value => {
            props.onBlur(props.fieldName, value);
          }}
          value={props.value}
        />
      </>
    );
  };

  export default Selector;