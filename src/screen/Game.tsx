import Player from "../prefabs/Player";
import useArrowKeyMove from "../hooks/useArrowKeyMove";
import { useEffect, useState } from "react";
import { AABB } from "../model/AABB";
import Missile from "../prefabs/Missile";
import { Vector2D } from "../model/Vector2D";
import { MISSILE_HEIGHT, MISSILE_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH } from "../config/constants";
import Dot from "../components/Dot";
import useMissileMove from "../hooks/useMissileMove";
import { useGameBoundary } from "../hooks/useGameBoundary";

function Game() {
  const { ref: gameRef, AABB: gameBoundary } = useGameBoundary();
  const { x, y } = useArrowKeyMove(gameBoundary.getBottomCenter().x, gameBoundary.getBottomCenter().y, 3, gameBoundary);

  // Player Missile
  const [playerMissiles, setPlayerMissiles] = useState<AABB[]>([]);
  useMissileMove(playerMissiles, setPlayerMissiles, gameBoundary);

  // Player
  const playerAABB = AABB.fromCenter(new Vector2D(x, y), PLAYER_WIDTH, PLAYER_HEIGHT);

  const shootMissile = () => {
    const newMissile = AABB.fromCenter(new Vector2D(x, y), MISSILE_WIDTH, MISSILE_HEIGHT);
    setPlayerMissiles((prev) => [...prev, newMissile]);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        shootMissile();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [x, y]);

  return (
    <div ref={gameRef} className="relative w-[700px] h-full border mx-auto border-slate-400">
      <Dot vector2D={gameBoundary.getMin()} />
      <Dot vector2D={gameBoundary.getMax()} />
      <Player aabb={playerAABB} />
      {playerMissiles.map((aabb, index) => (
        <Missile key={index} index={index} aabb={aabb} />
      ))}
    </div>
  );
}

export default Game;
