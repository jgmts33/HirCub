const NODE_ENV = process.env.NODE_ENV;
let APP_CONFIG;

if (NODE_ENV === 'development') {
  APP_CONFIG = {
    isProd: false,
    apiBaseUrl: 'https://carehub1.venuiti.com/api',
  };
} else if (NODE_ENV === 'production') {
  APP_CONFIG = {
    isProd: true,
    apiBaseUrl: '/api',
  };
}

export default APP_CONFIG;
