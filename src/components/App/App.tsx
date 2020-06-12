import React from "react";
import "./App.css";
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
  const winningPlayer = stores.gameStore.game.winningPlayer;
  if (winningPlayer) {
    return <ResultsComponent players={stores.gameStore.game.players} />;
  } else {
    return <GameComponent />;
  }
});
