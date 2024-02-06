import { useState, useEffect } from 'react';

const useRequest = (request, callback) => {
  const [errors, setErrors] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (data) {
      setErrors(null);
      request(...data)
        .then(res => {
          if (callback) {
            callback(res, ...data);
          }
        })
        .catch(errors => {
          setErrors(errors);
        })
        .finally(() => {
          setData(null);
        });
    }
    // eslint-disable-next-line
  }, [data]);
  function sendRequest(...args) {
    setData(args);
  }
  return { errors, sendRequest };
};

export default useRequest;
