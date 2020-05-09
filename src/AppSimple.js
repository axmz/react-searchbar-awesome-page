import React, { useState } from "react";
import Search from 'react-searchbox-awesome'

/*
example data. USA states.
the componenet requires an array of object with a property "title".
  []{title: string}
*/
import { states } from './states.data'

function App() {
  const [filtered, setFiltered] = useState([])

  // here the data is filtered as you search
  const inputHandler = (e) => {
    const input = e.target.value.toLowerCase()
    if (input.length === 0) {
      setFiltered([])
    } else {
      const result = states.filter(obj => {
        return obj.name.toLowerCase().includes(input);
      })
      setFiltered(result)
    }
  }

  /*
    here you define what happens when you press enter. 
    note that the data that is passed to list element, is stored in the data-set attribute.
  */
  const enterHandler = (e) => {
    const searchitem = JSON.parse(e.target.dataset.searchitem)
    console.log('Enter pressed', searchitem)
  }

  // same as above 
  const clickHandler = (e) => {
    const searchitem = JSON.parse(e.target.dataset.searchitem)
    console.log('Click click!', searchitem)
  }

  // what to happen when escape is pressed. in our example - nothing.
  const escHandler = (e) => {
    console.log('Escape pressed')
  }

  // this is to close the searchlist when you click outside of it.
  const clickOutsideHandler = (e) => {
    if (!e.target.closest(".ReactSearchboxAwesome")) {
      setFiltered([])
    }
  }

  useEffect(() => {
    document.addEventListener('click', clickOutsideHandler)
    return () => document.removeEventListener('click', clickOutsideHandler)
  },[])

  /* the style defined here is passed to child elements
  note: children inherit some styles like font size, color, line-height...
  there are some default styles as well.
  */
  const style = {
    width: "calc(80% + (100vw - 100%))",
    color: "#333",               // children inherit
    backgroundColor: "white",    // children inherit
    fontSize: "2.5rem",          // children inherit
    position: "absolute",
    top: "3rem",
    boxShadow: "0 0 28px 2px rgba(0,0,0,0.1)",
    border: "none",
    overflow: "hidden",
  }

  // thats the style for the active element (hover, focus)
  const gradient = {
    backgroundImage: "linear-gradient(319deg, #bbff99 0%, #ffec99 37%, #ff9999 100%)",
  }

  return (
    <div
      className={"App"}
    >
      <Search
        data={filtered} // array of the objects is passed. []{title: string}. each object is saved in dataset of the correspondent element.
        mapping={{ title: "name" }} // allows to map the title of search item and the name property in the filtered data.
        style={style} // child elements inherit some styles.
        activeStyle={gradient} // hover, focus, active color.
        placeholder={"Search for states..."} // input placeholder.
        shortcuts={true} // hide or show span elements that display shortcuts.
        onEnter={enterHandler} // applies only to the list "li" element
        onInput={inputHandler}
        onClick={clickHandler} // applies only to the list "li" element
        onEsc={escHandler} // applies to the entire component
      />
    </div>
  )
}

export default App;
