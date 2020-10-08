import Collapsible from 'react-collapsible';
import ServerOptions from './ServerOptions';

import React from 'react';

import DownArrow from '../../../images/down-arrow.svg';

import './_style.scss';

export default () => {
  return (
    <Collapsible
      trigger={
        <div className='advanced-options-wrapper'>
          <span>Advanced options</span>
          <img src={DownArrow} alt='advanced-options' />
        </div>
      }
      className='collapsible-style'
      triggerOpenedClassName='collapsible-style-opened'
    >
      <ServerOptions />
    </Collapsible>
  );
};
