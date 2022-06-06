import React, { useState, useEffect } from 'react';
import isEqual from 'lodash.isequal';

import { getUserData } from '../server';
import Item from './Item';
import AddItem from './AddItem';


function ItemList(props) {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const a = async () => {
      const newData = await getUserData(props.username, props.type, props.status)
      if (!isEqual(data, newData)) {
        setData(newData);
      }
    };
    a();
  });

  if (!data) {
    return (
      <div className='ItemList'>
        <AddItem
          type={props.type} />
      </div>
    );
  }

  let items = [];
  for (const [, value] of Object.entries(data)) {
    items.push({ title: value.title, season: value.season, episode: value.episode, chapter: value.chapter, link: value.link });
  }

  return (
    <div className='ItemList'>
      <AddItem
        username={props.username}
        type={props.type}
        status={props.status}
        refresh={props.refresh} />
      {items.map(a => {
        return <Item
          username={props.username}
          key={a.title}
          data={a}
          type={props.type}
          status={props.status}
          toggleSnackbar={props.toggleSnackbar} />
      })}
    </div>
  );
}

export default ItemList;
