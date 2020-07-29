import React, { useState } from 'react';

const REGISTER_MODEL = {
  username: '',
  password: '',
  confirmPassword: '',
  referralCode: '',
};

export const Register = () => {
  const [state, setState] = useState(REGISTER_MODEL);

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
    <div className='register-wrapper'>
      {Object.keys(REGISTER_MODEL).map(key => (
        <div key={key}>
          <label>{key}</label>
          <input name={key} value={state[key]} onChange={handleInputOnChange} />
        </div>
      ))}
    </div>
  );
};
