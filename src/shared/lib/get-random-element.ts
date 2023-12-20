export default function getRandomElement<T>(arr: Array<T>) {
  const index = Math.floor(Math.random() * arr.length);

  // console.log(index, "/", arr.length - 1);
  return arr[index];
}
