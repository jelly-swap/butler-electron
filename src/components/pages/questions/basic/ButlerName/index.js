import React, { useState, useEffect, useRef } from 'react';

import Input from '../../../../common/Input';
import QuestionTitle from '../../../../common/QuestionTitle';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import './style.scss';

const ButlerName = ({ selectedName, isButlerStarted, getState }) => {
  const [butlerName, setButlerName] = useState('');
  const errorMessage = useRef('Username is required');

  useEffect(() => {
    if (!selectedName) return;

    setButlerName(selectedName);
  }, [selectedName]);

  useGetStateFromCP(isButlerStarted, getState, { NAME: butlerName });

  const handleOnChange = ({ target: { value } }) => {
    setButlerName(value);
  };

  return (
    <>
      <QuestionTitle title='Butler name' />
      <div className='butler-name-wrapper'>
        <Input type='text' value={butlerName} onChange={handleOnChange} placeholder='Butler_Username' />
        <span className={!butlerName ? 'invalid' : 'valid'}>{errorMessage.current}</span>
      </div>
    </>
  );
};

export default ButlerName;
