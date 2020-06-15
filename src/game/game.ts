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
  @observable currentRound: number = 1;
  @observable private currentPlayerIndex = 0;

  players: Player[] = [];
  @observable winningPlayers?: Player[];

  @observable chipStacks = new Map<ChipColor, number>();
  @observable cardStacks = new Map<CardCostTier, Card[]>();
  @observable nobles: Noble[] = [];
  @observable playerShouldDiscard: boolean = false;

  constructor(numberOfPlayers: PlayerCount) {
    this.initializePlayers(numberOfPlayers);
    this.initializeChips(numberOfPlayers === 4 ? 7 : numberOfPlayers + 2);
    this.initializeCards();
    this.initializeNobles(numberOfPlayers + 1);
    // this.runCardTests();
    // this.winningPlayer = this.players[0];
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
  get sortedPlayers(): Player[] {
    return this.players.sort((a, b) => b.totalPoints - a.totalPoints);
  }

  @computed
  get playerCanReserve(): boolean {
    return (
      !this.currentPlayer.hasTempChips &&
      this.currentPlayer.canReserveCard &&
      !this.playerShouldDiscard
    );
  }

  public playerCanPurchase(card: Card): boolean {
    return (
      !this.currentPlayer.hasTempChips &&
      this.currentPlayer.canBuyCard(card) &&
      !this.playerShouldDiscard
    );
  }

  @action
  discardChipHandler = (targetId: string) => {
    const chipColor = this.chipColorForId(targetId);
    const currentPlayerChipCountForColor =
      this.currentPlayer.chips.get(chipColor) || 0;
    this.currentPlayer.chips.set(chipColor, currentPlayerChipCountForColor - 1);
    const currentBankChipCountForColor = this.chipStacks.get(chipColor) || 0;
    this.chipStacks.set(chipColor, currentBankChipCountForColor + 1);
    this.endPlayerTurn();
  };

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

  @action tablePurchaseHandler = (targetId: string) => {
    const ids = targetId.split("-");
    const costTier = Number(ids[0]) as CardCostTier;
    const cardIndex = Number(ids[1]);
    const cardStack = this.cardStacks.get(costTier);
    if (!cardStack) {
      this.endPlayerTurn();
      return;
    }
    const cardToBuy = cardStack.splice(cardIndex, 1)[0];
    this.handleCardPurchaseTransaction(cardToBuy);
  };

  @action reservePurchaseHandler = (target: string) => {
    const ids = target.split("-");
    const index = Number(ids[1]);
    const cardToBuy = this.currentPlayer.reserveCards.splice(index, 1)[0];
    this.handleCardPurchaseTransaction(cardToBuy);
  };

  @action handleCardPurchaseTransaction(cardToBuy: Card) {
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
    this.playerShouldDiscard = this.currentPlayer.chipCount > 10;

    if (!this.playerShouldDiscard) {
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
    // this.runTestsForCards(tier1Cards, "1");
    // this.runTestsForCards(tier2Cards, "2");
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

    // const totalPoints = cards
    //   .map((card) => card.pointValue)
    //   .reduce((p, c) => p + c);
    // console.log(`tier ${tierLabel} points: ${totalPoints}`);

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
      const flatMappedCostsOfColorFilterReMapped = flatMappedCostsOfColorFilter.map(
        (cardCost) => cardCost.amount
      );
      console.log("map", flatMappedCostsOfColorFilterReMapped);
      const flatMappedCostsOfColorFilterReMappedReduced = flatMappedCostsOfColorFilterReMapped.reduce(
        (p, c) => p + c
      );
      console.log("reduced", flatMappedCostsOfColorFilterReMappedReduced);
      // const costsOfColor = cards;
      // .flatMap((card) => card.costs)
      // .filter((cardCost) => cardCost.color === cardColor)
      // .map((cardCost) => cardCost.amount)
      // .reduce((p, c) => p + c);
      console.log(`${cardsOfColor.length} cards for ${cardColor}`);
      console.log(
        `tier ${tierLabel} costs for ${cardColor}: ${flatMappedCostsOfColorFilterReMappedReduced}`
      );
    });
  }
}
