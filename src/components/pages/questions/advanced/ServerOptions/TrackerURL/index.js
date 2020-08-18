import React from 'react';

import Input from '../../../../../common/Input';

const TrackrURL = ({ trackerUrl, getTrackerUrl }) => {
  const handleAggregatorUrlOnChange = event => {
    event.persist();

    const {
      target: { value },
    } = event;

    getTrackerUrl(value);
  };

  return (
    <div className='aggregator-url-wrapper'>
      <span>Tracker URL</span>
      <Input type='text' placeholder='tracker.com' value={trackerUrl} onChange={handleAggregatorUrlOnChange} />
    </div>
  );
};

export default TrackrURL;
