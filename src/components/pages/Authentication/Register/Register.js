import React, { useState } from 'react';
import Button from '../../../common/Button';
import axios from 'axios';

const REGISTER_MODEL = {
  email: 'test',
  password: 'test',
  confirmPassword: 'test',
  referralCode: 'test1',
};

export const Register = ({ authenticateUser }) => {
  const [state, setState] = useState(REGISTER_MODEL);
  const [emailMessage, setEmailMessage] = useState('');
  const [referralMessage, setReferralMessage] = useState('');

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

  const handleOnBlur = async event => {
    event.persist();

    const {
      target: { name, value },
    } = event;

    if (name !== 'email') return;

    try {
      await axios.get('http://localhost:9000/email/' + value);

      setEmailMessage('Email is available');
    } catch (error) {
      setEmailMessage('Email is taken');
    }
  };

  const handleOnKeyUp = async event => {
    event.persist();

    const {
      target: { name, value },
    } = event;

    if (name !== 'referralCode' || value.length < 5) {
      return;
    }

    try {
      await axios.get('http://localhost:9000/referralCode/' + value);

      setReferralMessage('Valid referral code');
    } catch (error) {
      setReferralMessage('Invalid referral code');
    }
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
      {emailMessage && <p>{emailMessage}</p>}
      {referralMessage && <p>{referralMessage}</p>}
      <div>
        <Button btnText='Register' onClick={submitForm} />
      </div>
    </div>
  );
};
