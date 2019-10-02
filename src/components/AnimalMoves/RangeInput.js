import React from "react";

const RangeInput = ({ title, id, value, onChange, onBlur }) => {
  
  return (
    <div className="form-group row">
      <label htmlFor={id}>{title}: </label>
      <input type="number" onChange={onChange} onBlur={onBlur} value={value} id={id} />
    </div>
  );
};

export default RangeInput;