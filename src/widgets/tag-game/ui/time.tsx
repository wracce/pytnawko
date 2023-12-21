import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { useTime } from "../model/time-context";
import fromSecondsToStringTime from "../../../shared/lib/fromSecondsToStringTime";

import "./time.less";

export default function Time() {
  const time = useTime();
  return (
    <div className="time label">
      <span className="time__value">{fromSecondsToStringTime(time)}</span>
      <FontAwesomeIcon icon={faStopwatch} className="time__icon" />
    </div>
  );
}
