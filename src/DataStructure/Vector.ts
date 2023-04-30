import { Direct, Direction } from "./Direction";
import { Point } from "./Point";

export class Vector extends Direction {
  start: Point; // startPoint
  end: Point; // endPoint
  constructor(start: Point, end: Point) {
    super(Vector.getDirection(start, end));
    this.start = start;
    this.end = end;
  }


  static getDirection(start: Point, end: Point) {
    const A = start.reverseY();
    const B = end.reverseY();
    if (A.x === B.x && A.y === B.y) return Direct.coincide;
    if (A.x === B.x) return B.y > A.y ? Direct.up : Direct.down;
    if (A.y === B.y) return B.x > A.x ? Direct.right : Direct.left;
    const deltaX = B.x - A.x;
    const deltaY = B.y - A.y;
    if (deltaX > 0 && deltaY > 0)
      return deltaX === deltaY ? Direct.upRight : Direct.almostUpRight;
    if (deltaX > 0 && deltaY < 0)
      return deltaX === -deltaY
        ? Direct.rightDown
        : Direct.almostRightDown;
    if (deltaX < 0 && deltaY < 0)
      return deltaX === deltaY ? Direct.downLeft : Direct.almostDownLeft;
    if (deltaX < 0 && deltaY > 0)
      return deltaX === -deltaY ? Direct.leftUp : Direct.almostLeftUp;
    return Direct.error;
  }
}
