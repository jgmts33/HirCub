import React, { createContext, useReducer, useContext } from 'react';
import rootReducer from './reducers';
import { setAuthenticated } from '~/actions/account';

const StateContext = createContext();
const DispatchContext = createContext();

function StateProvider({ children, authToken }) {
  const state = authToken
    ? rootReducer({}, setAuthenticated(authToken))
    : rootReducer({}, {});
  const [currentState, dispatch] = useReducer(rootReducer, state);
  return (
    <StateContext.Provider value={currentState}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
const useAppState = () => useContext(StateContext);
const useAppDispatch = () => useContext(DispatchContext);

export default useAppState;
export { useAppDispatch, StateContext, DispatchContext, StateProvider };
