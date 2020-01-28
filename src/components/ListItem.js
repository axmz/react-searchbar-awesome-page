import React from "react";

const ListItem = ({tabIndex, item }) => {
  return <li tabIndex={tabIndex} className='list-item'>{item}</li>;
};

export default ListItem;
