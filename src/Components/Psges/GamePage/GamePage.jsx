import classes from "./GamePage.module.css";
import ChessArea from "../../Containers/Chess/ChessArea/ChessArea";
import Options from "../../Containers/Options/Options";
import WhitePlayer from "../../Containers/Player/WhitePlayer";
import BlackPlayer from "../../Containers/Player/BlackPlayer";
import React from "react";
import { useRef } from "react";
import useStore from "../../../store/store";
export default function GamePage({ history }) {
  let chessborder = useRef("chessborder");
  let pointSize = useStore((state) => state.pointSize);
  document.documentElement.style.fontSize = `${
    (window.screen.availHeight - 250) / pointSize
  }px`;
  console.log("start");
  return (
    <div className={classes.gameArea}>
      <div className={classes.players}>
        <BlackPlayer />
        <WhitePlayer />
      </div>
      <div ref={chessborder}>
        <ChessArea />
      </div>

      <Options chessborder={chessborder} history={history} />
    </div>
  );
}
