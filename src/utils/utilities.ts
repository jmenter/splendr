export function randomizeArray(array: any[]): any[] {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}

export function repeat(times: number, callbackfn: (index: number) => void) {
  [...Array(times)].forEach((_, index) => {
    callbackfn(index);
  });
}
