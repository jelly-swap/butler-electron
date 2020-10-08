import React from 'react';
import './style.scss';

export default ({ type, color, content, onClick, disabled, className, title }) => {
  const colorStyle = disabled === true ? 'grey' : color;
  const style = `${colorStyle} button ${className === undefined ? '' : className}`;
  return (
    <button type={type} onClick={onClick} className={style} disabled={disabled} title={title}>
      {content}
    </button>
  );
};
