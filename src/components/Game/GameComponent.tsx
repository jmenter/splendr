import React from "react";
import stores from "../../stores/Stores";
import { observer } from "mobx-react";
import PlayerComponent from "./PlayerComponent";
import { NobleComponent } from "./NobleComponent";
import CardStackComponent from "./CardStackComponent";
import ChipStackComponent from "./ChipStackComponent";
import "./GameComponent.scss";

@observer
export default class GameComponent extends React.Component {
  render() {
    const { game } = stores.gameStore;
    return (
      <div className="GameComponent">
        <div>
          round #{game.currentRound}, players:
          {game.players.map((player) => {
            return <PlayerComponent player={player} key={player.id} />;
          })}
        </div>
        <div>
          chips:
          <ChipStackComponent />
        </div>
        <div>
          cards:
          <CardStackComponent cardCostTier={1} />
          <CardStackComponent cardCostTier={2} />
          <CardStackComponent cardCostTier={3} />
        </div>
        <div>
          nobles:
          {game.nobles.map((noble) => {
            return <NobleComponent noble={noble} />;
          })}
        </div>
      </div>
    );
  }
}
