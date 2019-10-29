import React from "react";
import AsyncSelect from "react-select/async";

const Selector = props => {
  //props: {fieldName: "", data:..., fieldValue:"", labelName:""}

  return (
    <div>
      <div className="row" style={{ textAlign: "justify" }}>
        <div className="col-md-2" style={{ direction: "rtl" }}>
          <label htmlFor={props.fieldName}>{props.labelName}</label>
        </div>
        <div className="col-md-4">
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
        </div>
      </div>
    </div>
  );
};

export default Selector;
