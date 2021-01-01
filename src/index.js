import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import configureStore from './store/store';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { checkLoggedIn } from "../src/util/session";

const renderApp = preloadedState => {
  const store = configureStore(preloadedState);
  // FOR TESTING, remove before production
  window.getState = store.getState;
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
};
(async () => renderApp(await checkLoggedIn()))();


