import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from 'react-moralis';

const moralisServerUrl  = process.env.REACT_APP_SERVER_URL as string;
const moralisAppId = process.env.REACT_APP_APP_ID as string;
ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={moralisAppId} serverUrl={moralisServerUrl}>
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
