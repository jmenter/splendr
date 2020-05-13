import Player from "./player";
import { CardCostTier, Card } from "./card";
import { Noble, allNobles } from "./noble";
import { randomizeArray, repeat } from "../utils/utilities";
import { computed, observable } from "mobx";
import { tier1Cards } from "./tier1Cards";
import { tier2Cards } from "./tier2Cards";
import { tier3Cards } from "./tier3Cards";

export type PlayerCount = 2 | 3 | 4;
export type CardColor = "white" | "blue" | "green" | "red" | "black";
export type ChipColor = CardColor | "wild";

export const AllCardColors: CardColor[] = [
  "white",
  "blue",
  "green",
  "red",
  "black",
];

export default class SplendorGame {
  chipStacks = new Map<ChipColor, number>();
  @observable cardStacks = new Map<CardCostTier, Card[]>();
  players: Player[] = [];
  nobles: Noble[] = [];

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

  @computed
  get currentPlayerHasTempChips(): boolean {
    return this.currentPlayer.tempChipCount > 0;
  }

  public currentPlayerSingleChipHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const player = this.currentPlayer;
    const chipColor = this.chipColorForId(event.currentTarget.id);
    this.removeChips(chipColor, 1);
    player.addChip(chipColor, true, 1);
    if (player.tempChipCount >= 3) {
      player.saveTempChips();
      this.endPlayerTurn();
    }
  };

  private removeChips(chipColor: ChipColor, amount: number) {
    const currentValue = this.chipStacks.get(chipColor);
    if (!currentValue) {
      return;
    }
    if (currentValue <= amount) {
      this.chipStacks.delete(chipColor);
    } else {
      this.chipStacks.set(chipColor, currentValue - amount);
    }
  }

  private addChips(chipColor: ChipColor, amount: number) {
    const currentValue = this.chipStacks.get(chipColor) || 0;
    this.chipStacks.set(chipColor, currentValue + amount);
  }

  private chipColorForId(id: string): ChipColor {
    return id.split("-")[0] as ChipColor;
  }

  public currentPlayerDoubleChipHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const chipColor = this.chipColorForId(event.currentTarget.id);
    this.removeChips(chipColor, 2);
    this.currentPlayer.addChip(chipColor, false, 2);
    this.endPlayerTurn();
  };

  public currentPlayerPurchaseHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const ids = event.currentTarget.id.split("-");
    const tier = Number(ids[0]) as CardCostTier;
    const index = Number(ids[1]);
    const cardStack = this.cardStacks.get(tier);
    if (!cardStack) {
      this.endPlayerTurn();
      return;
    }
    const card = cardStack.splice(index, 1)[0];
    this.currentPlayer.tableau.push(card);
    card.costs.forEach((cost) => {
      const costReduction = this.currentPlayer.costReductionFor(cost.color);
      const netCost = cost.amount - costReduction;
      const chipAmount = this.currentPlayer.chips.get(cost.color) || 0;
      var deficit = 0;
      if (netCost > chipAmount) {
        const deficit = netCost - chipAmount;
      }
      // finish
      const finalCost = netCost >= 0 ? netCost : 0;
      this.currentPlayer.removeChip(cost.color, false, finalCost);
      this.addChips(cost.color, finalCost);
    });
    this.endPlayerTurn();
  };

  public currentPlayerReserveHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const ids = event.currentTarget.id.split("-");
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

  public currentPlayerCanPurchase(card: Card): boolean {
    if (this.currentPlayerHasTempChips) return false;
    return this.currentPlayer.canBuyCard(card);
  }

  public currentPlayerCanReserve(): boolean {
    if (this.currentPlayerHasTempChips) return false;
    return this.currentPlayer.canReserveCard;
  }

  private endPlayerTurn() {
    this.currentPlayerIndex++;
    if (this.currentPlayerIndex >= this.players.length) {
      this.currentRound++;
      this.currentPlayerIndex = 0;
    }
  }
}
