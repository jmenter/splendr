import Player from "./player";
import { CardCostTier, Card, CardColor, AllCardColors } from "./card";
import { Noble, allNobles } from "./noble";
import { randomizeArray, repeat } from "../utils/utilities";
import { computed, observable, action, makeObservable } from "mobx";
import { tier1Cards } from "./tier1Cards";
import { tier2Cards } from "./tier2Cards";
import { tier3Cards } from "./tier3Cards";
import CardStacks from "./cardStacks";

export type PlayerCount = 2 | 3 | 4;
export type ChipColor = CardColor | "wild";

export default class SplendorGame {
  currentRound: number = 1;
  currentPlayerIndex = 0;

  players: Player[] = [];
  winningPlayers?: Player[];

  chipStacks = new Map<ChipColor, number>();
  cardStacks = new CardStacks();
  nobles: Noble[] = [];

  constructor(numberOfPlayers: PlayerCount) {
    makeObservable(this, {
      currentRound: observable,
      currentPlayerIndex: observable,
      winningPlayers: observable,
      chipStacks: observable,
      cardStacks: observable,
      nobles: observable,
      currentPlayer: computed,
      sortedPlayers: computed,
      discardChipHandler: action,
      singleChipHandler: action,
      doubleChipHandler: action,
      tablePurchaseHandler: action,
      reservePurchaseHandler: action,
      handleCardPurchaseTransaction: action,
      returnChipHandler: action,
      reserveHandler: action,
    });
    this.reset(numberOfPlayers);
    // this.runCardTests();
  }

  reset(numberOfPlayers: PlayerCount) {
    this.initializeGameState();
    this.initializePlayers(numberOfPlayers);
    this.initializeCards();
    this.initializeChips(numberOfPlayers === 4 ? 7 : numberOfPlayers + 2);
    this.initializeNobles(numberOfPlayers + 1);
  }

  private initializeGameState() {
    this.currentRound = 1;
    this.currentPlayerIndex = 0;
  }

  private initializePlayers(amount: number) {
    this.players = [];
    this.winningPlayers = undefined;
    repeat(amount, (index) => {
      this.players.push(new Player(index + 1, "player"));
    });
  }

  private initializeCards() {
    this.cardStacks = new CardStacks();
  }

  private initializeChips(amount: number) {
    this.chipStacks = new Map<ChipColor, number>();
    AllCardColors.forEach((color) => {
      this.chipStacks.set(color, amount);
    });
    this.chipStacks.set("wild", 5);
  }

  private initializeNobles(amount: number) {
    this.nobles = [];
    this.nobles = randomizeArray(allNobles).splice(0, amount);
  }

  get currentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  get sortedPlayers(): Player[] {
    return this.players.sort((a, b) => b.totalPoints - a.totalPoints);
  }

  discardChipHandler = (targetId: string) => {
    const chipColor = this.chipColorForId(targetId);
    const currentPlayerChipCountForColor =
      this.currentPlayer.chips.get(chipColor) || 0;
    this.currentPlayer.chips.set(chipColor, currentPlayerChipCountForColor - 1);
    const currentBankChipCountForColor = this.chipStacks.get(chipColor) || 0;
    this.chipStacks.set(chipColor, currentBankChipCountForColor + 1);
    this.endPlayerTurn();
  };

  singleChipHandler = (targetId: string) => {
    const chipColor = this.chipColorForId(targetId);
    this.removeChips(chipColor, 1);
    this.currentPlayer.addChip(chipColor, 1, true);
    if (this.currentPlayer.tempChipCount >= 3) {
      this.currentPlayer.saveTempChips();
      this.endPlayerTurn();
    }
  };

  doubleChipHandler = (targetId: string) => {
    const chipColor = this.chipColorForId(targetId);
    this.removeChips(chipColor, 2);
    this.currentPlayer.addChip(chipColor, 2);
    this.endPlayerTurn();
  };

  tablePurchaseHandler = (targetId: string) => {
    const ids = targetId.split("-");
    const costTier = Number(ids[0]) as CardCostTier;
    const cardIndex = Number(ids[1]);
    const card = this.cardStacks.stackForTier(costTier).splice(cardIndex, 1)[0];
    if (card) {
      this.handleCardPurchaseTransaction(card);
    }
  };

  reservePurchaseHandler = (target: string) => {
    const ids = target.split("-");
    const index = Number(ids[1]);
    const cardToBuy = this.currentPlayer.reserveCards.splice(index, 1)[0];
    if (cardToBuy) {
      this.handleCardPurchaseTransaction(cardToBuy);
    }
  };

  handleCardPurchaseTransaction(cardToBuy: Card) {
    var totalDeficit = 0;
    cardToBuy.costs.forEach((cost) => {
      const costReduction = this.currentPlayer.costReductionFor(cost.color);
      const netCostForColor = cost.amount - costReduction;
      const chipAmount = this.currentPlayer.chips.get(cost.color) || 0;
      var deficitForColor = 0;
      if (netCostForColor > chipAmount) {
        deficitForColor = netCostForColor - chipAmount;
        totalDeficit += deficitForColor;
      }
      const finalCost = netCostForColor - deficitForColor;
      this.currentPlayer.removeChip(cost.color, finalCost);
      this.addChips(cost.color, finalCost);
    });

    if (totalDeficit) {
      this.currentPlayer.removeChip("wild", totalDeficit);
      this.addChips("wild", totalDeficit);
    }
    this.currentPlayer.tableau.push(cardToBuy);
    this.endPlayerTurn();
  }

