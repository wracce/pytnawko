export default function rotateMatrix(arr: number[], N: number): number[] {
  const result: number[] = [];

  for (let i = 0; i < N; i += 1) {
    for (let j = N - 1; j >= 0; j -= 1) {
      result[j * N + i] = arr[i * N + (N - 1 - j)];
    }
  }

  return result;
}
