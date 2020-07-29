import React, { useState } from 'react';

const LOGIN_MODEL = {
  username: '',
  password: '',
};

export const Login = () => {
  const [state, setState] = useState(LOGIN_MODEL);

  const handleInputOnChange = event => {
    event.persist();

    const {
      target: { name, value },
    } = event;

    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='authentication-wrapper'>
      {Object.keys(LOGIN_MODEL).map(key => (
        <div key={key}>
          <label>{key}</label>
          <input name={key} value={state[key]} onChange={handleInputOnChange} />
        </div>
      ))}
    </div>
  );
};
