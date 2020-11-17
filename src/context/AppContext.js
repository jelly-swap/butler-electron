import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useEventDispatch } from './EventContext';

import { BUTLER_EVENTS } from '../constants';

import { receiveAllFromMain, sendFromRenderer } from '../utils/electronAPI';

const UPDATE = 'UPDATE';
const TOGGLE_SECRET = 'TOGGLE_SECRET';

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
        updatedState.fileSaved = false;
      } else if (payload.msg === 'FILE_SAVED') {
        updatedState.fileSaved = true;
      }

      return updatedState;
    }

    case TOGGLE_SECRET: {
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
      update(data);
    });

    receiveAllFromMain(BUTLER_EVENTS.STOPPED, () => {
      dispatchEvent(BUTLER_EVENTS.STOPPED);
    });

    receiveAllFromMain(BUTLER_EVENTS.SAVED, () => {
      update({ msg: 'FILE_SAVED' });
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
      dispatch({ type: TOGGLE_SECRET });
    }, 60000);
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
