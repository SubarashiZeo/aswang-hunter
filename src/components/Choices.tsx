import { useGame } from "../context/GameContext.tsx";
import "../assets/CSS/Game.css";

const Choices = () => {
  const { node, player, availableChoices, setCurrentNode, restartGame } = useGame();

  if (node.isEnding) {
    return (
      <div className="choices">
        <h2>The End</h2>
        <button onClick={restartGame}>Restart Game</button>
        <a
          href="https://www.webtoons.com/en/canvas/aswang/list?title_no=805709"
          target="_blank"
          style={{
            padding: '20px 20px',
            backgroundColor: '#fd1d1dff',
            color: 'white',
            border: 'none',
            textDecoration: 'none',
            cursor: 'pointer',
            display: 'inline-block',
            fontSize: '16px',
            margin: '5px'
           }}
>
              Check Out the original ASWANG! Webcomic
        </a>
      </div>
    );
  }

  if (player.hp <= 0) {
    return (
      <div className="choices">
        <h2>GAME OVER</h2>
        <button onClick={restartGame}>Restart</button>
      </div>
    );
  }

  return (
    <div className="choices">
      {availableChoices.map((choice, i) => (
        <button key={i} onClick={() => setCurrentNode(choice.to)}>
          {choice.text}
        </button>
      ))}
    </div>
  );
};

export default Choices;
