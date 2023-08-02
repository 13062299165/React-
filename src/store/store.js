import { create } from "zustand";
import isWin from "./utils/isWin";
// TODO: 有注释 但是不够全 'black' ｜ ‘white’频繁使用可以提取
const pastIntegral = localStorage.getItem("integral");
// 棋盘路数，默认为15路
let pointSize = 15;
//
const {BLACK,BLACKCODE,WHITE,WHITECODE}={
  BLACK:"black",
  BLACKCODE:1,
  WHITE:"white",
  WHITECODE:-1
}
const useStore = create((set) => ({
  pointSize: pointSize,
  //判断用户是否开始游戏，未开始则不允许操作
  isStart: false,
  //与isStart配合，判断游戏是否处于结束状态
  hasWinner: false,
  game: new Array(pointSize * pointSize).fill(0),
  //记录步数
  steps: 0,
  //当前落子方
  current: BLACK,
  //查看缓存
  integral: pastIntegral
    ? JSON.parse(pastIntegral)
    : {
        white: 0,
        black: 0,
      },
  record: [],
  //开始游戏，进行初始化
  start: () =>
    set((state) => {
      return {
        isStart: true,
        hasWinner: false,
        //默认15*15
        game: new Array(state.pointSize * state.pointSize).fill(0),
        current: BLACK,
        record: [],
        steps: 0,
      };
    }),
  exitGame:()=>set(()=>{
    return {
      isStart:false,
      hasWinner:false,
      steps:0
    }
  }),
    //选择棋盘路数
  setPointSize: (p) =>
    set(() => ({ pointSize: p, game: new Array(p * p).fill(0) })),
  reverseCurrent: () =>
    set((state) => {
      return {
        current: state.current === BLACK ? WHITE : BLACK,
      };
    }),
  //对局结束设置积分
  setIntergral: () =>
    set((state) => ({ integral: state.integral[state.current] + 1 })),
  //落子，根据current将数组对应位置更新，黑为1，白为-1，没有落子则为0
  putchess: (point) =>
    set((state) => {
      if (state.isStart) {
        let length = state.record.length;
        let index = point.x * state.pointSize + point.y;
        // TODO: 1 -1也可以提取为常量增强可读性
        let status = state.current === BLACK ? BLACKCODE : WHITECODE;
        //这个位置需要没有落子
        if (state.game[index] === 0) {
          //返回值value
          let value = {
            //增加记录
            record: state.record.toSpliced(length, 0, point),
            game: state.game.toSpliced(index, 1, status),
            steps: state.steps + 1,
          };
          //先输赢判断，在进行反转，如果赢了，就不用进行换手,赢了需要进行积分增加，并且重置isStart
          if (!isWin(point, status, value.game, state.pointSize)) {
            state.reverseCurrent();
          } else {
            value.isStart = false;
            value.hasWinner = true;
            //增加积分
            state.integral[state.current] += 1;
            value.integral = { ...state.integral };
            localStorage.setItem("integral", JSON.stringify(state.integral));
          }
          return value;
        } else return {};
      }
      //zustand要求必须返回一个对象
      else return {};
    }),
  //，撤销，将记录栈顶部出栈,并重置落子点
  undo: () =>
    set((state) => {
      if (state.isStart) {
        let length = state.record.length;
        if (length > 0) {
          //获取要撤销的落子点
          let last = state.record[length - 1];
          let index = last.x * state.pointSize + last.y;
          return {
            record: state.record.toSpliced(length - 1, 1),
            game: state.game.toSpliced(index, 1, 0),
            current: state.current === BLACK ? WHITE : BLACK,
            steps: state.steps - 1,
          };
        } else return {};
      } else return {};
    }),
}));
export default useStore;
