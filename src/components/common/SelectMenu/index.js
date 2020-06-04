import React from 'react';

const MINIMUM_ASSETS_TO_OPEN_DROPDOWN = 1;

const SelectMenu = ({ isOpen, options, onChange, id, value }) => {
  return (
    <div className='menu-wrapper'>
      {isOpen && options?.length > MINIMUM_ASSETS_TO_OPEN_DROPDOWN ? (
        <div className='assets-list'>
          {options.map((option, idx) =>
            option !== value ? (
              <div
                onClick={event => {
                  event.persist();
                  onChange(id, option);
                }}
                className='current-asset'
                key={idx}
              >
                <img src={require(`../../../images/tokens/${option}.svg`)} alt={option} />
                <span>{option}</span>
              </div>
            ) : null,
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SelectMenu;
