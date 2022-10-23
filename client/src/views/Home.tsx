import React, { useEffect } from 'react';

import { useAppDispatch } from '../redux/hooks';
import { itemGet } from '../redux/constants/actionCreators/itemActions';

import ItemList from '../components/ItemList';
import AddItem from '../components/AddItem';

import '../styles/views/home.css';

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(itemGet());
  }, []);

  return (
    <div id="home">
      <h1>Home</h1>
      <ItemList />
      <AddItem />
    </div>
  );
}

export default Home;
