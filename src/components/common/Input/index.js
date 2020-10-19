import React, { useState, useEffect } from 'react';

import './style.scss';

export default ({ text, onChange, value, disabled, type, className, errMessage, name, onFocus, checked }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const style = className === undefined ? '' : className;

  useEffect(() => {
    setErrorMsg(errMessage);
  }, [errMessage]);

  const onInput = e => {
    onChange(e);
  };

  return (
    <div className={`inputHolder ${style}`}>
      <input
        name={name}
        autoComplete={type === 'password' ? 'on' : 'off'}
        type={type}
        value={value}
        onChange={e => onInput(e)}
        className={`input`}
        placeholder={text}
        disabled={disabled}
        onFocus={onFocus ? onFocus : null}
        checked={checked}
      />
      {errorMsg && (
        <div className='errorInput'>
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
