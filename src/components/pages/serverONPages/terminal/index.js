import React, { useEffect, useState } from 'react';
import Terminal from 'terminal-in-react';

import './style.scss';

import { CheckboxRadio, useCheckboxes } from '../../../common/Checkbox';

// 📕: error message
// 📙: warning message
// 📗: ok status message
// 📘: action message
// 📓: canceled status message
// 📔: Or anything you like and want to recognize immediately by color

const MESSAGE_COLORS = {
  ERROR: '📕',
  WARN: '📙',
  INFO: '📗',
  ACTION: '📘',
  CANCELED: '📓',
  DEFAULT: '📔',
};

const checkboxesList = ['Info', 'Error', 'Warning'];

const getDefaultCheckboxes = () =>
  checkboxesList.map(checkbox => ({
    name: checkbox,
    checked: false,
  }));

const JellyTerminal = ({ terminalData }) => {
  const [checkboxes, setCheckboxes] = useState(getDefaultCheckboxes());

  useCheckboxes(checkboxes, setCheckboxes);

  console.log(checkboxes);

  useEffect(() => {
    terminalData.forEach(log => {
      const { now, info } = log;

      if (!info) return;

      const idxOfDblDots = info.indexOf(':');

      const color = idxOfDblDots !== -1 ? info.split(':')[0] : 'DEFAULT';

      console.log(`${MESSAGE_COLORS[color]} ${now} ${info.replace(/INFO|ERROR|WARN/, '')}`);
    });
  }, [terminalData]);

  return (
    <>
      {CheckboxRadio(checkboxes)}

      <div className='terminal-wrapper'>
        <Terminal
          allowTabs={false}
          hideTopBar={true}
          watchConsoleLogging={true}
          color='green'
          backgroundColor='#e4e4e4'
          barColor='#e4e4e4'
          style={{ fontWeight: 'bold', fontSize: '1em', height: '500px' }}
        />
      </div>
    </>
  );
};

// const labelToColor = {
//   Info: 'INFO',
//   Error: 'ERROR',
//   Warning: 'WARN',
// };

// const getFilter = checked => {
//   checked.reduce((c, p) => {
//     if (c.checked) {
//       p[labelToColor[c.name]] = true;
//     }

//     return p;
//   }, {});
// };

export default JellyTerminal;
