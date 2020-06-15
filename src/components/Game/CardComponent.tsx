import "./CardComponent.scss";
import { observer } from "mobx-react";
import React from "react";
import { Card } from "../../game/card";

export type CardHandler = (id: string) => void;

export default observer(
  (props: {
    id: string;
    card: Card;
    purchaseHandler: CardHandler | undefined;
    reserveHandler: CardHandler | undefined;
  }) => {
    const purchaseHandler = props.purchaseHandler;
    const reserveHandler = props.reserveHandler;
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
          {reserveHandler && (
            <button
              id={props.id}
              onClick={(event) => reserveHandler(event.currentTarget.id)}
            >
              hold
            </button>
          )}
          {purchaseHandler && (
            <button
              id={props.id}
              onClick={(event) => purchaseHandler(event.currentTarget.id)}
            >
              buy
            </button>
          )}
        </div>
      </div>
    );
  }
);
