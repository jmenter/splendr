import SplendorGame from "../game/game";

const NUMBER_OF_PLAYERS = 4;
export default class GameStore {
  game: SplendorGame = new SplendorGame(NUMBER_OF_PLAYERS);

  reset() {
    this.game = new SplendorGame(NUMBER_OF_PLAYERS);
  }
}
