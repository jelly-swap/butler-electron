import React, { useState, useEffect, useRef } from 'react';

import Input from '../../../../common/Input';
import QuestionTitle from '../../../../common/QuestionTitle';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import './style.scss';

const ButlerName = ({ invalid, selectedName, isButlerStarted, getState }) => {
  console.log(invalid);
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

  useEffect(() => {
    console.log('v', invalid);
  }, [invalid]);

  return (
    <>
      <QuestionTitle title='Butler name' />
      <div className='butler-name-wrapper'>
        <span className={!butlerName && invalid === undefined ? 'default' : invalid ? 'invalid' : 'valid'}>
          Username
        </span>
        <Input type='text' value={butlerName} onChange={handleOnChange} placeholder='Butler_Username' />
        {invalid && <span className={invalid ? 'invalid' : 'valid'}>{errorMessage.current}</span>}
      </div>
    </>
  );
};

export default ButlerName;
