import { NavLink } from "react-router-dom";
import "./index.less";

export function LobbyPage() {
  return (
    <div className="page page__setup">
      <div className="logo">
        <img className="logo__image" src="/public/header.png" alt="Пятнашки" />
      </div>
      <div className="game-modes">
        <NavLink
          to="/game/3"
          className="action action_rounded font__l game-mode order2"
        >
          3x3
        </NavLink>
        <NavLink
          to="/game/4"
          className="action action_rounded font__l  game-mode order1"
        >
          4x4
        </NavLink>
        <NavLink
          to="/game/5"
          className="action action_rounded font__l game-mode order2"
        >
          5x5
        </NavLink>
        <NavLink
          to="/game/6"
          className="action action_rounded font__l game-mode order3"
        >
          6x6
        </NavLink>
      </div>
    </div>
  );
}

export default LobbyPage;
