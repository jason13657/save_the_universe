import { useEffect } from "react";
import { AABB } from "../model/AABB";
import { Vector2D } from "../model/Vector2D";
import { MISSILE_SPEED } from "../config/constants";

function useMissileMove(missiles: AABB[], setMissiles: (missiles: AABB[]) => void, boundary: AABB) {
  useEffect(() => {
    const updateMissiles = () => {
      setMissiles(
        missiles
          .map((missile) => {
            let newMin = new Vector2D(missile.getMin().x, missile.getMin().y - MISSILE_SPEED);
            let newMax = new Vector2D(missile.getMax().x, missile.getMax().y - MISSILE_SPEED);
            let newMissile = new AABB(newMin, newMax);

            if (newMissile.getMin().y < boundary.getMin().y) {
              return null;
            }

            return newMissile;
          })
          .filter(Boolean) as AABB[]
      );

      requestAnimationFrame(updateMissiles);
    };

    requestAnimationFrame(updateMissiles);
  }, [setMissiles, boundary, missiles]);
}

export default useMissileMove;