  returnChipHandler = (targetId: string) => {
    const color = this.chipColorForId(targetId);
    this.currentPlayer.removeChip(color, 1, true);
    this.addChips(color, 1);
  };

  reserveHandler = (targetId: string) => {
    console.log("reserve handler: ", targetId);
    const ids = targetId.split("-");
    const tier = Number(ids[0]) as CardCostTier;
    const index = Number(ids[1]);
    console.log("stack", this.cardStacks.stackForTier(tier));
    const stack = this.cardStacks.stackForTier(tier);
    const card = stack.splice(index, 1)[0];
    console.log("card to reseve: ", card);
    if (card) {
      this.currentPlayer.reserveCards.push(card);
      const currentValue = this.chipStacks.get("wild");
      if (currentValue && currentValue > 0) {
        this.chipStacks.set("wild", currentValue - 1);
        this.currentPlayer.addChip("wild");
      }
      this.endPlayerTurn();
    }
  };

  private nobleCheck() {
    const availableNobles = this.nobles.filter((noble) => {
      return this.currentPlayer.fulfillsRequirementsForNoble(noble);
    });
    if (availableNobles.length > 0) {
      const grabbedNoble = this.nobles.splice(0, 1)[0];
      this.currentPlayer.nobles.push(grabbedNoble);
    }
  }

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
    if (!this.currentPlayer.needsToDiscard) {
      this.nobleCheck();
      this.currentPlayerIndex++;
      if (this.currentPlayerIndex >= this.players.length) {
        this.handleEndOfRoundStuff();
      }
    }
  }

  private handleEndOfRoundStuff() {
    const playersWithSufficientPoints = this.players.filter(
      (player) => player.totalPoints >= 15
    );
    if (playersWithSufficientPoints.length === 0) {
      this.finishRound();
    } else if (playersWithSufficientPoints.length === 1) {
      console.log("1 clear winner");
      this.endGame(playersWithSufficientPoints);
    } else {
      console.log("multiple possile winners: ", playersWithSufficientPoints);
      const sortedByScore = playersWithSufficientPoints.sort(
        (a: Player, b: Player) => b.totalPoints - a.totalPoints
      );
      const highestScore = sortedByScore[0].totalPoints;
      console.log("highest score: ", highestScore);
      const highestScorers = playersWithSufficientPoints.filter(
        (player) => player.totalPoints === highestScore
      );
      console.log("all the higest scoreres:", highestScorers);
      if (highestScorers.length === 1) {
        console.log("1 winningest winner");
        this.endGame(highestScorers);
      } else {
        const sortedByCardCount = highestScorers.sort(
          (a, b) => a.tableau.length - b.tableau.length
        );
        const lowestCardCount = sortedByCardCount[0].tableau.length;
        console.log("lowest card count: ", lowestCardCount);
        const playersWithLowestCardCount = highestScorers.filter(
          (player) => player.tableau.length === lowestCardCount
        );
        console.log(
          "players with lowest card count: ",
          playersWithLowestCardCount
        );
        this.endGame(playersWithLowestCardCount);
      }
    }
  }

  private finishRound() {
    console.log("finishing round");

    this.currentRound++;
    this.currentPlayerIndex = 0;
  }

  private endGame(winners: Player[]) {
    console.log("game has ended, winners: ", winners);
    this.winningPlayers = winners;
  }

  private runCardTests() {
    this.runTestsForCards(tier1Cards, "1");
    this.runTestsForCards(tier2Cards, "2");
    this.runTestsForCards(tier3Cards, "3");
  }

  private runTestsForCards(cards: Card[], tierLabel: string) {
    console.log("\n\nbeginning test for tier : ", tierLabel);
    console.log("here are my cards: ", cards);

    const totalPointsValues = cards.map((card) => card.pointValue);
    console.log("these are the totalPointsValues: ", totalPointsValues);

    const totalPointsValuesReduced = totalPointsValues.reduce((p, c) => p + c);
    console.log(
      "these are the totalPointsValuesReduced",
      totalPointsValuesReduced
    );

    console.log("cards of color:");
    AllCardColors.forEach((cardColor) => {
      console.log("now checking for: ", cardColor);
      const cardsOfColor = cards.filter((card) => card.color === cardColor);

      const mappedCostsOfColor = cards.map((card) => card.costs);
      console.log("map: ", mappedCostsOfColor);

      const flatMappedCostsOfColor = mappedCostsOfColor.flat();
      console.log("flat", flatMappedCostsOfColor);
      const flatMappedCostsOfColorFilter = flatMappedCostsOfColor.filter(
        (cardCost) => cardCost.color === cardColor
      );
      console.log("filter", flatMappedCostsOfColorFilter);
      const flatMappedCostsOfColorFilterReMapped =
        flatMappedCostsOfColorFilter.map((cardCost) => cardCost.amount);
      console.log("map", flatMappedCostsOfColorFilterReMapped);
      const flatMappedCostsOfColorFilterReMappedReduced =
        flatMappedCostsOfColorFilterReMapped.reduce((p, c) => p + c);
      console.log("reduced", flatMappedCostsOfColorFilterReMappedReduced);
      console.log(`${cardsOfColor.length} cards for ${cardColor}`);
      console.log(
        `tier ${tierLabel} costs for ${cardColor}: ${flatMappedCostsOfColorFilterReMappedReduced}`
      );
    });
  }
}
