import React, { useRef, useState, useEffect } from "react";
import { data } from "./data";
import List from "./List";
import "normalize.css";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [filtered, filter] = useState([]);
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  });

  useEffect(() => {
    if (input.length === 0) {
      filter([]);
    } else {
      filter(
        data.filter(el => {
          return el.toString().includes(input.toString());
        })
      );
    }
  }, [input]);

  return (
    <div className="App">
      <input
        tabIndex={1}
        ref={ref}
        onInput={e => setInput(e.target.value)}
        type="text"
        placeholder="Seach"
        className="input"
      ></input>
      {filtered.length > 0 ? <List items={filtered} /> : <></>}
    </div>
  );
}

export default App;
