import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import ConfigContextProvider from './context/ConfigContext';
import PasswordContextProvider from './context/PasswordContext';

import './index.scss';

function ContextProviders({ children }) {
  return (
    <ConfigContextProvider>
      <PasswordContextProvider>{children}</PasswordContextProvider>
    </ConfigContextProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ContextProviders>
      <App />
    </ContextProviders>
  </React.StrictMode>,
  document.getElementById('root'),
);
