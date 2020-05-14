import { ChipColor } from "./game";
import { Card } from "./card";
import { observable, computed } from "mobx";

export default class Player {
  id: number;
  @observable name: string;
  @observable chips = new Map<ChipColor, number>();
  @observable tempChips = new Map<ChipColor, number>();
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
    this.tempChips.forEach((value: number, key: ChipColor) => {
      const currentValue = this.chips.get(key) || 0;
      this.chips.set(key, currentValue + value);
    });
    this.tempChips = new Map<ChipColor, number>();
  }

  public addChip(
    chipColor: ChipColor,
    amount: number = 1,
    temp: boolean = false
  ) {
    const actualChips = temp ? this.tempChips : this.chips;
    const currentValue = actualChips.get(chipColor) || 0;
    actualChips.set(chipColor, currentValue + amount);
  }

  public removeChip(
    chipColor: ChipColor,
    amount: number = 1,
    temp: boolean = false
  ) {
    const actualChips = temp ? this.tempChips : this.chips;
    const currentValue = actualChips.get(chipColor);
    if (!currentValue) {
      return;
    }
    if (currentValue > amount) {
      actualChips.set(chipColor, currentValue - amount);
    } else {
      actualChips.set(chipColor, 0);
    }
  }

  private getChipCount(temp: boolean = false): number {
    const values = Array.from(
      temp ? this.tempChips.values() : this.chips.values()
    );
    if (!values.length) {
      return 0;
    }
    return values.reduce((s, c) => s + c);
  }
}
