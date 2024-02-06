import { useState, useEffect } from 'react';

const useFetchOnce = (request, callback) => {
  const [errors, setErrors] = useState(null);
  useEffect(() => {
    setErrors(null);
    request && request()
      .then(res => {
        if (callback) {
          callback(res);
        }
      })
      .catch(errors => {
        setErrors(errors);
      });
    // eslint-disable-next-line
  }, []);
  return [errors];
};

export default useFetchOnce;
