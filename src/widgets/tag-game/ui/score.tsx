import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoePrints } from "@fortawesome/free-solid-svg-icons";
import { useScore } from "../model/score-context";
import "./score.less";

export default function Score() {
  const score = useScore();
  return (
    <div className="score label">
      <FontAwesomeIcon icon={faShoePrints} className="score__icon"/>
      <span className="score__value">{score}</span>
    </div>
  );
}
