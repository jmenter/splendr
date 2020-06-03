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

  const remaining = cards.length - 4;
  const remainingCards = remaining > 0 ? remaining : 0;
  const visibleCards = cards.slice(0, 4);
  return (
    <div className="CardStackComponent">
      <div className="card remaining">{remainingCards} cards remaining</div>
      {visibleCards.map((card, index) => {
        const canPurchase = game.playerCanPurchase(card);
        const id = `${props.cardCostTier}-${index}`;
        return (
          <div className="card">
            <div className="point-value">
              {card.pointValue > 0 ? card.pointValue : "\u00a0"}
            </div>
            <div className="indicator">
              <div className={"color-indicator " + card.color}> </div>
            </div>
            <div className="costs">
              {card.costs.map((cost) => {
                return (
                  <div className={`cost ${cost.color}`}>{cost.amount}</div>
                );
              })}
            </div>
            <div className="actions">
              <button
                id={id}
                onClick={(event) => game.reserveHandler(event.currentTarget.id)}
                disabled={!game.playerCanReserve}
              >
                hold
              </button>
              <button
                id={id}
                onClick={(event) =>
                  game.purchaseHandler(event.currentTarget.id)
                }
                disabled={!canPurchase}
              >
                buy
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
});
