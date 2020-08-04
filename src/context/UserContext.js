import React, { createContext, useContext, useReducer, useCallback } from 'react';

const USER_ACTION_TYPES = {
  UPDATE_USER: 'UPDATE_USER',
};

const UserStateContext = createContext();
const UserDispatchContext = createContext();

const useUserStateContext = () => useContext(UserStateContext);
const useUserDispatchContext = () => useContext(UserDispatchContext);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case USER_ACTION_TYPES.UPDATE_USER:
      return {
        ...state,
        user: { ...payload },
      };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: {},
  });

  const updateUser = useCallback(user => {
    dispatch({ type: USER_ACTION_TYPES.UPDATE_USER, payload: user });
  }, []);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={updateUser}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUser = () => {
  const state = useUserStateContext();
  return state.user;
};

export const useUpdateUser = () => {
  const dispatch = useUserDispatchContext();
  return dispatch;
};
