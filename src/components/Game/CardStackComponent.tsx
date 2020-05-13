import React from "react";
import "./CardStackComponent.scss";
import stores from "../../stores/Stores";
import { observer } from "mobx-react";
import { CardCostTier } from "../../game/card";

export type CardStackComponentProps = {
  cardCostTier: CardCostTier;
};

export default observer((props: CardStackComponentProps) => {
  const { game } = stores.gameStore;
  const cards = game.cardStacks.get(props.cardCostTier);
  if (!cards) {
    return <div />;
  }

  const remainingCards = cards.length - 4;
  const displayRemaining = remainingCards > 0 ? remainingCards : 0;
  const visibleCards = cards.slice(0, 4);
  return (
    <div className="CardStackComponent">
      <div className="card remaining">{displayRemaining} cards remaining</div>
      {visibleCards.map((card, index) => {
        const canPurchase = game.currentPlayerCanPurchase(card);
        const canReserve = game.currentPlayerCanReserve();
        const id = `${props.cardCostTier}-${index}`;
        return (
          <div className="card">
            <div className="point-value">
              {card.pointValue > 0 ? card.pointValue : ""}
            </div>
            <div className={"color-indicator " + card.color}>G</div>
            <br />
            <button
              id={id}
              onClick={game.currentPlayerPurchaseHandler}
              disabled={!canPurchase}
            >
              purchase
            </button>
            <button
              id={id}
              onClick={game.currentPlayerReserveHandler}
              disabled={!canReserve}
            >
              reserve
            </button>
            {card.costs.map((cost) => {
              return <div className={`cost ${cost.color}`}>{cost.amount}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
});
