import React, { useState } from 'react';

import {
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import type TypeItem from '../types/item';

import ItemModal from './ItemModal';

import '../styles/components/add.css';

// TODO: use EditItem.tsx to create AddItem.tsx, passing in initialInput as prop
//       AddItem.tsx should include the fixed FAB
//       EditItem.tsx modal should not be open when AddItem.tsx is open (only 1 modal)

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

  const myClose = () => {
    console.log(initialInput);
    setOpen(false);
  };

  return (
    <div className="add-item">
      <Fab className="fab" onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>

      <ItemModal
        resetOnSubmit
        open={open}
        close={myClose}
        item={initialInput}
      />
    </div>
  );
}

export default AddItem;
