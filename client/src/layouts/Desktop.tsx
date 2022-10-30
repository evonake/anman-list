import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { errorReset } from '../redux/constants/actionCreators/errorActions';
import { selectIsLoggedIn } from '../redux/features/userSlice';

import Login from '../views/Login';
import Register from '../views/Register';
import Home from '../views/Home';

function Desktop() {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [view, sView] = useState('login');

  const setView = (v: string) => {
    sView(v);
    dispatch(errorReset());
  };

  useEffect(() => {
    if (isLoggedIn) {
      setView('home');
    } else {
      setView('login');
    }
  }, [isLoggedIn]);

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
