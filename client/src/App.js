import React from 'react';
import axios from 'axios'
import './App.css';
import Router from './components/layouts/router/Router';
import AppContext from './utils/context/AppContext';

axios.defaults.baseURL = "http://localhost:2727/api/"


function App() {
  return (
    <AppContext>
      <Router />
    </AppContext>
  );
}

export default App;
