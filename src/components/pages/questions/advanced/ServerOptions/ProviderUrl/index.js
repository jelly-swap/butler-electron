import React from 'react';

import Input from '../../../../../common/Input';

const AggregatorURL = ({ url, getUrl, name }) => {
  const handleUrlChange = event => {
    event.persist();

    const {
      target: { value },
    } = event;

    getUrl(value);
  };

  return (
    <div className='aggregator-url-wrapper'>
      <span>{name}</span>
      <Input type='text' value={url} onChange={handleUrlChange} />
    </div>
  );
};

export default AggregatorURL;
