import { ChipColor, CardColor } from "./game";

export type CardCostTier = 1 | 2 | 3;

export type CardCost = {
  color: ChipColor;
  amount: number;
};

export type Card = {
  pointValue: number;
  color: CardColor;
  tier: CardCostTier;
  costs: CardCost[];
};
