import React, { createContext, useContext } from 'react';

const FormContext = createContext();

function FormContextProvider({ children, ...rest }) {
  return <FormContext.Provider value={rest}>{children}</FormContext.Provider>;
}

const useFormState = () => useContext(FormContext);

export default useFormState;
export { FormContext, FormContextProvider };
