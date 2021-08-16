import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Shop from './pages/Shop';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Shop} />
    </BrowserRouter>
  );
}

export default Routes;
