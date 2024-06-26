import { Direct, Direction, DirectionVictorReverseY } from "./Direction";
import { Point } from "./Point";

export class Vector extends Direction {
  start: Point; // startPoint
  end: Point; // endPoint
  constructor(start: Point, end: Point) {
    super(Vector.getDirection(start, end));
    this.start = start;
    this.end = end;
  }

  verticalProlong(length: number) {
    const A = this.start,
      B = this.end;
    if (A.x === B.x)
      return [new Point(B.x + length, B.y), new Point(B.x - length, B.y)];
    const diffSign = (A.x<B.x && A.y<B.y) || (A.x>B.x&&A.y>B.y);
    const tan = (B.y - A.y) / (B.x - A.x);
    const alpha = Math.abs(Math.atan(tan));
    const sin = Math.sin(alpha);
    const cos = Math.cos(alpha);

    if(diffSign)
    return [
      new Point(B.x - sin * length, B.y + cos * length),
      new Point(B.x + sin * length, B.y - cos * length),
    ];
    return [
      new Point(B.x - sin * length, B.y - cos * length),
      new Point(B.x + sin * length, B.y + cos * length),
    ];
    
  }

  prolong(length: number) {
    const A = this.start,
      B = this.end;
    const kX = A.x < B.x ? 1 : -1;
    const kY = A.y < B.y ? 1 : -1;
    if (A.x === B.x) return new Point(A.x, B.y + kY * length);
    const tan = (B.y - A.y) / (B.x - A.x);
    const alpha = Math.abs(Math.atan(tan));
    const sin = Math.sin(alpha);
    const cos = Math.cos(alpha);
    return new Point(B.x + kX * cos * length, B.y + kY * sin * length);
  }

  normalize(k: number = 1) {
    const deltaX = this.end.x - this.start.x;
    const deltaY = this.end.y - this.start.y;
    const module = Math.sqrt(
      Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
    );
    return new Vector(
      new Point(0, 0),
      new Point((k * deltaX) / module, (k * deltaY) / module)
    );
  }

  passesThroughPoint(A: Point) {
    return (
      (A.x - this.start.x) * (A.y - this.end.y) ===
      (A.y - this.start.y) * (A.x - this.end.x)
    );
  }

  round() {
    return new Vector(this.start.round(), this.end.round());
  }

  passesThroughPointRound(point: Point) {
    const A = point.round();
    const vector = this.round();
    return this.passesThroughPoint.bind(vector)(A);
  }

  getCrossPointTo(b: Vector) {
    const a = this;
    const A = a.start,
      B = a.end,
      C = b.start,
      D = b.end;

    const m = (A.x - B.x) / (A.y - B.y);
    const n = (C.x - D.x) / (C.y - D.y);
    // if(!Number.isFinite(m)) return new Point(A.x, (A.x - C.x) / n + C.y);
    // if(!Number.isFinite(n)) return new Point(C.x, (C.x - A.x) / m + A.y);
    if (!Number.isFinite(m)) return new Point(n * (A.y - C.y) + C.x, A.y);
    if (!Number.isFinite(n)) return new Point(m * (C.y - A.y) + A.x, C.y);
    const y = (C.x - A.x + m * A.y - n * C.y) / (m - n);
    const x = n * (y - C.y) + C.x;
    return new Point(x, y);
  }

  static getVectorByPointAndDirection(A: Point, direction: Direction) {
    const [x, y] = DirectionVictorReverseY[direction.direct];
    return new Vector(A, new Point(A.x + x, A.y + y));
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
      if (-deltaX === -deltaY) return Direct.downLeft;
      else if (-deltaX < -deltaY) return Direct.downLeftA;
      else return Direct.downLeftB;
    if (deltaX < 0 && deltaY > 0)
      if (-deltaX === deltaY) return Direct.leftUp;
      else if (-deltaX > deltaY) return Direct.leftUpA;
      else return Direct.leftUpB;
    debugger
    throw Error("error happend when getting direction");
  }
}
