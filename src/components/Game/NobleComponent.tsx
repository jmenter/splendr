import { Noble } from "../../game/noble";
import React from "react";
import "./NobleComponent.scss";

export type NobleComponentProps = {
  noble: Noble;
};

export const NobleComponent: React.FunctionComponent<NobleComponentProps> = (
  props
) => {
  return (
    <div className="NobleComponent">
      <div className="point-value">{props.noble.pointValue}</div>
      {props.noble.cardRequirements.map((requirement) => {
        return (
          <div className={"requirement " + requirement.color}>
            {requirement.amount}
          </div>
        );
      })}
    </div>
  );
};
