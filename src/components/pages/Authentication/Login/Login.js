import React, { useState } from 'react';
import Button from '../../../common/Button';

const LOGIN_MODEL = {
  username: '',
  password: '',
};

export const Login = ({ authenticateUser }) => {
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

  const submitForm = () => {
    authenticateUser('/login', state);
  };

  return (
    <div className='authentication-wrapper'>
      {Object.keys(LOGIN_MODEL).map(key => (
        <div key={key}>
          <label>{key}</label>
          <input name={key} value={state[key]} onChange={handleInputOnChange} />
        </div>
      ))}
      <div>
        <Button btnText='Login' onClick={submitForm} />
      </div>
    </div>
  );
};
