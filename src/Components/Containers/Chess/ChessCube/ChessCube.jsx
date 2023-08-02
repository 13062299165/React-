import classes from "./ChessCube.module.css";
import ChessPiece from "../ChessPiece/ChessPiece";
import React, { useMemo } from "react";
import useStore from "../../../../store/store";

export default function ChessCube({ index, isStar, isShow = true }) {
  // TODO: 没变化的使用const
  const game = useStore((state) => state.game);
  const pointSize = useStore((state) => state.pointSize);
  const putchess = useStore((state) => state.putchess);
  const colormap=useMemo(()=>{
    let map=new Map();
    map.set(-1,"white")
    map.set(1,"black")
    return map;
  },[])
  // TODO:可以使用useMemo包裹 防止每次渲染重新计算
  let x = useMemo(()=>Math.floor(index / pointSize),[index,pointSize]) ,
    y = useMemo(()=>Math.floor(index % pointSize),[index,pointSize])
  //棋子放置
  function chessPut() {
    //putchess传入点位置，以0开始
    //若棋子成功放置，内部自动改变棋子颜色
    putchess({ x, y });
  }

  return (
    <>
      {
        //isShow决定是遮罩还是展示
        isShow ? (
          <li
            key={`${index}`}
            // TODO：少用style
            data-type={isStar(index) ? "star" : "point"}
            className={classes.cube}
          ></li>
        ) : (
          <li
            key={`${index}`}
            onClick={chessPut}
            className={classes.maskcube}
          >
            <ChessPiece
              type={
                //  TODO: 不嵌套三元 考虑使用map 常量提取
                 game[index] === 0 ? "" : colormap.get(game[index])
              }
            />
          </li>
        )
      }
    </>
  );
}
