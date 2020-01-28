import React, { useRef, useState, useEffect } from "react";
import Hotkeys from "react-hot-keys";
import { data } from "../data";
import List from "./List";
import "normalize.css";
import "./styles.css";

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
    if (nextTabIndex > filtered.length + 1 ) {
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
  }

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
      <Hotkeys
        filter={e => {
          if (
            ((e.key === "j" && e.ctrlKey !== true) ||
              (e.key === "k" && e.ctrlKey !== true)) &&
            e.target.nodeName === "INPUT"
          ) {
            return false;
          }
          return true;
        }}
        allowRepeat={true}
        keyName="ctrl+j,ctrl+k"
        onKeyDown={onKeyDown}
      >
        <input
          tabIndex={1}
          ref={ref}
          onInput={e => setInput(e.target.value)}
          type="text"
          placeholder="Seach"
          className="input"
        ></input>
        {filtered.length > 0 ? <List items={filtered} /> : <></>}
      </Hotkeys>
    </div>
  );
};

export default Search;
