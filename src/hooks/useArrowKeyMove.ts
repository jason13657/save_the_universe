import { useState, useEffect, useRef } from "react";
import { Vector2D } from "../model/Vector2D";
import { AABB } from "../model/AABB";

function useArrowKeyMove(initX: number, initY: number, moveSpeed: number, boundary?: AABB) {
  const [position, setPosition] = useState<Vector2D>({ x: initX, y: initY });

  const keys = useRef<{ [key: string]: boolean }>({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    setPosition({ x: initX, y: initY });
  }, [initX, initY]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (keys.current[event.key] !== undefined) {
        keys.current[event.key] = true;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (keys.current[event.key] !== undefined) {
        keys.current[event.key] = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (keys.current.ArrowUp) newY -= moveSpeed;
        if (keys.current.ArrowDown) newY += moveSpeed;
        if (keys.current.ArrowLeft) newX -= moveSpeed;
        if (keys.current.ArrowRight) newX += moveSpeed;

        if (boundary) {
          newX = Math.max(0, Math.min(boundary.min.x, newX));
          newY = Math.max(0, Math.min(boundary.max.y, newY));
        }

        return { x: newX, y: newY };
      });

      animationRef.current = requestAnimationFrame(updatePosition);
    };

    animationRef.current = requestAnimationFrame(updatePosition);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [moveSpeed, boundary]);

  return position;
}

export default useArrowKeyMove;
