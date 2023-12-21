import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { GamePage } from "../pages/game";
import { LobbyPage } from "../pages/lobby";

import "./index.less";

function App() {
  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <Router>
        <Routes>
          <Route path="/" element={<LobbyPage />} />
          <Route path="/game/:size" element={<GamePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
