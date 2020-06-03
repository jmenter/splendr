import GameStore from "./GameStore";

const stores = {
  gameStore: new GameStore(),
  // client: new SocketClient("http://localhost:8080"),
};

export default stores;
