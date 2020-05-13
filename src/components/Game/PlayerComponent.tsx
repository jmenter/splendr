import React from "react";
import stores from "../../stores/Stores";
import { observer } from "mobx-react";
import { observable } from "mobx";
import Player from "../../game/player";
import "./PlayerComponent.scss";

export type PlayerProps = {
  player: Player;
};

@observer
export default class PlayerComponent extends React.Component<PlayerProps> {
  @observable name: string = "";

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.name = event.target.value;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    this.props.player.name = this.name;
    event.preventDefault();
  };

  render() {
    const { player } = this.props;
    const isActive = stores.gameStore.game.currentPlayer === this.props.player;
    const activeClass = isActive ? "active" : "";
    return (
      <div className="PlayerComponent">
        <div className={activeClass}>
          <div>player {player.name}</div>
          <div>id {player.id}</div>
          <div>
            chips ({player.chipCount}) {JSON.stringify(player.chips)}
          </div>
          <div>
            tempchips ({player.tempChipCount}){JSON.stringify(player.tempChips)}
          </div>
          <form onSubmit={this.handleSubmit}>
            <label>
              change name:
              <input
                type="text"
                value={this.name}
                onChange={this.handleChange}
              ></input>
            </label>
          </form>
        </div>
      </div>
    );
  }
}
