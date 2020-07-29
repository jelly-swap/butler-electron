import React, { useState } from 'react';
import Button from '../../../common/Button';

const REGISTER_MODEL = {
  email: 'test',
  password: 'test',
  confirmPassword: 'test',
  referralCode: 'test',
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

  const handleOnBlur = event => {
    event.persist();

    const {
      target: { name, value },
    } = event;

    if (name !== 'email') return;

    //TODO: Check if email is available
  };

  const handleOnKeyUp = event => {
    event.persist();

    const {
      target: { name, value },
    } = event;

    if (name !== 'referralCode' || value.length < 5) {
      return;
    }

    //TODO: Check if referral code is valid
  };

  const submitForm = () => {
    const { confirmPassword, ...rest } = state;

    authenticateUser('/register', rest);
  };

  return (
    <div className='authentication-wrapper'>
      {Object.keys(REGISTER_MODEL).map(key => (
        <div key={key}>
          <label>{key}</label>
          <input
            name={key}
            value={state[key]}
            onChange={handleInputOnChange}
            onBlur={handleOnBlur}
            onKeyUp={handleOnKeyUp}
          />
        </div>
      ))}
      <div>
        <Button btnText='Register' onClick={submitForm} />
      </div>
    </div>
  );
};
