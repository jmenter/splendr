import SplendorGame from "../game/game";
import { makeObservable, observable } from "mobx";

const NUMBER_OF_PLAYERS = 2;

export default class GameStore {
  
  game: SplendorGame = new SplendorGame(NUMBER_OF_PLAYERS);
  
  constructor() {
    makeObservable(this, {game: observable})
  }

  reset() {
    this.game = new SplendorGame(NUMBER_OF_PLAYERS);
  }
}
