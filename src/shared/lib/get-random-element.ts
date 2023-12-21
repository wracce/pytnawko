export default function getRandomElement<T>(arr: Array<T>) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
