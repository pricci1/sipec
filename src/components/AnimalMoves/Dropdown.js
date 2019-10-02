import React from "react";


const Dropdown = ({ id, title, value, options, onChange, onBlur }) => {

  return (
    <div className="form-group row">
      <label>{title}: </label>
        <select onChange={onChange} onBlur={onBlur} name={id} value = {value}>
        <option value={null}>{""}</option>
        {options &&
          options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Dropdown;