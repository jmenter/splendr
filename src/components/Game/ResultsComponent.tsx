import React from "react";
import Player from "../../game/player";

export type ResultsComponentProps = {
  player: Player;
};

export default class ResultsComponent extends React.Component<
  ResultsComponentProps
> {
  render() {
    return (
      <div>
        we are the results component, the winner is{" "}
        {JSON.stringify(this.props.player)}
      </div>
    );
  }
}
