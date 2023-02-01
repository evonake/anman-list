import React, { useEffect, useState, useRef } from 'react';

import {
  Tab,
  Tabs,
  CircularProgress,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { itemGetThunk, selectItemsLists, selectItemsListsReqStatus } from '../redux/features/itemListsSlice';

import ItemList from '../components/ItemList';
import AddItem from '../components/AddFab';

import '../styles/views/home.css';
import LogoutButton from '../components/LogoutButton';

function Home() {
  const dispatch = useAppDispatch();

  const itemLists = useAppSelector(selectItemsLists);
  const reqStatus = useAppSelector(selectItemsListsReqStatus);

  const [currentListIndex, setCurrentListIndex] = useState(0);

  const prevListCount = useRef(itemLists.length);

  const handleTabChange = (n: number) => {
    setCurrentListIndex(n);
  };

  useEffect(() => {
    dispatch(itemGetThunk());
  }, []);

  useEffect(() => {
    if (currentListIndex !== 0 && currentListIndex > itemLists.length - 1) {
      setCurrentListIndex(itemLists.length - 1);
    }

    if (prevListCount.current < itemLists.length) {
      setCurrentListIndex(itemLists.length - 1);
    }

    prevListCount.current = itemLists.length;
  }, [itemLists]);

  // TODO: Add a loading spinner (many places)
  return (
    <div id="home">
      <h1>Home</h1>
      <LogoutButton />
      <Tabs
        value={currentListIndex}
        onChange={(e, n) => handleTabChange(n)}
      >
        {itemLists.map((list, i) => (
          <Tab key={list._id} label={list.name} value={i} />
        ))}
      </Tabs>

      {reqStatus !== 'fulfilled' ? (
        <div className="fill-height" id="spinner">
          <CircularProgress />
        </div>
      ) : (
        <>
          <ItemList listId={itemLists[currentListIndex]._id} />
          <AddItem listId={itemLists[currentListIndex]._id} />
        </>
      )}
    </div>
  );
}

export default Home;
