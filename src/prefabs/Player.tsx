import { AABB } from "../model/AABB";

type Props = {
  aabb: AABB;
};

function Player({ aabb }: Props) {
  return (
    <div
      className={`absolute border-slate-400 bg-playerSprite w-[${aabb.getWidth()}px] h-[${aabb.getHeight()}px] bg-cover`}
      style={{
        left: `${aabb.getCenter().x}px`,
        top: `${aabb.getCenter().y}px`,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

export default Player;
