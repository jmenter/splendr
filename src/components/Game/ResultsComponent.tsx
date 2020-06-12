import React from "react";
import Player from "../../game/player";
import "./ResultsComponent.scss";

export type ResultsComponentProps = {
  player: Player;
};

export default class ResultsComponent extends React.Component<
  ResultsComponentProps
> {
  render() {
    return (
      <div className="ResultsComponent">
        {JSON.stringify(this.props.player)}
      </div>
    );
  }
}
