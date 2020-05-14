import { ChipColor } from "./game";
import { Card } from "./card";
import { observable, computed, action } from "mobx";

export default class Player {
  id: number;
  @observable name: string;
  @observable chips = new Map<ChipColor, number>();
  @observable tempChips: ChipColor[] = [];
  tableau: Card[] = [];
  reserveCards: Card[] = [];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public costReductionFor(chipColor: ChipColor): number {
    return this.tableau.filter((card) => card.color === chipColor).length;
  }

  public buyingPowerForColor(chipColor: ChipColor): number {
    const chipPower = this.chips.get(chipColor) || 0;
    const cardPower = this.tableau.filter((card) => card.color === chipColor)
      .length;
    return chipPower + cardPower;
  }

  public canBuyCard(card: Card): boolean {
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

  @computed
  get canReserveCard(): boolean {
    return this.reserveCards.length < 3;
  }

  @computed
  get chipCount(): number {
    return this.getChipCount();
  }

  @computed
  get tempChipCount(): number {
    return this.getChipCount(true);
  }

  @computed
  get hasTempChips(): boolean {
    return this.tempChipCount > 0;
  }

  public saveTempChips() {
    this.tempChips.forEach((color: ChipColor) => {
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

  @action
  removeChip(chipColor: ChipColor, amount: number = 1, temp: boolean = false) {
    if (temp) {
      const index = this.tempChips.indexOf(chipColor);
      this.tempChips.splice(index, 1);
    } else {
    }
    const currentValue = this.chips.get(chipColor);
    if (!currentValue) {
      return;
    }
    console.log("removing chip", chipColor, currentValue, amount);
    if (currentValue >= amount) {
      this.chips.set(chipColor, currentValue - amount);
    } else {
      this.chips.set(chipColor, 0);
    }
  }

  private getChipCount(temp: boolean = false): number {
    if (temp) {
      return this.tempChips.length;
    }
    const values = Array.from(this.chips.values());
    if (!values.length) {
      return 0;
    }
    return values.reduce((s, c) => s + c);
  }
}
