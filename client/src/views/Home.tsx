import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { itemGetThunk, selectItemsLists } from '../redux/features/itemListsSlice';

import ItemList from '../components/ItemList';
import AddItem from '../components/AddFab';

import '../styles/views/home.css';
import LogoutButton from '../components/LogoutButton';

function Home() {
  const dispatch = useAppDispatch();

  const itemLists = useAppSelector(selectItemsLists);

  useEffect(() => {
    dispatch(itemGetThunk());
  }, []);

  // TODO: Add a loading spinner (many places)
  return (
    <div id="home">
      <h1>Home</h1>
      <LogoutButton />
      {itemLists.map((list) => (
        <div key={list._id}>
          <ItemList itemList={list} />
          <AddItem listId={list._id} />
        </div>
      ))}
    </div>
  );
}

export default Home;
