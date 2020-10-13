import React from 'react';

import Input from '../../../../../components/common/Input';

const AdvancedInput = ({currentRef, value, name, handler }) => {
  return (
    <div className='advanced-input-wrapper'>
      <span ref={currentRef} >{name}</span>
      <Input type='text' value={value} onChange={handler} />
    </div>
  );
};

export default AdvancedInput;
