import React from 'react';

import './style.scss';

const QuestionTitle = ({ title, isValid }) => {
  return <h3 className={`${isValid ? 'valid-q' : 'invalid-q'}`}>{title}</h3>;
};
export default QuestionTitle;
