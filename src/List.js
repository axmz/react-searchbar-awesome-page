import React from "react";

const ListItem = ({tabIndex, item }) => {
  return <li tabIndex={tabIndex} className='list-item'>{item}</li>;
};

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
