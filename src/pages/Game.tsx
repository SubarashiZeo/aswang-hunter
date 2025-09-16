import { useState, useEffect } from "react";
import storyJson from "../json/story.json";
import "../assets/CSS/Game.css";

import aaron_100 from "/profiles/aaron_100.png";
import aaron_70 from "/profiles/aaron_70.png";
import aaron_50 from "/profiles/aaron_50.png";
import aaron_0 from "/profiles/aaron_0.png";

interface Choice {
  text: string;
  to: string;
  requires?: string;
  hideIf?: string;
}

interface OnArrive {
  addItem?: string;
  takeDamage?: number;
}

interface Node {
  text: string;
  choices?: Choice[];
  onArrive?: OnArrive;
  isEnding?: boolean;
}

interface PlayerState {
  hp: number;
  inventory: string[];
}

type Story = Record<string, Node>;

const story: Story = storyJson as Story;

export default function Game() {
  const [currentNode, setCurrentNode] = useState<keyof Story>("start");
  const [player, setPlayer] = useState<PlayerState>({
    hp: 100,
    inventory: [],
  });
  const node = story[currentNode];

  useEffect(() => {
    if (node.onArrive) {
      setPlayer((prev) => {
        let updated = { ...prev };

        if (node.onArrive?.addItem && !updated.inventory.includes(node.onArrive.addItem)) {
          updated.inventory = [...updated.inventory, node.onArrive.addItem];
        }

        if (node.onArrive?.takeDamage) {
          updated.hp = Math.max(0, updated.hp - node.onArrive.takeDamage);
          console.log("MY BATUNGBAKBALLS");
        }

        return updated;
      });
    }
  }, [currentNode]);

  useEffect(() => {
  if (player.hp <= 0 && currentNode !== "gameOver_hp" && !node.isEnding) {
    setCurrentNode("gameOver_hp");
  }
}, [player.hp]);

  const availableChoices = node.choices?.filter((choice) => {
    if (choice.requires && !player.inventory.includes(choice.requires)) return false;
    if (choice.hideIf && player.inventory.includes(choice.hideIf)) return false;
    return true;
  });

  const restartGame = () => {
    setPlayer({ hp: 100, inventory: [] });
    setCurrentNode("start");
  };

  const getAaronImage = () => {
    if (player.hp >= 71) return aaron_100;
    if (player.hp > 51) return aaron_70;
    if (player.hp >=1 && player.hp <=50) return aaron_50;
    if (player.hp <= 0) return aaron_0;
    return aaron_100; 
  };

  return (
    <div className="parent">
      <div className="gameBG">  
        <div className="game">
          <div className="elements">
            <div className="healthContainer">

              <div className="profile">
                <img src={getAaronImage()} height="100px" width="100px" alt="Aaron profile" />
              </div>

              <p> HP: {player.hp}</p>

              <div className="healthBG">
                <div className="health" style={{width:`${player.hp}%`}}></div>
              </div>
              
            </div>

            <p>Inventory: {player.inventory.join(", ") || " "}</p>
          </div>

          <div className="gBox">
             <h1>{node.text}</h1>
          </div>

          <div className="choices">
            {node.isEnding ? (
              <div>
                <h2>The End</h2>
                <button onClick={restartGame}>Restart Game</button>
              </div>
            ) : player.hp <= 0 ? (
              <div>
                <h2>GAME OVER</h2>
                <button onClick={restartGame}>Restart</button>
              </div>
            ) : (
              availableChoices?.map((choice, i) => (
                <button key={i} onClick={() => setCurrentNode(choice.to as keyof Story)}>
                  {choice.text}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
