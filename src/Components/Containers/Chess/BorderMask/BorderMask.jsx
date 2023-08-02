import ChessBorder from "../ChessBorder/ChessBorder";
import React from "react";
import classes from "./BorderMask.module.css";
export default function BorderMask({ size }) {
  return (
    <div className={classes.mask}>
      <ChessBorder isShow={false} size={size} />
    </div>
  );
}
