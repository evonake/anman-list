import React, { useEffect } from 'react';
// import { isMobile } from 'react-device-detect';

import { useAppDispatch } from './redux/hooks';
import { authThunk } from './redux/features/userSlice';

import Mobile from './layouts/Mobile';
import Desktop from './layouts/Desktop';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authThunk());
  }, []);

  return (
    <section className="app">
      {false ? <Mobile /> : <Desktop />}
    </section>
  );
}

export default App;
