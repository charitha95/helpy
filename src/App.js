import React from 'react';
import './styles/main.scss';
import { BrowserRouter } from 'react-router-dom';
import AuthRouter from './components/AuthRouter/AuthRouter';

function App() {
  return (
    <BrowserRouter>
      <AuthRouter />
    </BrowserRouter>
  );
}

export default App;
