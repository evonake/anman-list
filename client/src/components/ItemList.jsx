import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Item from './Item';
// import AddItem from './AddItem';

function ItemList({ type, status, toggleSnackbar }) {
  const data = useSelector((state) => state[type][status]);
  const dispatch = useDispatch();

  // if (!data) {
  //   return (
  //     <div className="ItemList">
  //       <AddItem
  //         type={type}
  //       />
  //     </div>
  //   );
  // }

  return (
    <div className="ItemList">
      {/* <AddItem
        type={type}
        status={status}
      /> */}
      {data.map((a) => (
        <Item
          key={a._id}
          data={a}
          type={type}
          status={status}
          toggleSnackbar={toggleSnackbar}
        />
      ))}
    </div>
  );
}

export default ItemList;
