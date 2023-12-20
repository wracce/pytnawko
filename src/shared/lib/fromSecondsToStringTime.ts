/* eslint-disable no-param-reassign */
function padStartTime(time: number) {
  return time.toString().padStart(2, "0");
}

export default function fromSecondsToStringTime(
  seconds: number | null | undefined,
) {
  if (!seconds) seconds = 0;
  const hours = Math.floor(Math.floor(seconds / 60) / 60);
  const mins = Math.floor(seconds / 60) % 60;
  const secs = seconds % 60;

  return `${hours ? `${padStartTime(hours)}:` : ""}${padStartTime(
    mins,
  )}:${padStartTime(secs)}`;
}
