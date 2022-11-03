import React, { useEffect, useState } from 'react';

import {
  Tab,
  Tabs,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { itemGetThunk, selectItemsLists } from '../redux/features/itemListsSlice';

import type { TypeDBItem } from '../types/item';

import ItemList from '../components/ItemList';
import AddItem from '../components/AddFab';

import '../styles/views/home.css';
import LogoutButton from '../components/LogoutButton';

function Home() {
  const dispatch = useAppDispatch();

  const itemLists = useAppSelector(selectItemsLists);

  const [currentListIndex, setCurrentListIndex] = useState(0);

  const handleTabChange = (n: number) => {
    setCurrentListIndex(n);
  };

  useEffect(() => {
    dispatch(itemGetThunk());
  }, []);

  // TODO: Add a loading spinner (many places)
  // TODO: Add a card to edit item list settings (name, trackers)
  return (
    <div id="home">
      <h1>Home</h1>
      <LogoutButton />
      <Tabs
        value={currentListIndex}
        onChange={(e, n) => handleTabChange(n)}
      >
        {itemLists.map((list, i) => (
          <Tab label={list.name} value={i} />
        ))}
      </Tabs>

      {itemLists.map((list, i) => (
        <TabPanel key={list._id} id={list._id} show={i === currentListIndex}>
          <ItemList itemList={list} />
          <AddItem listId={list._id} />
        </TabPanel>
      ))}
    </div>
  );
}

type TabPanelProps = React.PropsWithChildren & {
  show: boolean;
  id: TypeDBItem['_id'];
};
function TabPanel({ show, id, ...props }: TabPanelProps) {
  const { children } = props;

  return (
    <div
      role="tabpanel"
      hidden={show}
      id={`simple-tabpanel-${id}`}
      aria-labelledby={`simple-tab-${id}`}
    >
      {children}
    </div>
  );
}

export default Home;
