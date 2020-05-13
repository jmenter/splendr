import { CardColor } from "./game";

export type CardRequirement = {
  color: CardColor;
  amount: number;
};

export type Noble = {
  pointValue: number;
  cardRequirements: CardRequirement[];
};

export const allNobles: Noble[] = [
  {
    pointValue: 3,
    cardRequirements: [
      { color: "blue", amount: 4 },
      { color: "white", amount: 4 },
    ],
  },
  {
    pointValue: 3,
    cardRequirements: [
      { color: "blue", amount: 4 },
      { color: "green", amount: 4 },
    ],
  },
  {
    pointValue: 3,
    cardRequirements: [
      { color: "black", amount: 4 },
      { color: "red", amount: 4 },
    ],
  },
  {
    pointValue: 3,
    cardRequirements: [
      { color: "red", amount: 4 },
      { color: "green", amount: 4 },
    ],
  },
  {
    pointValue: 3,
    cardRequirements: [
      { color: "black", amount: 4 },
      { color: "white", amount: 4 },
    ],
  },
  {
    pointValue: 3,
    cardRequirements: [
      { color: "black", amount: 3 },
      { color: "blue", amount: 3 },
      { color: "white", amount: 3 },
    ],
  },
  {
    pointValue: 3,
    cardRequirements: [
      { color: "black", amount: 3 },
      { color: "red", amount: 3 },
      { color: "white", amount: 3 },
    ],
  },
  {
    pointValue: 3,
    cardRequirements: [
      { color: "black", amount: 3 },
      { color: "red", amount: 3 },
      { color: "green", amount: 3 },
    ],
  },
  {
    pointValue: 3,
    cardRequirements: [
      { color: "green", amount: 3 },
      { color: "blue", amount: 3 },
      { color: "red", amount: 3 },
    ],
  },
  {
    pointValue: 3,
    cardRequirements: [
      { color: "green", amount: 3 },
      { color: "blue", amount: 3 },
      { color: "white", amount: 3 },
    ],
  },
];
