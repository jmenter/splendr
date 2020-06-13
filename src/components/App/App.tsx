import "./App.css";

import React from "react";
import GameComponent from "../Game/GameComponent";
import stores from "../../stores/Stores";
import ResultsComponent from "../Game/ResultsComponent";
import { observer } from "mobx-react";

function App() {
  return (
    <div className="App">
      <div>it not splendor</div>
      <TheGame />
    </div>
  );
}

export default App;

const TheGame = observer(() => {
  const { game } = stores.gameStore;
  return game.winningPlayers ? (
    <ResultsComponent game={game} />
  ) : (
    <GameComponent />
  );
});
