import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//npm i react-dom react-router-dom
import { BrowserRouter } from "react-router-dom";
//npm i react-bootstrap bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//npm i @tanstack/react-query
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
//npm i @tanstack/react-query-devtools

//npm i axios


const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

