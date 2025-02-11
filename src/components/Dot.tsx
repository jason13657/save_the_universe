import React from "react";
import { Vector2D } from "../model/Vector2D";

type Props = {
  vector2D: Vector2D;
};

function Dot({ vector2D }: Props) {
  return (
    <div
      className="absolute w-[10px] h-[10px] bg-red-400 rounded-full transform origin-center"
      style={{ left: `${vector2D.x}px`, top: `${vector2D.y}px`, transform: "translate(-50%, -50%)" }}
    >
      <div className="flex">
        <p className="text-white text-sm">{vector2D.x}</p>,<p className="text-white text-sm">{vector2D.y}</p>
      </div>
    </div>
  );
}

export default Dot;
