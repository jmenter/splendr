import "./ResultsComponent.scss";

import React from "react";
import stores from "../../stores/Stores";
import SplendorGame from "../../game/game";
import { observer } from "mobx-react";

export type ResultsComponentProps = {
  game: SplendorGame;
};

export default observer((props: ResultsComponentProps) => {
  if (!props.game.winningPlayers) {
    return <></>;
  }
  const winningScore = props.game.winningPlayers[0].totalPoints;
  const scoreString = `with ${winningScore} points`;
  const winnerString =
    props.game.winningPlayers.length === 1
      ? `the winner, ${scoreString}, is:`
      : `the winners, ${scoreString}, are:`;
  return (
    <div className="ResultsComponent">
      <div className="announce">{winnerString}</div>
      {props.game.winningPlayers.map((player) => {
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
            {props.game.sortedPlayers.map((player) => {
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
});
