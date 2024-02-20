import { MouseEvent, Touch } from "react";
import { Straight } from "./Straight";

export class Point {
  x: number;
  y: number;
  yReversed: boolean;
  q_start: boolean;
  q: boolean;
  q_end: boolean;
  constructor(x: number = 0, y: number = 0, yReversed: boolean = false) {
    this.x = x;
    this.y = y;
    this.yReversed = yReversed;
    this.q_start = false;
    this.q = false;
    this.q_end = false;
  }

  round(){
    return new Point(Math.round(this.x), Math.round(this.y))
  }

  offset(A: Point) {
    return new Point(A.x + this.x, A.y + this.y);
  }

  displacementTo(A: Point) {
    return new Point(this.x - A.x, this.y - A.y);
  }

  distanceTo(A: Point) {
    return Math.sqrt(Math.pow(this.x - A.x, 2) + Math.pow(this.y - A.y, 2));
  }

  sameTo(A: Point) {
    return A.x === this.x && A.y === this.y && A.yReversed === this.yReversed;
  }

  reverseY() {
    return new Point(this.x, -this.y, !this.yReversed);
  }

  static getPointFromTouch(A: Touch) {
    return new Point(A.clientX, A.clientY);
  }

  static getPointFromMouse(A: MouseEvent) {
    return new Point(A.clientX, A.clientY);
  }

  static getMidPoint(A: Point, B: Point) {
    return new Point((A.x + B.x) / 2, (A.y + B.y) / 2);
  }

  static getDisplacement(A: Point, B: Point) {
    return new Point(A.x - B.x, A.y - B.y);
  }
}
