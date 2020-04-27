import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <div className="input-group">
      <input
        ref={ref}
        {...props}
        tabIndex={1}
        type="text"
        placeholder="Seach (numbers only)"
        className="Input"
      />
      <span className="input-span">CtrlJ / CtrlK</span>
    </div>
  );
});

export default Input;
