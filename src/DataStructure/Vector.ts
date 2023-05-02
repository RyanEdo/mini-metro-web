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
      if (deltaX === deltaY) return Direct.upRight;
      else if (deltaX < deltaY) return Direct.upRightA;
      else return Direct.upRightB;
    if (deltaX > 0 && deltaY < 0)
      if (deltaX === -deltaY) return Direct.rightDown;
      else if (deltaX > -deltaY) return Direct.rightDownA;
      else return Direct.rightDownB;
    if (deltaX < 0 && deltaY < 0)
      if(-deltaX === -deltaY) return Direct.downLeft;
      else if(-deltaX < -deltaY) return Direct.downLeftA;
      else return Direct.downLeftB;
    if (deltaX < 0 && deltaY > 0)
    if(-deltaX === deltaY) return Direct.leftUp;
    else if(-deltaX > deltaY) return Direct.leftUpA;
    else return Direct.leftUpB;
    throw Error('error happend when getting direction');
  }
}
