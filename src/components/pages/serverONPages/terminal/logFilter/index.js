import React from 'react';
import Input from '../../../../common/Input';

const logFilters = ['INFO', 'ERROR', 'WARNING'];

export default ({ selectedLogFilters, onLogFilterSelected }) => {
  const handleOnChange = event => {
    event.persist();

    const {
      target: { value },
    } = event;

    onLogFilterSelected(value);
  };

  return (
    <div className='log-filter-wrapper'>
      {logFilters.map(name => (
        <label>
          <Input
            type='checkbox'
            key={name}
            checked={selectedLogFilters.includes(name)}
            value={name}
            onChange={handleOnChange}
          />
          {name}
        </label>
      ))}
    </div>
  );
};
