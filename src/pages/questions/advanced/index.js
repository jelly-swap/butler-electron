import Collapsible from 'react-collapsible';
import ServerOptions from './ServerOptions';

import React,{useRef} from 'react';

import DownArrow from '../../../images/down-arrow.svg';

import './_style.scss';

export default () => {
  const currentRef = useRef(null)

  const handleClick = () =>
  setTimeout(() => {
    currentRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, 500);
  
  return (
    <Collapsible
      trigger={
        <div onClick={handleClick} className='advanced-options-wrapper'>
          <span>Advanced options</span>
          <img src={DownArrow} alt='advanced-options' />
        </div>
      }
      className='collapsible-style'
      triggerOpenedClassName='collapsible-style-opened'
    >
      <ServerOptions currentRef={currentRef}/>
    </Collapsible>
  );
};
