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
  @observable tempName: string = "";

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.tempName = event.target.value;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    this.props.player.name = this.tempName;
    event.preventDefault();
  };

  render() {
    const { player } = this.props;
    const isActive = stores.gameStore.game.currentPlayer === this.props.player;
    const activeClass = isActive ? "active" : "inactive";
    return (
      <div className="PlayerComponent">
        <div className={activeClass}>
          <div>player {player.name}</div>
          <div>id {player.id}</div>
          <div>points {player.totalPoints}</div>
          <div className="chips-container">
            <div className="player-chips">
              {Array.from(player.chips)
                .filter((value) => value[1] > 0)
                .map((value) => {
                  const color = value[0];
                  const quantity = value[1];
                  return (
                    <div className={`chip ${color}`} key={Math.random()}>
                      {quantity}
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="cards-container">
            <div className="player-cards">
              {player.tableau.map((card) => {
                return (
                  <div className={`card ${card.color}`} key={Math.random()}>
                    {card.pointValue}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="nobles-container">
            <div className="player-nobles">
              {player.nobles.map((noble) => {
                return (
                  <div className={`noble`} key={Math.random()}>
                    {noble.pointValue}
                  </div>
                );
              })}
            </div>
            <form onSubmit={this.handleSubmit}>
              <label>
                change name:
                <input
                  type="text"
                  value={this.tempName}
                  onChange={this.handleChange}
                ></input>
              </label>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
