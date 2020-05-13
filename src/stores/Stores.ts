import GameStore from "./GameStore";
import SocketClient from "../client/SocketClient";

const stores = {
  gameStore: new GameStore(),
  client: new SocketClient("http://localhost:8080"),
};

export default stores;
