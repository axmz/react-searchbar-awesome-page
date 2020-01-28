import React from "react";
import ListItem from './ListItem'

const List = ({ items }) => {
  return (
      <ul className='list'>
        {items.map(( item,i ) => (
          <ListItem tabIndex={i+2} key={i} item={item} />
        ))}
      </ul>
  );
};

export default List;
