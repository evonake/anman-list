import React, { useEffect } from 'react';

import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useAppDispatch } from '../redux/hooks';
import { itemGet } from '../redux/constants/actionCreators/itemActions';

import ItemList from '../components/ItemList';

import '../styles/views/home.css';

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(itemGet());
  }, []);

  return (
    <div>
      <div id="home">
        <h1>Home</h1>
        <ItemList />
      </div>
      <Fab className="add-fab">
        <AddIcon />
      </Fab>
    </div>
  );
}

export default Home;
