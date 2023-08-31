import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/UseSearch";
import {Provider} from 'react-redux'
import store from './Store' 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
      <Provider store={store}>
  <AuthProvider>
    <SearchProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </SearchProvider>
  </AuthProvider>
      </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
