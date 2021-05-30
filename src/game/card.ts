export type CardColor = "white" | "blue" | "green" | "red" | "black";

export const AllCardColors: CardColor[] = [
  "white",
  "blue",
  "green",
  "red",
  "black",
];

export type CardCostTier = 1 | 2 | 3;

export type CardCost = {
  color: CardColor;
  amount: number;
};

export type Card = {
  pointValue: number;
  color: CardColor;
  tier: CardCostTier;
  costs: CardCost[];
};

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
