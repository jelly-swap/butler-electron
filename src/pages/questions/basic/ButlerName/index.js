import React, { useState } from 'react';

import QuestionTitle from '../../../../components/common/QuestionTitle';
import Input from '../../../../components/common/Input';

import { useButlerConfig } from '../../../../context/ConfigContext';

import './style.scss';

const ButlerName = () => {
  const [config, updateConfig] = useButlerConfig();
  const [isValid, setIsValid] = useState(false);

  useState(() => {
    if (config.NAME) {
      setIsValid(true);
    }
  }, [config]);

  const handleOnChange = ({ target: { value } }) => {
    if (value) {
      setIsValid(true);
      updateConfig({ NAME: value });
    } else {
      setIsValid(false);
      updateConfig({ NAME: '' });
    }
  };

  return (
    <div className='butler-name-wrapper'>
      <QuestionTitle title='Butler name' isValid={isValid} />
      <div className='name-wrapper'>
        <Input
          type='text'
          value={config.NAME}
          onChange={handleOnChange}
          errMessage={isValid ? '' : 'Please provide Butler name'}
        />
      </div>
    </div>
  );
};

export default ButlerName;
