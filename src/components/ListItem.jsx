import React from "react";

const ListItem = ({tabIndex, item }) => {
  return <li tabIndex={tabIndex} className='ListItem'>{item}</li>;
};

export default ListItem;
