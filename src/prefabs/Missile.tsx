import { AABB } from "../model/AABB";

type Props = {
  index: number;
  aabb: AABB;
};

function Missile({ index, aabb }: Props) {
  let bg;
  if (index === 0) {
    bg = "bg-red-500";
  } else if (index === 1) {
    bg = "bg-red-400";
  } else if (index === 2) {
    bg = "bg-red-300";
  } else {
    bg = "bg-red-200";
  }

  return (
    <div
      className={`absolute ${bg} w-[ px] h-[${aabb.getHeight()}px]`}
      style={{
        left: `${aabb.getCenter().x}px`,
        top: `${aabb.getCenter().y}px`,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

export default Missile;
