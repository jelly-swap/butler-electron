import React from 'react';

const Input = ({ id, type, name, value, onChange, onBlur, onKeyDown, checked, placeholder, className }) => (
  <input
    id={id}
    className={className}
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    checked={checked}
    placeholder={placeholder}
    onKeyDown={onKeyDown ? onKeyDown : null}
  />
);

export default Input;
