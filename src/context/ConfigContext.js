import React, { createContext, useContext, useReducer, useCallback } from 'react';

const UPDATE = 'UPDATE';

const ButlerContext = createContext();

function useContractContext() {
  return useContext(ButlerContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      console.log({
        ...state,
        ...payload,
      });
      return {
        ...state,
        ...payload,
      };
    }

    default: {
      throw Error(`Unexpected action type in ButlerContext reducer: '${type}'.`);
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_CONFIG);

  const update = useCallback(config => {
    updateButlerConfig(config);
  }, []);

  const updateButlerConfig = config => {
    dispatch({ type: UPDATE, payload: config });
  };

  return (
    <ButlerContext.Provider
      value={{
        state,
        update,
        updateButlerConfig,
      }}
    >
      {children}
    </ButlerContext.Provider>
  );
}

export function useButlerConfig() {
  const { state, updateButlerConfig } = useContractContext();
  return [state, updateButlerConfig];
}

export function useConfig(...args) {
  const { state } = useContractContext();
  return safeAccess(state, [...args]);
}

const CONFIG_VERSION = 1;

const DEFAULT_CONFIG = {
  NAME: '',
  VERSION: CONFIG_VERSION,
  PAIRS: { 'MATIC-ETH': { FEE: 0, PRICE: 0 } },
  WALLETS: {
    ETH: {
      ADDRESS: '',
      SECRET: '',
    },
    BTC: {
      ADDRESS: '',
      SECRET: '',
    },
  },
  BLOCKCHAIN_PROVIDER: { INFURA: '' },
  PRICE: {
    PROVIDER: 'CryptoCompare',
    API_KEY: '',
    SECRET_KEY: '',
    UPDATE_INTERVAL: 30,
  },
  EXCHANGE: {
    NAME: '',
    API_KEY: '',
    SECRET_KEY: '',
  },
  NOTIFICATIONS: {
    EMAIL: {
      ENABLED: false,
      USERNAME: '',
      PASSWORD: '',
      FROM: '',
      TO: '',
      SERVICE: 'gmail',
      SUBJECT: 'JELLY',
    },
  },
  AGGREGATOR_URL: 'https://jelly-jam.herokuapp.com/api/v1/info',
  TRACKER_URL: 'jelly-tracker.herokuapp.com',
  SERVER: { PORT: '9000' },
  DATABASE: { ACTIVE: 'SQLITE', SQLITE: { database: 'butler.sqlite' } },
};
