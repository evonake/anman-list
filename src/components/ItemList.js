import React from 'react';

import './ItemList.css';

import Item from './Item';

class ItemList extends React.Component {
  render() {
    return (
      <div className='ItemList'>
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    );
  }
}

export default ItemList;
