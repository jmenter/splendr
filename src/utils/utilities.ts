import { Card } from "../game/card";

export type PlayerEvent = {
  target: {
    value: string; 
  }
}

export type DefaultPreventer = {
  preventDefault: () => void;
}

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

export const fakeTableau: Card[] = [
  { pointValue: 0, color: "red", tier: 1, costs: [] },
  { pointValue: 2, color: "red", tier: 1, costs: [] },
  { pointValue: 1, color: "blue", tier: 1, costs: [] },
  { pointValue: 0, color: "blue", tier: 1, costs: [] },
  { pointValue: 0, color: "green", tier: 1, costs: [] },
  { pointValue: 4, color: "green", tier: 1, costs: [] },
  { pointValue: 0, color: "white", tier: 1, costs: [] },
  { pointValue: 0, color: "white", tier: 1, costs: [] },
  { pointValue: 4, color: "black", tier: 1, costs: [] },
  { pointValue: 3, color: "black", tier: 1, costs: [] },
];
