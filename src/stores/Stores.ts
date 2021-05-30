import GameStore from "./GameStore";

const stores = {
  gameStore: new GameStore({ numberOfPlayers: 4 }),
};

export default stores;
