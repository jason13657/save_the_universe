import { useEffect, useRef, useState } from "react";
import { Vector2D } from "../model/Vector2D";
import { AABB } from "../model/AABB";

export function useGameBoundary() {
  const ref = useRef<HTMLDivElement>(null);
  const [aabb, setAABB] = useState<AABB>(new AABB(new Vector2D(0, 0), new Vector2D(0, 0)));

  useEffect(() => {
    const updateAABB = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const x1 = rect.left;
        const y1 = rect.top;
        const x2 = rect.right;
        const y2 = rect.bottom;
        const vector1 = new Vector2D(x2 - x1, 0);
        const vector2 = new Vector2D(0, y2 - y1);
        setAABB(new AABB(vector1, vector2));
      }
    };
    updateAABB(); // 초기 AABB 설정
    window.addEventListener("resize", updateAABB);

    return () => window.removeEventListener("resize", updateAABB);
  }, []);

  return { ref, AABB: aabb };
}
