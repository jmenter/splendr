import { CardCostTier, Card } from "./card";
import { randomizeArray } from "../utils/utilities";
import { tier1Cards } from "./tier1Cards";
import { tier2Cards } from "./tier2Cards";
import { tier3Cards } from "./tier3Cards";

export default class CardStacks {
  private cardStacks = new Map<CardCostTier, Array<Card>>();
  constructor() {
    this.cardStacks.set(1, randomizeArray(tier1Cards) as Array<Card>);
    this.cardStacks.set(2, randomizeArray(tier2Cards) as Array<Card>);
    this.cardStacks.set(3, randomizeArray(tier3Cards) as Array<Card>);
  }

  stackForTier(tier: CardCostTier): Array<Card> {
    return this.cardStacks.get(tier)!;
  }
}
