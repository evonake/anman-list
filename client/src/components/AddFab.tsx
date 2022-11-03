import React, { useState } from 'react';

import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

import type { TypeItem, TypeItemList } from '../types/item';

import ItemModal from './ItemModal';
import ItemListModal from './ItemListModal';

import '../styles/components/add.css';

const initialItemInput: TypeItem = {
  title: '',
  link: '',
  status: 'ongoing',
  trackers: [{
    name: 'Page',
    value: 0,
  }],
  listId: '',
};
const initialItemListInput: TypeItemList = {
  name: '',
  trackerNames: ['Page'],
};

function AddFab({ listId }: { listId: string }) {
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [itemListModalOpen, setItemListModalOpen] = useState(false);

  return (
    <div className="add-item">
      <SpeedDial
        ariaLabel="add"
        className="fab"
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<BookmarkIcon />}
          tooltipTitle="Add Item"
          onClick={() => setItemModalOpen(true)}
        />
        <SpeedDialAction
          icon={<CollectionsBookmarkIcon />}
          tooltipTitle="Add Item List"
          onClick={() => setItemListModalOpen(true)}
        />
      </SpeedDial>

      <ItemModal
        add
        open={itemModalOpen}
        close={() => setItemModalOpen(false)}
        item={{ ...initialItemInput, listId }}
      />

      <ItemListModal
        add
        open={itemListModalOpen}
        close={() => setItemListModalOpen(false)}
        itemList={initialItemListInput}
      />
    </div>
  );
}

export default AddFab;
