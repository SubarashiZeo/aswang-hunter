import { useGame } from "../context/GameContext.tsx";
import "../assets/CSS/Game.css";

const GameText = () => {
  const { node } = useGame();
  return (
    <div className="gBox">
      <h1>{node.text}</h1>
    </div>
  );
};

export default GameText;
