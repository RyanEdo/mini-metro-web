import { Touch } from "react";

export class Point {
  x: number;
  y: number;
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  displacementTo(A: Point) {
    return new Point(this.x - A.x, this.y - A.y);
  }

  distanceTo(A: Point) {
    return Math.sqrt(
      Math.pow(this.x - A.x, 2) + Math.pow(this.y - A.y, 2)
    );
  }

  static getPoint(A: Touch) {
    return new Point(A.clientX, A.clientY);
  }
  static getMidPoint(A: Point, B: Point) {
    return new Point((A.x + B.x) / 2, (A.y + B.y) / 2);
  }

  static getDisplacement(A: Point, B: Point) {
    return new Point(A.x - B.x, A.y - B.y);
  }

  
}
