import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import ConfigContextProvider from './context/ConfigContext';
import PasswordContextProvider from './context/PasswordContext';
import LoggerContextProvider, { Updater as LoggerUpdater } from './context/LoggerContext';
import AppContextProvider, { Updater as AppUpdater } from './context/AppContext';
import BalanceContextProvider, { Updater as BalanceUpdater } from './context/BalanceContext';
import TransactionContextProvider, { Updater as TransactionUpdater } from './context/TransactionContext';

import './index.scss';

function Updaters() {
  return (
    <>
      <LoggerUpdater />
      <AppUpdater />
      <BalanceUpdater />
      <TransactionUpdater />
    </>
  );
}

function ContextProviders({ children }) {
  return (
    <ConfigContextProvider>
      <AppContextProvider>
        <BalanceContextProvider>
          <TransactionContextProvider>
            <LoggerContextProvider>
              <Updaters />
              <PasswordContextProvider>{children}</PasswordContextProvider>
            </LoggerContextProvider>
          </TransactionContextProvider>
        </BalanceContextProvider>
      </AppContextProvider>
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
