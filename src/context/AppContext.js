import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useEventDispatch } from './EventContext';

import { APP_EVENTS, BUTLER_EVENTS } from '../constants';

import { receiveAllFromMain, sendFromRenderer } from '../utils/electronAPI';

const UPDATE = 'UPDATE';

const AppContext = createContext();

function useAppContext() {
  return useContext(AppContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      const updatedState = { ...state };
      if (payload.msg === 'SERVER_STARTED') {
        updatedState.serverStarted = true;
      } else if (payload.msg === 'SERVER_STOPPED') {
        updatedState.serverStarted = false;
      }

      return updatedState;
    }

    case APP_EVENTS.IS_VISIBLE_SECRET: {
      const updatedState = { ...state };
      updatedState.isVisibleSecret = false;

      return updatedState;
    }

    default: {
      throw Error(`Unexpected action type in AppContext reducer: '${type}'.`);
    }
  }
}

export function Updater() {
  const { update } = useAppContext();
  const dispatchEvent = useEventDispatch();

  useEffect(() => {
    receiveAllFromMain('SERVER', (event, data) => {
      dispatchEvent(APP_EVENTS.SERVER_DATA, data);
      update(data);
    });

    receiveAllFromMain(BUTLER_EVENTS.STOPPED, () => {
      dispatchEvent(BUTLER_EVENTS.STOPPED);
    });

    receiveAllFromMain(BUTLER_EVENTS.DIED, () => {
      dispatchEvent(BUTLER_EVENTS.DIED);
    });

    const livenessPoll = setInterval(() => {
      sendFromRenderer(BUTLER_EVENTS.ALIVE);
    }, 60000);

    return () => {
      clearInterval(livenessPoll);
    };
  }, [update, dispatchEvent]);

  return null;
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, { serverStarted: false, isVisibleSecret: true });

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: APP_EVENTS.IS_VISIBLE_SECRET });
    }, 300000);
  }, []);

  const update = useCallback(payload => {
    dispatch({ type: UPDATE, payload });
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        update,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const { state, update } = useAppContext();
  return [state, update];
}
