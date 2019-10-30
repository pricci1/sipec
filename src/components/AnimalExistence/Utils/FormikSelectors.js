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
    <>
      <label htmlFor={fieldName}>{label}</label>
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
    </>
  );
};
