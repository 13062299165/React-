import { memo } from "react";
import React from "react";
import classes from "./ChessPiece.module.css";
export default memo(function ChessPiece({ type = "" }) {
  return (
    <div className={classes.pieceBox}>
      {
         // TODO: 精简一下 尽量不使用两层三元
        type && <div className={classes[`${type}Piece`]}></div>
      }
    </div>
  );
});
