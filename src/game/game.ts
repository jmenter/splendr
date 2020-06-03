import Player from "./player";
import { CardCostTier, Card, CardColor, AllCardColors } from "./card";
import { Noble, allNobles } from "./noble";
import { randomizeArray, repeat } from "../utils/utilities";
import { computed, observable, action } from "mobx";
import { tier1Cards } from "./tier1Cards";
import { tier2Cards } from "./tier2Cards";
import { tier3Cards } from "./tier3Cards";

export type PlayerCount = 2 | 3 | 4;
export type ChipColor = CardColor | "wild";

export default class SplendorGame {
  players: Player[] = [];
  @observable chipStacks = new Map<ChipColor, number>();
  @observable cardStacks = new Map<CardCostTier, Card[]>();
  @observable nobles: Noble[] = [];

  @observable currentRound: number = 1;

  @observable private currentPlayerIndex = 0;

  constructor(numberOfPlayers: PlayerCount) {
    this.initializePlayers(numberOfPlayers);
    this.initializeChips(numberOfPlayers === 4 ? 7 : numberOfPlayers + 2);
    this.initializeCards();
    this.initializeNobles(numberOfPlayers + 1);
  }

  private initializePlayers(amount: number) {
    repeat(amount, (index) => {
      this.players.push(new Player(index + 1, "player"));
    });
  }

  private initializeChips(amount: number) {
    AllCardColors.forEach((color) => {
      this.chipStacks.set(color, amount);
    });
    this.chipStacks.set("wild", 5);
  }

  private initializeCards() {
    this.cardStacks.set(1, randomizeArray(tier1Cards));
    this.cardStacks.set(2, randomizeArray(tier2Cards));
    this.cardStacks.set(3, randomizeArray(tier3Cards));
  }

  private initializeNobles(amount: number) {
    this.nobles = randomizeArray(allNobles).splice(0, amount);
  }

  @computed
  get currentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  public playerCanPurchase(card: Card): boolean {
    return (
      !this.currentPlayer.hasTempChips && this.currentPlayer.canBuyCard(card)
    );
  }

  @computed
  get playerCanReserve(): boolean {
    return (
      !this.currentPlayer.hasTempChips && this.currentPlayer.canReserveCard
    );
  }

  @action
  singleChipHandler = (targetId: string) => {
    const chipColor = this.chipColorForId(targetId);
    this.removeChips(chipColor, 1);
    this.currentPlayer.addChip(chipColor, 1, true);
    if (this.currentPlayer.tempChipCount >= 3) {
      this.currentPlayer.saveTempChips();
      this.endPlayerTurn();
    }
  };

  @action
  doubleChipHandler = (targetId: string) => {
    const chipColor = this.chipColorForId(targetId);
    this.removeChips(chipColor, 2);
    this.currentPlayer.addChip(chipColor, 2);
    this.endPlayerTurn();
  };

  @action purchaseHandler = (targetId: string) => {
    const ids = targetId.split("-");
    const costTier = Number(ids[0]) as CardCostTier;
    const cardIndex = Number(ids[1]);
    const cardStack = this.cardStacks.get(costTier);
    if (!cardStack) {
      this.endPlayerTurn();
      return;
    }
    const cardToBuy = cardStack.splice(cardIndex, 1)[0];

    var deficit = 0;
    cardToBuy.costs.forEach((cost) => {
      const costReduction = this.currentPlayer.costReductionFor(cost.color);
      const netCostForColor = cost.amount - costReduction;
      const chipAmount = this.currentPlayer.chips.get(cost.color) || 0;
      if (netCostForColor > chipAmount) {
        deficit += netCostForColor - chipAmount;
      }
      const finalCost = netCostForColor >= 0 ? netCostForColor : 0;
      this.currentPlayer.removeChip(cost.color, finalCost);
      this.addChips(cost.color, finalCost);
    });

    if (deficit) {
      this.currentPlayer.removeChip("wild", deficit);
      this.addChips("wild", deficit);
    }
    this.currentPlayer.tableau.push(cardToBuy);
    this.endPlayerTurn();
  };

  @action
  returnChipHandler = (targetId: string) => {
    const color = this.chipColorForId(targetId);
    this.currentPlayer.removeChip(color, 1, true);
    this.addChips(color, 1);
  };

  @action
  reserveHandler = (targetId: string) => {
    const ids = targetId.split("-");
    const tier = Number(ids[0]) as CardCostTier;
    const index = Number(ids[1]);
    const cardStack = this.cardStacks.get(tier);

    if (cardStack) {
      const card = cardStack.splice(index, 1)[0];
      this.currentPlayer.reserveCards.push(card);
      const currentValue = this.chipStacks.get("wild");
      if (currentValue && currentValue > 0) {
        this.chipStacks.set("wild", currentValue - 1);
        this.currentPlayer.addChip("wild");
      }
      this.endPlayerTurn();
    }
  };

  private removeChips(chipColor: ChipColor, amount: number) {
    const currentValue = this.chipStacks.get(chipColor) || 0;
    const newValue = currentValue - amount;
    this.chipStacks.set(chipColor, newValue < 0 ? 0 : newValue);
  }

  private addChips(chipColor: ChipColor, amount: number = 1) {
    const currentValue = this.chipStacks.get(chipColor) || 0;
    this.chipStacks.set(chipColor, currentValue + amount);
  }

  private chipColorForId(id: string): ChipColor {
    return id.split("-")[0] as ChipColor;
  }

  private endPlayerTurn() {
    this.currentPlayerIndex++;
    if (this.currentPlayerIndex >= this.players.length) {
      this.currentRound++;
      this.currentPlayerIndex = 0;
    }
  }
}
