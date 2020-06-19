import "./NobleComponent.scss";

import { Noble } from "../../game/noble";
import React from "react";
import { observer } from "mobx-react";

export type NobleComponentProps = {
  noble: Noble;
};

export default observer((props: NobleComponentProps) => {
  return (
    <div className="NobleComponent">
      <div className="point-value">{props.noble.pointValue}</div>
      {props.noble.cardRequirements.map((requirement) => {
        return (
          <div
            className={"requirement " + requirement.color}
            key={`${requirement.color}${requirement.amount}`}
          >
            {requirement.amount}
          </div>
        );
      })}
    </div>
  );
});
