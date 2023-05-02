import { Touch } from "react";
import { Straight } from "./Straight";

export class Point {
  x: number;
  y: number;
  yReversed: boolean;
  constructor(x: number = 0, y: number = 0 , yReversed: boolean = false) {
    this.x = x;
    this.y = y;
    this.yReversed = yReversed;
  }

  displacementTo(A: Point) {
    return new Point(this.x - A.x, this.y - A.y);
  }

  distanceTo(A: Point) {
    return Math.sqrt(
      Math.pow(this.x - A.x, 2) + Math.pow(this.y - A.y, 2)
    );
  }

  determineLine(A: Point){
    return new Straight(this, A);
  }
  
  reverseY(){
    return new Point(this.x, -this.y, !this.yReversed);
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

