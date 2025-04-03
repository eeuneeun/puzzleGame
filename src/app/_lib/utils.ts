export function shuffle(array: any[]) {
  array.sort(() => Math.random() - 0.5);
}
