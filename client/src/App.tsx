import React from 'react';

import { useAppDispatch } from './redux/hooks';

import { itemGet } from './redux/constants/actionCreators/itemActions';
import { userLogin } from './redux/constants/actionCreators/userActions';

function App() {
  const dispatch = useAppDispatch();

  return (
    <section className="App">
      <h1>Anman List</h1>
      <button type="button" onClick={() => dispatch(userLogin('george', 'password'))}>Login</button>
      <button type="button" onClick={() => dispatch(itemGet())}>Get Items</button>
    </section>
  );
}

export default App;
