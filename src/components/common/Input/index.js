import React, { useState, useEffect } from 'react';

import './style.scss';

export default ({
  text,
  onChange,
  value,
  disabled,
  type,
  className,
  onKeyDown,
  errMessage,
  name,
  onFocus,
  checked,
}) => {
  const [errorMsg, setErrorMsg] = useState('');
  const style = className === undefined ? '' : className;

  useEffect(() => {
    setErrorMsg(errMessage);
  }, [errMessage]);

  const onInput = e => {
    onChange(e);
  };

  return (
    <div className='inputHolder'>
      <input
        name={name}
        autoComplete={type === 'password' ? 'on' : 'off'}
        type={type}
        value={value}
        onChange={e => onInput(e)}
        className={`input ${style}`}
        placeholder={text}
        disabled={disabled}
        onKeyDown={e => {
          if (onKeyDown) {
            onKeyDown(e);
          }
        }}
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
