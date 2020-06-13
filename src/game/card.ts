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
