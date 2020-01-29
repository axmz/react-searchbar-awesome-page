import React, { useRef, useState, useEffect } from "react";
import { data } from "../data";
import "normalize.css";
import "./styles.css";
import List from "./List";
import Input from "./Input";
import HotkeysWrapper from "./HotkeysWrapper";

const Search = () => {
  const ref = useRef();
  const app = document.querySelector(".Search"); // where to look for tabbable
  const [input, setInput] = useState("");
  const [filtered, filter] = useState([]);
  const [tabIndex, setTabIndex] = useState(1);

  // focuses on input field
  useEffect(() => {
    ref.current.focus();
  }, [ref]);

  // focus handler for addEventListener
  const focusHandler = e => {
    setTabIndex(e.target.tabIndex);
  };

  // attaches 'focus' eventlistener to the entire component
  useEffect(() => {
    if (app) {
      app.addEventListener("focusin", focusHandler);
      return () => {
        app.removeEventListener("focusin", focusHandler);
      };
    }
  }, [app, focusHandler]);

  // filters search data
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

  // moves focus to prev or next tabindex
  const tab = (e, step) => {
    e.preventDefault();
    let nextTabIndex = tabIndex + step;
    if (nextTabIndex > filtered.length + 1) {
      if (e.repeat) {
        return;
      }
      nextTabIndex = 1;
    } else if (nextTabIndex < 1) {
      if (e.repeat) {
        return;
      }
      nextTabIndex = filtered.length + 1;
    }
    const nextElement = document.querySelector(`[tabIndex="${nextTabIndex}"]`);
    nextElement.focus();
  };

  // Hotkeys onKeyDown handler
  const onKeyDown = (keyName, e, handle) => {
    if (keyName === "ctrl+j") {
      tab(e, 1);
    }
    if (keyName === "ctrl+k") {
      tab(e, -1);
    }
  };

  return (
    <div className="Search">
      <div className="info">
        <p>Searchbar navigable with Ctrl+J and Ctrl+K.</p> 
        <p>Stops at the edges if the shortcuts are repeated (press and hold).</p>
        <p>Starts over if the shortcuts are not repeated.</p>
      </div>
      <HotkeysWrapper onKeyDown={onKeyDown}>
        <Input ref={ref} onInput={e => setInput(e.target.value)} />
        {filtered.length > 0 ? <List items={filtered} /> : <></>}
      </HotkeysWrapper>
    </div>
  );
};

export default Search;
