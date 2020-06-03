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
      <div className="temp-chips">
        temp chips:
        <br />
        {player.tempChips.map((color) => {
          return (
            <div key={color}>
              <div className={`chip-stack ${color}`}>1</div>
              <button
                id={`${color}-temp-chip`}
                onClick={(event) =>
                  game.returnChipHandler(event.currentTarget.id)
                }
              >
                return
              </button>
            </div>
          );
        })}
      </div>
      {chipStackKeys.map((stackColor) => {
        const stackAmount = game.chipStacks.get(stackColor) || 0;
        const playerAmount = player.tempChips.find(
          (chip) => chip === stackColor
        )?.length
          ? 1
          : 0;
        const grabOneEnabled = stackAmount && playerAmount === 0;
        const grabTwoEnabled = stackAmount >= 4 && !player.tempChipCount;
        return (
          <div key={stackColor}>
            <div className={`chip-stack ${stackColor}`}>{stackAmount}</div>
            {stackColor !== "wild" && (
              <>
                <button
                  id={`${stackColor}-1`}
                  disabled={!grabOneEnabled}
                  onClick={(event) =>
                    game.singleChipHandler(event.currentTarget.id)
                  }
                >
                  grab 1
                </button>
                <button
                  id={`${stackColor}-2`}
                  disabled={!grabTwoEnabled}
                  onClick={(event) =>
                    game.doubleChipHandler(event.currentTarget.id)
                  }
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
