import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { itemGetThunk, selectItemsLists } from '../redux/features/itemsListSlice';

import ItemList from '../components/ItemList';
import AddItem from '../components/AddItem';

import '../styles/views/home.css';
import LogoutButton from '../components/LogoutButton';

function Home() {
  const dispatch = useAppDispatch();

  const itemLists = useAppSelector(selectItemsLists);

  useEffect(() => {
    dispatch(itemGetThunk());
  }, []);

  return (
    <div id="home">
      <h1>Home</h1>
      <LogoutButton />
      {itemLists.map((list) => (
        <ItemList key={list._id} itemList={list} />
      ))}
      <AddItem />
    </div>
  );
}

export default Home;
