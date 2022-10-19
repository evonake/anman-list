import React, { useState } from 'react';

import Login from '../views/Login';
import Register from '../views/Register';
import Home from '../views/Home';

function Desktop() {
  const [view, setView] = useState('login');

  const views: { [key: string]: JSX.Element } = {
    login: <Login setView={setView} />,
    register: <Register setView={setView} />,
    home: <Home />,
  };
  return (
    <div id="desktop">
      {views[view]}
    </div>
  );
}

export default Desktop;
