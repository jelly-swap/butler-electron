import React, { useState, useEffect } from 'react';

import Input from '../../../../common/Input';
import QuestionTitle from '../../../../common/QuestionTitle';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import './style.scss';

const ButlerName = ({ valid, selectedName, isButlerStarted, getState }) => {
  const [butlerName, setButlerName] = useState('');
  const [isValid, setIsValid] = useState();

  useEffect(() => {
    if (!selectedName) return;

    setButlerName(selectedName);
    setIsValid(true);
  }, [selectedName]);

  useEffect(() => {
    if (valid) {
      setIsValid(valid);
    }
  }, [valid]);

  useGetStateFromCP(isButlerStarted, getState, { NAME: butlerName });

  const handleOnChange = ({ target: { value } }) => {
    setButlerName(value);

    !value ? setIsValid(false) : setIsValid(true);
  };

  return (
    <>
      <QuestionTitle title='Butler name' isValid={isValid} />
      <div className='butler-name-wrapper'>
        <span className={isValid === undefined ? 'default' : isValid ? 'valid' : 'invalid'}>Username</span>
        <Input type='text' value={butlerName} onChange={handleOnChange} placeholder='Butler_Username' />
      </div>
    </>
  );
};

export default ButlerName;
