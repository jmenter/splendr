import { ChipColor } from "./game";
import { Card, CardColor } from "./card";
import { observable, computed, action, makeObservable } from "mobx";
import { Noble, CardRequirement } from "./noble";
import { DefaultPreventer, PlayerEvent } from "../utils/utilities";

export default class Player {
  id: number;
  name: string;
  tempName?: string;
  chips = new Map<ChipColor, number>();
  tempChips: ChipColor[] = [];
  nobles: Noble[] = [];

  tableau: Card[] = [];
  reserveCards: Card[] = [];

  constructor(id: number, name: string) {
    makeObservable(this, {
      name: observable,
      tempName: observable,
      chips: observable,
      tempChips: observable,
      nobles: observable,
      tableau: observable,
      reserveCards: observable,
      canReserveCard: computed,
      totalPoints: computed,
      needsToDiscard: computed,
      chipCount: computed,
      tempChipCount: computed,
      hasTempChips: computed,
      storeTempPlayerName: action,
      changeHandler: action,
      blurHandler: action,
      submitHandler: action,
      removeChip: action
    })
    this.id = id;
    this.name = name;
    // fakeTableau.forEach((card) => this.tableau.push(card));
  }

  public buyingPowerForColor(cardColor: CardColor): number {
    const chipPower = this.chips.get(cardColor) || 0;
    const cardPower = this.costReductionFor(cardColor);
    return chipPower + cardPower;
  }
  
  public costReductionFor(cardColor: CardColor): number {
    return this.tableau.filter((card) => card.color === cardColor).length;
  }

  public canBuyCard(card: Card): boolean {
    if (this.hasTempChips || this.needsToDiscard) {
      return false;
    }
    var deficit = 0;
    card.costs.forEach((cost) => {
      const amount = this.buyingPowerForColor(cost.color);
      if (cost.amount > amount) {
        deficit += cost.amount - amount;
      }
    });
    const wildAmount = this.chips.get("wild") || 0;
    const deficitMinusWilds = deficit - wildAmount;
    return deficitMinusWilds <= 0;
  }

  public fulfillsRequirementsForNoble(noble: Noble): boolean {
    const numberOfNotMetConditions = noble.cardRequirements.filter(
      (requirement) => {
        return !this.meetsNobleRequirement(requirement);
      }
    );
    return numberOfNotMetConditions.length === 0;
  }

  private meetsNobleRequirement(requirement: CardRequirement): boolean {
    return (
      this.tableau.filter((card) => card.color === requirement.color).length >=
      requirement.amount
    );
  }

  get canReserveCard(): boolean {
    return !this.hasTempChips && !this.needsToDiscard && this.reserveCards.length < 3;
  }

  get totalPoints(): number {
    const cardPoints = this.tableau.reduce((previous: number, current: Card) =>  previous + current.pointValue, 0)
    const noblesPoints = this.nobles.reduce((previous: number, current: Noble) => previous + current.pointValue , 0);
    return cardPoints + noblesPoints;
  }

  get needsToDiscard(): boolean {
    return this.chipCount > 10;
  }

  get hasTempChips(): boolean {
    return this.tempChipCount > 0;
  }

  get chipCount(): number {
    return this.getChipCount();
  }  

  get tempChipCount(): number {
    return this.getChipCount(true);
  }  

  public saveTempChips() {
    this.tempChips.forEach((color) => {
      const currentValue = this.chips.get(color) || 0;
      this.chips.set(color, currentValue + 1);
    });
    this.tempChips = [];
  }

  public addChip(
    chipColor: ChipColor,
    amount: number = 1,
    temp: boolean = false
  ) {
    if (temp) {
      this.tempChips.push(chipColor);
    } else {
      const currentValue = this.chips.get(chipColor) || 0;
      this.chips.set(chipColor, currentValue + amount);
    }
  }

   storeTempPlayerName() {
    if (this.tempName) {
      this.name = this.tempName;
      this.tempName = undefined;
    }
  }
  
   changeHandler = (e:PlayerEvent) => {
    this.tempName = e.target.value;
  }

   blurHandler = (e:PlayerEvent) => {
    this.storeTempPlayerName();
  }

   submitHandler = (e: DefaultPreventer) => {
    this.storeTempPlayerName();
    e.preventDefault();
  }

  
  removeChip(chipColor: ChipColor, amount: number = 1, temp: boolean = false) {
    if (temp) {
      const index = this.tempChips.indexOf(chipColor);
      this.tempChips.splice(index, 1);
    } else {
      const currentValue = this.chips.get(chipColor) || 0;
      if (currentValue >= amount) {
        this.chips.set(chipColor, currentValue - amount);
      } else {
        this.chips.set(chipColor, 0);
      }
    }
  }

  private getChipCount(temp: boolean = false): number {
    return temp ? this.tempChips.length : Array.from(this.chips.values()).reduce((p, c) => p + c, 0)
  }
}
