import "./CardComponent.scss";
import { observer } from "mobx-react";
import React from "react";
import { Card } from "../../game/card";

export type CardComponentProps = {
  id: string;
  card: Card;
  purchaseHandler: CardHandler | undefined;
  reserveHandler: CardHandler | undefined;
};

export type CardHandler = (id: string) => void;

export default observer((props: CardComponentProps) => {
  const { reserveHandler } = props;
  const { purchaseHandler } = props;

  return (
    <div className="CardComponent" id={props.id}>
      <div className="point-value">
        {props.card.pointValue > 0 ? props.card.pointValue : "\u00a0"}
      </div>
      <div className="indicator">
        <div className={"color-indicator " + props.card.color}> </div>
      </div>
      <div className="costs">
        {props.card.costs.map((cost) => {
          const className = `cost ${cost.color}`;
          return (
            <div className={className} key={className}>
              {cost.amount}
            </div>
          );
        })}
      </div>
      <div className="actions">
        <button
          disabled={reserveHandler === undefined}
          id={props.id}
          onClick={
            reserveHandler &&
            ((event) => reserveHandler(event.currentTarget.id))
          }
        >
          hold
        </button>
        <button
          disabled={purchaseHandler === undefined}
          id={props.id}
          onClick={
            purchaseHandler &&
            ((event) => purchaseHandler(event.currentTarget.id))
          }
        >
          buy
        </button>
      </div>
    </div>
  );
});
