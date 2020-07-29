import React, { useState } from 'react';
import Button from '../../../common/Button';

const REGISTER_MODEL = {
  username: '',
  password: '',
  confirmPassword: '',
  referralCode: '',
};

export const Register = ({ authenticateUser }) => {
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

  const submitForm = () => {
    const { confirmPassword, ...rest } = state;

    authenticateUser('/user/register', rest);
  };

  return (
    <div className='authentication-wrapper'>
      {Object.keys(REGISTER_MODEL).map(key => (
        <div key={key}>
          <label>{key}</label>
          <input name={key} value={state[key]} onChange={handleInputOnChange} />
        </div>
      ))}
      <div>
        <Button btnText='Register' onClick={submitForm} />
      </div>
    </div>
  );
};
