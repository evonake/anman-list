import React, { useState } from 'react';

import {
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import type TypeItem from '../types/item';

import ItemModal from './ItemModal';

import '../styles/components/add.css';

const initialInput: TypeItem = {
  title: '',
  link: '',
  status: 'ongoing',
  trackers: [{
    name: 'Page',
    value: 0,
  }],
};

function AddItem() {
  const [open, setOpen] = useState(false);

  return (
    <div className="add-item">
      <Fab className="fab" onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>

      <ItemModal
        add
        open={open}
        close={() => setOpen(false)}
        item={initialInput}
      />
    </div>
  );
}

export default AddItem;
