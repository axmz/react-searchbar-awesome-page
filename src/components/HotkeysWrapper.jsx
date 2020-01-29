import React from "react";
import Hotkeys from "react-hot-keys";

// // moves focus to prev or next tabindex
// const tab = (e, step) => {
//   e.preventDefault();
//   let nextTabIndex = tabIndex + step;
//   if (nextTabIndex > filtered.length + 1) {
//     if (e.repeat) {
//       return;
//     }
//     nextTabIndex = 1;
//   } else if (nextTabIndex < 1) {
//     if (e.repeat) {
//       return;
//     }
//     nextTabIndex = filtered.length + 1;
//   }
//   const nextElement = document.querySelector(`[tabIndex="${nextTabIndex}"]`);
//   nextElement.focus();
// };

// // Hotkeys onKeyDown handler
// const onKeyDown = (keyName, e, handle) => {
//   if (keyName === "ctrl+j") {
//     tab(e, 1);
//   }
//   if (keyName === "ctrl+k") {
//     tab(e, -1);
//   }
// };

const HotkeysWrapper = ({ children, onKeyDown }) => {
  return (
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
      {children}
    </Hotkeys>
  );
};

export default HotkeysWrapper;
