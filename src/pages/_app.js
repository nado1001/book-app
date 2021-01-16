import React from "react";
import { Provider } from "react-redux";
import createStore from "../redux/store/store";
import "../styles/globals.css";

// const history = History.createBrowserHistory();
export const store = createStore();

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
