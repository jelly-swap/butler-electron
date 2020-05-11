import React from 'react';

const SelectMenu = ({ options, onChange, id, value }) => {
  return (
    <select
      onChange={event => {
        event.persist();
        onChange(id, event.target.value);
      }}
      value={value}
    >
      {options.map(key => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  );
};

export default SelectMenu;
