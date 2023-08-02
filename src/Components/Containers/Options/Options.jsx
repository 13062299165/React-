import classes from "./Options.module.css";
import Button from "../../UI/Button/Button";
import useStore from "../../../store/store";
import React from "react";
import DomToImage from "dom-to-image";
export default function Options({ chessborder, history }) {
  const colormap={
    "white":"白",  
    "black":"黑"
  }
  const { undo, start, isStart, hasWinner, steps , exitGame} = useStore((state) => state);
  // TODO：全等
  const current = colormap[useStore((state) => state.current)] ;
  //开始游戏或退出要让用户确定
  function beginHandler() {
    if (
      isStart &&
      !hasWinner &&
      window.confirm("当前对局还未结束，确定重新开始吗")
    ) {
      start();
    } else if (!isStart) {
      start();
    }
  }
  //domtoimage将dom转图片
  function saveHnadler() {
    const { height, width } = chessborder.current.getBoundingClientRect();
    DomToImage.toJpeg(chessborder.current, { height, width }).then(
      async (url) => {
        // let url = canvas.toDataURL()
        // 生成一个a元素
        var a = document.createElement("a");
        // 创建一个单击事件
        var event = new MouseEvent("click");

        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        a.download = `棋局_${url.slice(
          Math.random() * 10 + 30,
          Math.random() * 10 + 40
        )}`;
        // 将生成的URL设置为a.href属性
        a.href = url;
        a.dispatchEvent(event);
      }
    );
  }
  function delHandler() {
    undo();
  }
  //TODO: 退出时未重置store状态
  function exit() {
    if (
      isStart &&
      !hasWinner &&
      window.confirm("当前对局还未结束，确定退出吗")
    ) {
      exitGame()
      history.replace("/start");

    } else if (!isStart) {
      exitGame()
      history.replace("/start");
    }
  }
  return (
    <div className={classes.options}>
      <Button
        text="开始"
        background={"#000"}
        color={"#fff"}
        handleClick={beginHandler}
      />
      <Button
        text="保存棋盘"
        background={"#AAA"}
        color={"#fff"}
        handleClick={saveHnadler}
      />
      <Button
        text="悔棋"
        background={"#ffd0e0"}
        color={"#000"}
        handleClick={delHandler}
      />
      <Button text={`手数:${steps}`} background={"#84bca4"} color={"#333"} />
      <Button
        text={hasWinner ? `${current}子胜` : `执手:${current}`}
        background={"#3b4252"}
        color={"#fff"}
      />
      <Button
        text="退出"
        background={"#3b4252"}
        color={"#fff"}
        handleClick={exit}
      />
    </div>
  );
}
