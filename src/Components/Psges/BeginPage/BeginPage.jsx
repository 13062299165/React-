import classes from "./BeginPage.module.css";
import useStore from "../../../store/store";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export default function BeginPage() {
  let options = [13, 15, 17, 19, 21, 23];
  let setPointSize = useStore((state) => state.setPointSize);
  return (
    <div className={classes.box}>
      <h3 className={classes.title}>GoBang Play</h3>
      {options.map((item, index) => (
        <div
          className={`${classes.option} 
            ${classes[`option_${index}`]}`}
          key={item}
          onClick={() => {
            setPointSize(item);
          }}
        >
          <Link to="/game">{`${item}路棋`}</Link>
        </div>
      ))}
    </div>
  );
}
