import "./PlayerComponent.scss";
import stores from "../../stores/Stores";
import { observer } from "mobx-react";
import Player from "../../game/player";
import CardComponent from "./CardComponent";

export type PlayerProps = {
  player: Player;
};

export default observer((props: PlayerProps) => {
  console.log("rendering player component: ", JSON.stringify(props.player, undefined, 2))
  const { player } = props;
  const isActive = stores.gameStore.game.currentPlayer === props.player;
  const activeClass = isActive ? "active" : "inactive";
  const playerShouldDiscard =
    stores.gameStore.game.currentPlayer.needsToDiscard && isActive;
  const discardClass = playerShouldDiscard ? "warning" : "normal";
  return (
    <div className="PlayerComponent">
      <div className={activeClass}>
        <div>player {player.name}</div>
        <div>id {player.id}</div>
        <div>points {player.totalPoints}</div>
        <div className="chips-container">
          <div className={`background ${discardClass}`}>
            {playerShouldDiscard
              ? "player chips (click to discard)"
              : "player chips"}
          </div>
          <div className="player-chips">
            {Array.from(player.chips)
              .filter((value) => value[1] > 0)
              .map((value) => {
                const color = value[0];
                const quantity = value[1];
                return playerShouldDiscard ? (
                  <div
                    id={`${color}-discard`}
                    className={`chip ${color}`}
                    onClick={(event) =>
                      stores.gameStore.game.discardChipHandler(
                        event.currentTarget.id
                      )
                    }
                    key={Math.random()}
                  >
                    {quantity}
                  </div>
                ) : (
                  <div className={`chip ${color}`} key={Math.random()}>
                    {quantity}
                  </div>
                );
              })}
          </div>
        </div>

        <div className="cards-container">
          <div className="background">player tableau</div>
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

        <div className="reserve-cards-container">
          <div className="background">reserve cards</div>
          <div className="reserve-cards">
            {player.reserveCards.map((card, index) => {
              const id = `reservecard-${index}`;
              const purchaseHandler = stores.gameStore.game.currentPlayer.canBuyCard(
                card
              )
                ? stores.gameStore.game.reservePurchaseHandler
                : undefined;
              return (
                <CardComponent
                  id={id}
                  card={card}
                  purchaseHandler={purchaseHandler}
                  reserveHandler={undefined}
                  key={Math.random()}
                />
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
          <form onSubmit={player.submitHandler}>
            <label>
              change name:
              <input
                type="text"
                value={player.tempName}
                onChange={player.changeHandler}
                onBlur={player.blurHandler}
              ></input>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
})

