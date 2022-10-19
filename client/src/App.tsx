import React from 'react';
// import { isMobile } from 'react-device-detect';

import Mobile from './layouts/Mobile';
import Desktop from './layouts/Desktop';

function App() {
  return (
    <section className="app">
      {false ? <Mobile /> : <Desktop />}
    </section>
  );
}

export default App;
