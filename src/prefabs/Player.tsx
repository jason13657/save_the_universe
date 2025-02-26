import { PLAYER_HEIGHT, PLAYER_WIDTH } from "../config/constants";
import { AABB } from "../model/AABB";

type Props = {
  aabb: AABB;
};

function Player({ aabb }: Props) {
  return (
    <div
      className={`absolute border-slate-400 bg-playerSprite bg-cover`}
      style={{
        width: `${PLAYER_WIDTH}px`,
        height: `${PLAYER_HEIGHT}px`,
        left: `${aabb.getCenter().x}px`,
        top: `${aabb.getCenter().y}px`,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

export default Player;
