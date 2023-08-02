import React from "react";
import classes from "./Button.module.css";
export default function Button({ text, background, color, handleClick }) {
  return (
    // TODO:不加div对页面也没有影响
    <>
      <button
        style={{ backgroundColor: background, color: color }}
        className={classes.button}
        onClick={handleClick}
      >
        {text}
      </button>
    </>
  );
}
