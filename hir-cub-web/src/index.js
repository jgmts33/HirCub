import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import { StateProvider } from './appState';
import App from '~/components/app';
import 'react-day-picker/lib/style.css';
import 'rc-time-picker/assets/index.css';
import 'react-toastify/dist/ReactToastify.css';
import '~/assets/css/normalize.css';
import '~/assets/css/global.css';
import '~/assets/css/responsive.css';
import '~/assets/css/fontawesome.css';
import '~/assets/css/lib-style.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

Modal.setAppElement('#root');

const authToken = localStorage.getItem('authToken');

ReactDOM.render(
  <AppContainer>
    <Router>
      <StateProvider authToken={authToken}>
        <App />
      </StateProvider>
    </Router>
  </AppContainer>,
  document.getElementById('root')
);
