import React from 'react';

import Input from '../../../../../components/common/Input';

const AdvancedInput = ({ value, name, handler }) => {
  return (
    <div className='advanced-input-wrapper'>
      <span>{name}</span>
      <Input type='text' value={value} onChange={handler} />
    </div>
  );
};

export default AdvancedInput;
