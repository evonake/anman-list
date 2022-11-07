import React, { useEffect, useState } from 'react';

import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

import type { TypeItem, TypeItemList, TypeDBItemList } from '../types/item';

import ItemModal from './ItemModal';
import ItemListModal from './ItemListModal';

import '../styles/components/add.css';

const defaultInitialItem: TypeItem = {
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

function AddFab({ itemList }: { itemList: TypeDBItemList }) {
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [itemListModalOpen, setItemListModalOpen] = useState(false);

  const [initialItem, setInitialItem] = useState<TypeItem>({
    ...defaultInitialItem,
    listId: itemList._id,
    trackers: itemList.trackerNames.map((name) => ({ name, value: 0 })),
  });

  useEffect(() => {
    setInitialItem({
      ...initialItem,
      listId: itemList._id,
      trackers: itemList.trackerNames.map((name) => ({ name, value: 0 })),
    });
  }, [itemList]);

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
        item={initialItem}
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
