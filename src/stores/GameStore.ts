import SplendorGame from "../game/game";
import { observable } from "mobx";

const NUMBER_OF_PLAYERS = 4;

export default class GameStore {
  @observable game: SplendorGame = new SplendorGame(NUMBER_OF_PLAYERS);

  reset() {
    this.game = new SplendorGame(NUMBER_OF_PLAYERS);
  }
}
