import "./ResultsComponent.scss";

import React from "react";
import stores from "../../stores/Stores";
import SplendorGame from "../../game/game";

export type ResultsComponentProps = {
  game: SplendorGame;
};

export default class ResultsComponent extends React.Component<
  ResultsComponentProps
> {
  render() {
    const sortedPlayers = this.props.game.players.sort(
      (a, b) => b.totalPoints - a.totalPoints
    );
    const winningPlayer = sortedPlayers[0];
    return (
      <div className="ResultsComponent">
        <div className="announce">the winner is: </div>
        <div className="winner">{winningPlayer.name}</div>
        <hr />
        <div>
          final scores:{" "}
          {sortedPlayers.map((player) => {
            return (
              <div>
                player Name: {player.name} playerScore{player.totalPoints}
              </div>
            );
          })}
          <button onClick={() => stores.gameStore.reset()}>reset game</button>
        </div>
      </div>
    );
  }
}
