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
    if (!this.props.game.winningPlayers) {
      return <></>;
    }
    const winningScore = this.props.game.winningPlayers[0].totalPoints;
    const scoreString = `with ${winningScore} points`;
    const winnerString =
      this.props.game.winningPlayers.length === 1
        ? `the winner, ${scoreString}, is:`
        : `the winners, ${scoreString}, are:`;
    return (
      <div className="ResultsComponent">
        <div className="announce">{winnerString}</div>
        {this.props.game.winningPlayers.map((player) => {
          return (
            <div className="winner" key={Math.random()}>
              {player.name}
            </div>
          );
        })}
        <hr />
        <div>
          all players, final scores:
          <table>
            <tbody>
              {this.props.game.sortedPlayers.map((player) => {
                return (
                  <tr key={Math.random()}>
                    <td>player Name: {player.name}</td>
                    <td>player score: {player.totalPoints}</td>
                    <td>development cards: {player.tableau.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button onClick={() => stores.gameStore.reset()}>reset game</button>
        </div>
      </div>
    );
  }
}
