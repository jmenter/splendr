import React from "react";
import stores from "../../stores/Stores";
import { observer } from "mobx-react";
import "./ChipStackComponent.scss";

export default observer(() => {
  const { game } = stores.gameStore;
  const player = game.currentPlayer;
  const chipStackKeys = Array.from(game.chipStacks.keys());
  return (
    <div className="ChipStackComponent">
      {chipStackKeys.map((stackColor) => {
        const stackAmount = game.chipStacks.get(stackColor) || 0;
        const playerAmount = player.tempChips.get(stackColor) || 0;
        const grabOneEnabled = stackAmount && playerAmount === 0;
        const grabTwoEnabled = stackAmount >= 4 && !player.tempChipCount;
        return (
          <div>
            <div className={`chip-stack ${stackColor}`}>{stackAmount}</div>
            {stackColor !== "wild" && (
              <>
                <button
                  id={`${stackColor}-1`}
                  disabled={!grabOneEnabled}
                  onClick={game.singleChipHandler}
                >
                  grab 1
                </button>
                <button
                  id={`${stackColor}-2`}
                  disabled={!grabTwoEnabled}
                  onClick={game.doubleChipHandler}
                >
                  grab 2
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
});
