export type PlayerEvent = {
  target: {
    value: string;
  };
};

export type DefaultPreventer = {
  preventDefault: () => void;
};

export function randomizeArray(array: any[]): any[] {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}

export function repeat(times: number, callback: (index: number) => void) {
  [...Array(times)].forEach((_, index) => {
    callback(index);
  });
}
