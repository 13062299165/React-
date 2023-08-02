import classes from "./ChessArea.module.css";
import ChessBorder from "../ChessBorder/ChessBorder";
import BorderMask from "../BorderMask/BorderMask";
import React from "react";
import useStore from "../../../../store/store";
export default function ChessArea() {
  let pointSize = useStore((state) => state.pointSize);
  return (
    <div className={classes.chessArea}>
      {/* 格子数比路数少1 */}
      <ChessBorder size={pointSize - 1}></ChessBorder>
      {/* 遮罩层 */}
      <BorderMask size={pointSize}></BorderMask>
    </div>
  );
}
