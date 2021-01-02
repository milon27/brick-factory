import React from 'react';

import './App.css';
import Router from './components/layouts/router/Router';
import AppContext from './utils/context/AppContext';
function App() {
  return (
    <AppContext>
      <Router />
    </AppContext>
  );
}

export default App;
