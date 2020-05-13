import openSocket from "socket.io-client";
import { observable } from "mobx";
import { v4 as uuidv4 } from "uuid";

export default class SocketClient {
  private socket: SocketIOClient.Socket;

  @observable clientId: string = "";

  constructor(url: string) {
    const cook = document.cookie;
    console.log(cook);
    console.log(uuidv4());
    this.socket = openSocket(url);
    this.socket.on("connect", () => {
      console.log("connected to server");
      this.socket.emit("message", "hi from me");
    });
  }

  public sendMessage(message: string) {
    this.socket.emit("message", message);
  }

  private configureClientId() {}
}
