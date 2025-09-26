import { GameProvider } from "../context/GameContext";
import PlayerStatus from "../components/PlayerStatus";
import GameText from "../components/GameText";
import Choices from "../components/Choices";

import "../assets/CSS/Game.css";

export default function Game() {
  return (
    <GameProvider>
      <div className="parent">
        <div className="gameBG">
          <div className="game">
            <PlayerStatus />
            <GameText />
            <Choices />
          </div>
        </div>
      </div>
    </GameProvider>
  );
}
