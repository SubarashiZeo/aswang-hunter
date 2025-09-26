import { useGame } from "../context/GameContext.tsx";
import "../assets/CSS/Game.css";

import aaron_100 from "/profiles/aaron_100.png";
import aaron_70 from "/profiles/aaron_70.png";
import aaron_50 from "/profiles/aaron_50.png";
import aaron_0 from "/profiles/aaron_0.png";

const getAaronImage = (hp: number) => {
  if (hp >= 71) return aaron_100;
  if (hp > 51) return aaron_70;
  if (hp >= 1 && hp <= 50) return aaron_50;
  if (hp <= 0) return aaron_0;
  return aaron_100;
};

const PlayerStatus = () => {
  const { player } = useGame();

  return (
    <div className="elements">
    <div className="healthContainer">
      <div className="profile">
        <img src={getAaronImage(player.hp)} height="100px" width="100px" alt="Aaron profile" />
      </div>
      <p>HP: {player.hp}</p>
      <div className="healthBG">
        <div className="health" style={{ width: `${player.hp}%` }}></div>
      </div>  
    </div>
    <p>Inventory: {player.inventory.join(", ") || " "}</p>
    </div>
  );
};

export default PlayerStatus;
