import React, { useEffect } from 'react';
// import { isMobile } from 'react-device-detect';

import { useAppDispatch } from './redux/hooks';
import { userAuth } from './redux/constants/actionCreators/userActions';

import Mobile from './layouts/Mobile';
import Desktop from './layouts/Desktop';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userAuth());
  }, []);

  return (
    <section className="app">
      {false ? <Mobile /> : <Desktop />}
    </section>
  );
}

export default App;
