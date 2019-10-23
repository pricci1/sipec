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
        onBlur={() => {
          props.onBlur(props.fieldName, true);
        }}
        value={props.value}
      />
      {!!props.errors && props.touched && (
        <div className="text-danger">{props.errors}</div>
      )}
    </>
  );
};

export default Selector;
