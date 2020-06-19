import "./CardStackComponent.scss";

import React from "react";
import stores from "../../stores/Stores";
import { observer } from "mobx-react";
import { CardCostTier } from "../../game/card";
import CardComponent from "./CardComponent";

export type CardStackComponentProps = {
  cardCostTier: CardCostTier;
};

const VISIBLE_SLOTS = 4;

export default observer((props: CardStackComponentProps) => {
  const { game } = stores.gameStore;
  const cards = game.cardStacks.get(props.cardCostTier);
  if (!cards) {
    return <div />;
  }

  const remaining = cards.length - VISIBLE_SLOTS;
  const remainingCards = remaining > 0 ? remaining : 0;
  const visibleCards = cards.slice(0, VISIBLE_SLOTS);
  return (
    <div className="CardStackComponent">
      <div className="card remaining">
        {remainingCards} cards
        <br />
        remaining
      </div>
      {visibleCards.map((card, index) => {
        const id = `${props.cardCostTier}-${index}`;
        return (
          <CardComponent
            key={id}
            id={id}
            card={card}
            purchaseHandler={
              game.playerCanPurchase(card)
                ? game.tablePurchaseHandler
                : undefined
            }
            reserveHandler={
              game.playerCanReserve ? game.reserveHandler : undefined
            }
          />
        );
      })}
    </div>
  );
});
