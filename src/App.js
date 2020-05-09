import React, { useState } from "react";
import Search from 'react-searchbar-awesome'
import Info from "./components/Info";
import Github from "./components/Github";
import { states } from './states.data' // example data. USA states.
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory()
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
    in our example we go to a route.
    the route is taken from dataset property of the element.
    this is possible because the entire object was stored in dataset.
  */
  const enterHandler = (e) => {
    const searchitem = JSON.parse(e.target.dataset.searchitem)
    history.push(searchitem.name)
  }

  // same as above 
  const clickHandler = (e) => {
    const searchitem = JSON.parse(e.target.dataset.searchitem)
    history.push(searchitem.name)
  }

  // what to happen when escape is pressed. in our example - nothing.
  const escHandler = (e) => {
    console.log('Escape pressed')
  }

  const clickOutsideHandler = (e) => {
    if (!e.target.closest(".ReactSearchbarAwesome")) {
      setFiltered([])
    }
  }

  // the style defined here is passed to child elements, that inherit some styles like font size, color, line-height...
  const style = {
    width: "calc(80% + (100vw - 100%))",
    color: "#333",               // children inherit
    backgroundColor: "white",    // children inherit
    fontSize: "2.5rem",          // children inherit
    position: "absolute",
    top: "3rem",

    // rounded corners example. 
    // borderRadius: "15px",
    // backgroundColor: "rgba(250,250,250,0.2)",    // children inherit
    boxShadow: "0 0 28px 2px rgba(0,0,0,0.1)",
    border: "none",
    overflow: "hidden",
  }

  const auxStyle = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "10rem"
  }

  const gradient = {
    // backgroundImage: "linear-gradient(319deg, #bbff99 0%, #ffec99 37%, #ff9999 100%)",
    // backgroundColor: "rgba(255,230,230,.3)",
    backgroundColor: "pink",
  }

  return (
    <div 
      className={"App"}
      onClick={clickOutsideHandler}
    >
      <div
        style={auxStyle}>
        <Search
          data={filtered} // array of the objects is passed. each object is saved in dataset of the correspondent element.
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
      <Info />
      <Github/>
    </div>
  )
}

export default App;
