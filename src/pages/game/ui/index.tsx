import { useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import useSound from "use-sound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faRotate, faTrophy } from "@fortawesome/free-solid-svg-icons";
import {
  GameBoard,
  GameProvider,
  GameScore,
  GameTime,
} from "../../../widgets/tag-game";
import clickSrc from "../../../../public/click.mp3";
import "./index.less";

import fromSecondsToStringTime from "../../../shared/lib/fromSecondsToStringTime";
export function GamePage() {
  const params = useParams();
  const size = Number(params?.size) || 3;
  const navigate = useNavigate();
  const [result, setResult] = useState<{ score: number; time: number } | null>(
    null,
  );
  const modalRef = useRef(null!);
  const [playClick] = useSound(clickSrc);
  const refresh = () => {
    navigate(0);
  };
  console.log(!!result);

  return (
    <>
      <div className="page" style={{ pointerEvents: result ? "none" : "all" }}>
        <div className="header">
          <NavLink to="/" className="action">
            <FontAwesomeIcon size="3x" icon={faHome} className="icon" />
          </NavLink>
          <button type="button" className="action" onClick={refresh}>
            <FontAwesomeIcon size="4x" icon={faRotate} className="icon" />
          </button>
        </div>
        <GameProvider
          size={size}
          onFinish={(time, score) => {
            setResult({ time, score });
          }}
          onDrag={() => {
            playClick();
          }}
        >
          <div className="game">
            <div className="game__content ">
              <GameBoard />
            </div>
          </div>
          <div className="info">
            <GameScore />
            <GameTime />
          </div>
        </GameProvider>
      </div>
      <CSSTransition
        in={!!result}
        nodeRef={modalRef}
        classNames="stats__transition"
        timeout={200}
        unmountOnExit
      >
        <div className="stats" ref={modalRef}>
          <div className="stats__content">
            <span className="stats__win-icon">
              <FontAwesomeIcon className="stats__win-icon" icon={faTrophy} />
            </span>
            <span className="stats__win-header">ПОБЕДА!</span>
            <span className="stats__score">
              <b>{result?.score}</b> ходов
            </span>
            <span className="stats__time">
              <b>{fromSecondsToStringTime(result?.time)}</b>
            </span>
            <NavLink to="/" className="stats__home action action_rounded">
              На главный экран
            </NavLink>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default GamePage;
