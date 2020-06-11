import React, { useState, useEffect } from 'react';

import './style.scss';

export function useCheckboxes(defaultCheckboxes, callback) {
  const [checkboxes, setCheckboxes] = useState(defaultCheckboxes);

  function setCheckbox(index, checked) {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = checked;
    setCheckboxes(newCheckboxes);
  }

  useEffect(() => {
    callback(checkboxes);
  }, [checkboxes, callback]);

  console.log(' CHECKBOXED: ', checkboxes);

  return { setCheckbox, checkboxes };
}

export function Checkboxes({ checkboxes, setCheckbox }) {
  console.log(checkboxes);
  return (
    <>
      {checkboxes.map((checkbox, i) => (
        <label className='checkbox-label'>
          <input
            type='checkbox'
            checked={checkbox.checked}
            onChange={e => {
              setCheckbox(i, e.target.checked);
            }}
          />
          {checkbox.name}
        </label>
      ))}
    </>
  );
}

export function CheckboxRadio(checkboxes) {
  console.log(checkboxes);
  return (
    <div>
      <Checkboxes checkboxes={checkboxes} />
    </div>
  );
}
