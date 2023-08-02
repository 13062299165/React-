import React, { useCallback, useMemo } from "react";
import ChessCube from "../ChessCube/ChessCube";
import classes from "./ChessBorder.module.css";
export default function ChessBorder({ size, isShow }) {
  //不同尺寸的棋盘距离边界的格子数不同
  let chessborder = useMemo(() => {
    return new Array(size * size).fill(0);
  }, [size]);
  let isStar = useCallback(
    (index) => {
      //心点在四路位置，格子数就为3，下标为2
      //这几个位置左下角需要设置星点
      let padding = 3; //数组下标从零开始，这里需要减一
      let x = Math.floor(index / size),
        y = index % size;
      if (
        (x === padding - 1 && y === padding - 1) ||
        (x === padding - 1 && y === size - padding - 1) ||
        (x === size - padding - 1 && y === padding - 1) ||
        (x === size - padding - 1 && y === size - padding - 1) ||
        (x === (size - 2) / 2 && y === (size - 2) / 2)
      )
        return true;
      else return false;
    },
    [size]
  );
  return (
    <div>
      <ul
        className={classes.chessborder}
        style={{ width: `${size}rem`, height: `${size}rem` }}
      >
        {chessborder.map((item, index) => (
          <ChessCube
            isStar={isStar}
            key={index}
            index={index}
            isShow={isShow}
          />
        ))}
      </ul>
    </div>
  );
}
