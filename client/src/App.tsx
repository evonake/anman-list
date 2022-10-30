import React, { useEffect } from 'react';
import Cookie from 'js-cookie';
// import { isMobile } from 'react-device-detect';

import { useAppDispatch } from './redux/hooks';
import { userLogin } from './redux/constants/actionCreators/selfActions';

import Mobile from './layouts/Mobile';
import Desktop from './layouts/Desktop';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    Cookie.set('connect.sid', 'ping');
    if (Cookie.get('connect.sid') !== 'ping') {
      dispatch(userLogin('', ''));
    }
  }, []);

  return (
    <section className="app">
      {false ? <Mobile /> : <Desktop />}
    </section>
  );
}

export default App;
