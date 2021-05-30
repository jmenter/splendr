import "./PlayerComponent.scss";
import stores from "../../stores/Stores";
import { observer } from "mobx-react";
import Player from "../../game/player";
import CardComponent from "./CardComponent";

export type PlayerProps = {
  player: Player;
};

export default observer((props: PlayerProps) => {
  const { player } = props;
  const isActive = stores.gameStore.game.currentPlayer === props.player;
  return (
    <div className="PlayerComponent">
      <div className={isActive ? "active" : "inactive"}>
        <div>player {player.name}</div>
        <div>id {player.id}</div>
        <div>points {player.totalPoints}</div>
        <Chips player={player} />

        <Cards player={player} />
        <ReserveCards player={player} />
        <Nobles player={player} />
      </div>
    </div>
  );
});

const Chips = observer((props: PlayerProps) => (
  <div className="chips-container">
    <div
      className={`background ${
        props.player.needsToDiscard ? "warning" : "normal"
      }`}
    >
      {props.player.needsToDiscard
        ? "player chips (click to discard)"
        : "player chips"}
    </div>

    <div className="player-chips">
      {Array.from(props.player.chips)
        .filter((value) => value[1] > 0)
        .map((value) => {
          const color = value[0];
          const quantity = value[1];
          return props.player.needsToDiscard ? (
            <div
              id={`${color}-discard`}
              className={`chip ${color}`}
              onClick={(event) =>
                stores.gameStore.game.discardChipHandler(event.currentTarget.id)
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
));

const Cards = observer((props: PlayerProps) => (
  <div className="cards-container">
    <div className="background">player tableau</div>
    <div className="player-cards">
      {props.player.tableau.map((card) => {
        return (
          <div className={`card ${card.color}`} key={Math.random()}>
            {card.pointValue}
          </div>
        );
      })}
    </div>
  </div>
));

const ReserveCards = observer((props: PlayerProps) => (
  <div className="reserve-cards-container">
    <div className="background">reserve cards</div>
    <div className="reserve-cards">
      {props.player.reserveCards.map((card, index) => {
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
));

const Nobles = observer((props: PlayerProps) => (
  <div className="nobles-container">
    <div className="player-nobles">
      {props.player.nobles.map((noble) => {
        return (
          <div className={`noble`} key={Math.random()}>
            {noble.pointValue}
          </div>
        );
      })}
    </div>
    <form onSubmit={props.player.submitHandler}>
      <label>
        change name:
        <input
          type="text"
          value={props.player.tempName || ""}
          onChange={props.player.changeHandler}
          onBlur={props.player.blurHandler}
        ></input>
      </label>
    </form>
  </div>
));
