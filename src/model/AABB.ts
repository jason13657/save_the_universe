import { Vector2D } from "./Vector2D";

export class AABB {
  constructor(public min: Vector2D, public max: Vector2D) {}

  static fromCenter(center: Vector2D, width: number, height: number): AABB {
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const min = new Vector2D(center.x - halfWidth, center.y - halfHeight);
    const max = new Vector2D(center.x + halfWidth, center.y + halfHeight);

    return new AABB(min, max);
  }

  public getMin(): Vector2D {
    return this.min;
  }

  public getMax(): Vector2D {
    return this.max;
  }

  public getCenter(): Vector2D {
    const centerX = (this.min.x + this.max.x) / 2;
    const centerY = (this.min.y + this.max.y) / 2;
    return new Vector2D(centerX, centerY);
  }

  public getBottomCenter(): Vector2D {
    const centerX = (this.min.x + this.max.x) / 2;
    return new Vector2D(centerX, this.max.y);
  }

  public getWidth(): number {
    return this.max.x - this.min.x;
  }

  public getHeight(): number {
    return this.max.y - this.min.y;
  }
}
