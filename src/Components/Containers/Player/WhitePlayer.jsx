import classes from "./Player.module.css";
import useStore from "../../../store/store";
import React from "react";
export default function WhitePlayer() {
  let integral = useStore((state) => state.integral);
  return (
    <div>
      <div className={classes.whitePlayer}>
        <h4>白</h4>
        <p>积分:{integral.white}</p>
      </div>
    </div>
  );
}
