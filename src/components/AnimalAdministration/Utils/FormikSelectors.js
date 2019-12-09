import React from "react";
import Select from "react-select";

export const Selector = ({
  fieldName,
  label,
  options,
  onChange,
  onBlur,
  fieldValue,
  errors,
  touched
}) => {
  return (
    <div>
      <div className="row" style={{ textAlign: "right" }}>
        <div className="col-md-2" style={{ direction: "rtl" }}>
          <label htmlFor={fieldName}>{label}</label>
        </div>
        <div className="col-md-4">
          <Select
            id={fieldName}
            options={options}
            onChange={value => {
              onChange(fieldName, value);
            }}
            onBlur={() => {
              onBlur(fieldName, true);
            }}
            value={fieldValue}
          />
          {!!errors && touched && <div className="text-danger">{errors}</div>}
        </div>
      </div>
    </div>
  );
};
