import SplendorGame, { PlayerCount } from "../game/game";
import { makeObservable, observable } from "mobx";

export type GameConfiguration = {
  numberOfPlayers: number;
};

export default class GameStore {
  configuration: GameConfiguration;
  game: SplendorGame;

  constructor(configuration: GameConfiguration) {
    makeObservable(this, { game: observable });
    this.configuration = configuration;
    this.game = new SplendorGame(
      this.configuration.numberOfPlayers as PlayerCount
    );
  }

  reset() {
    this.game = new SplendorGame(
      this.configuration.numberOfPlayers as PlayerCount
    );
  }
}
