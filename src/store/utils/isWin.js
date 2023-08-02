//一维数组转二维数组
//四个方向分别判定，从落子点出发，向两侧检索
// TODO：各个参数的意思注释增加可读性
//三个judge参数均为落子点，位置计算函数，需要判断的颜色状态,棋盘尺寸
//判定方法：从落子点向两侧探索，遇到不同状态(颜色不同或空)就停止
function columJudge({ x, y }, getValueByXY, status, size) {
  let opt = true,
    neg = true;
  let dept = 1;
  let cnt = 1;
  while (true) {
    if (opt) {
      // TODO: 这个1*好像没有必要
      if (x +  dept >= size || getValueByXY(x +  dept, y) !== status)
        opt = false;
      else cnt++;
    }
    if (neg) {
      if (x -  dept < 0 || getValueByXY(x -  dept, y) !== status)
        neg = false;
      else cnt++;
    }
    if (!opt && !neg) break;
    dept++;
  }
  return cnt >= 5;
}
function rowJudge({ x, y }, getValueByXY, status, size) {
  let opt = true,
    neg = true;
  let dept = 1;
  let cnt = 1;
  while (true) {
    if (opt) {
      if (y +  dept >= size || getValueByXY(x, y +  dept) !== status)
        opt = !opt;
      else cnt++;
    }
    if (neg) {
      if (y -  dept < 0 || getValueByXY(x, y -  dept) !== status)
        neg = !neg;
      else cnt++;
    }
    if (!opt && !neg) break;
    dept++;
  }
  return cnt >= 5;
}
function d1({ x, y }, getValueByXY, status, size) {
  let opt = true,
    neg = true;
  let dept = 1;
  let cnt = 1;
  while (true) {
    if (opt) {
      if (
        x +  dept >= size ||
        y +  dept >= size ||
        getValueByXY(x +  dept, y +  dept) !== status
      )
        opt = !opt;
      else cnt++;
    }
    if (neg) {
      if (
        x -  dept < 0 ||
        y -  dept < 0 ||
        getValueByXY(x -  dept, y -  dept) !== status
      )
        neg = !neg;
      else cnt++;
    }
    if (!opt && !neg) break;
    dept++;
  }
  return cnt >= 5;
}
function d2({ x, y }, getValueByXY, status, size) {
  let opt = true,
    neg = true;
  let dept = 1;
  let cnt = 1;
  while (true) {
    if (opt) {
      if (
        x +  dept >= size ||
        y -  dept < 0 ||
        getValueByXY(x +  dept, y -  dept) !== status
      )
        opt = !opt;
      else cnt++;
    }
    if (neg) {
      if (
        x -  dept < 0 ||
        y +  dept >= size ||
        getValueByXY(x -  dept, y +  dept) !== status
      )
        neg = !neg;
      else cnt++;
    }
    if (!opt && !neg) break;
    dept++;
  }
  return cnt >= 5;
}
function diagonalJudge({ x, y }, getValueByXY, status, size) {
  //主对角线和副对角线
  return (
    d1({ x, y }, getValueByXY, status, size) ||
    d2({ x, y }, getValueByXY, status, size)
  );
}
//棋盘满时最后落子的胜利，即为没有状态为0的点应该算和局？
function isFull(game) {
  return !game.some(el=>el===0)
}
function isWin({ x, y }, status, game, size) {
  // let martex = toMatex({ x, y }, status, game, size);
  // TODO: 可以不进行转化
  const getValueByXY = (x = 0, y = 0) => game[y + size * x];
  return (
    columJudge({ x, y }, getValueByXY, status, size) ||
    rowJudge({ x, y }, getValueByXY, status, size) ||
    diagonalJudge({ x, y }, getValueByXY, status, size)||
    isFull(game)
  );
}
export default isWin;
