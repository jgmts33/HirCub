import 'whatwg-fetch';
import { LOG } from '~/consts/global';

const isAuthenticated = () => localStorage.getItem('authToken');
const getAuthHeader = () => {
  let authToken = localStorage.getItem('authToken');
  return authToken ? { Authorization: 'Bearer ' + authToken } : {};
};
const getOptions = options => ({
  ...options,
  headers: isAuthenticated
    ? {
        'Access-Control-Allow-Origin': '*',
        credentials: 'include',
        ...options.headers,
        ...getAuthHeader(),
      }
    : {
        'Access-Control-Allow-Origin': '*',
        credentials: 'include',
        ...options.headers,
      },
});

export const fetchDataWithoutAuthorization = (url, opts) => {
  return fetch(url, opts)
    .catch((error) => {
      LOG('<<< fetchAuth: ' + url + ' | ' + opts['method']);
      LOG('<<<error: ');
      LOG(error);
      return Promise.reject(['error']);
    })
    .then(response => {
      LOG('<<< fetchAuth: ' + url + ' | ' + opts['method']);
      if (!response || (response.status >= 200 && response.status < 300)) {
        return Promise.resolve(response);
      } else {
        LOG('<<<error'); 
        return Promise.reject(['error']);
      }
    })
    .then(response => (response ? response.json() : null))
    .then(json => {
      if (json.errors) {
        const error =
          json.errors && json.errors.length > 0 ? json.errors : ['error'];
        LOG('<<<json parse error:');
        LOG(error);
        return Promise.reject(error);
      }
      LOG('<<< success:');
      LOG(json.returned);
      return Promise.resolve(json);
    });
};

export default (url, opts) => {
  const options = getOptions(opts);
  LOG('=== fetch: ' + url + ' | ' + opts['method']);
  if (opts['body']) {
    LOG(opts['body']);
  }
  return fetch(url, options)
    .catch((error) => {
      LOG('<<< fetch: ' + url + ' | ' + opts['method']);
      LOG('<<<error: ');
      LOG(error);
      return Promise.reject(['error']);
    })
    .then(response => {
      LOG('<<< fetch: ' + url + ' | ' + opts['method']);
      if (!response || (response.status >= 200 && response.status < 300)) {
        return Promise.resolve(response);
      } else {
        LOG('<<<error'); 
        return Promise.reject(['error']);
      }
    })
    .then(response => (response ? response.json() : null))
    .then(json => {
      if (json.errors) {
        const error =
          json.errors && json.errors.length > 0 ? json.errors : ['error'];
        LOG('<<<json parse error:');
        LOG(error);
        return Promise.reject(error);
      }
      LOG('<<< success:');
      LOG(json.returned);
      return Promise.resolve(json.returned);
    });
};
