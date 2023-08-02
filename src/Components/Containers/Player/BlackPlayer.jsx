import classes from "./Player.module.css";
import React from "react";
import useStore from "../../../store/store";
export default function BlackPlayer() {
  let integral = useStore((state) => state.integral);
  return (
    <div>
      <div className={classes.blackPlayer}>
        <h4>黑</h4>
        <p>积分:{integral.black}</p>
      </div>
    </div>
  );
}
