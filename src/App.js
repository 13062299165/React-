import "./App.css";
import GamePage from "./Components/Psges/GamePage/GamePage";
import BeginPage from "./Components/Psges/BeginPage/BeginPage";
import useStore from "./store/store";
import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom";
function App() {
  let pointSize = useStore((state) => state.pointSize);
  document.documentElement.style.fontSize = `${
    (window.screen.availHeight - 250) / pointSize
  }px`;
  return (
    <div className="app">
      <Route path={["/", "/start"]} exact component={BeginPage} />
      <Route path="/game" exact component={GamePage} />
    </div>
  );
}

export default App;
