import React, { createContext, useContext, useState, useEffect } from "react";
import storyJson from "../json/story.json";

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

interface GameContextType {
  player: PlayerState;
  currentNode: keyof Story;
  node: Node;
  availableChoices: Choice[];
  setCurrentNode: React.Dispatch<React.SetStateAction<keyof Story>>;
  restartGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentNode, setCurrentNode] = useState<keyof Story>(() => {
    const savedNode = localStorage.getItem("currentNode");
    return (savedNode as keyof Story) || "start";
  });

  const [player, setPlayer] = useState<PlayerState>(() => {
    const savedPlayer = localStorage.getItem("player");
    return savedPlayer
      ? JSON.parse(savedPlayer)
      : {
          hp: 100,
          inventory: [],
        };
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

  useEffect(() => {
    localStorage.setItem("currentNode", currentNode);
    localStorage.setItem("player", JSON.stringify(player));
  }, [currentNode, player]);

  const availableChoices = node.choices?.filter((choice) => {
    if (choice.requires && !player.inventory.includes(choice.requires)) return false;
    if (choice.hideIf && player.inventory.includes(choice.hideIf)) return false;
    return true;
  }) ?? [];

  const restartGame = () => {
    const initialPlayerState = { hp: 100, inventory: [] };
    setPlayer(initialPlayerState);
    setCurrentNode("start");
    localStorage.removeItem("currentNode");
    localStorage.removeItem("player");
  };

  return (
    <GameContext.Provider
      value={{
        player,
        currentNode,
        node,
        availableChoices,
        setCurrentNode,
        restartGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
