import React from 'react';

import Input from '../../../../../common/Input';

const Port = ({ port, getPort }) => {
  const handlePortOnChange = event => {
    event.persist();

    const {
      target: { value },
    } = event;

    getPort(value);
  };

  return (
    <div className='port-wrapper'>
      <span>Port</span>
      <Input type='text' placeholder='9003' value={port} onChange={handlePortOnChange} />
    </div>
  );
};

export default Port;
