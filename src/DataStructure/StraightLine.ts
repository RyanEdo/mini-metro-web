import { Point } from "./Point";

export class StraightLine {
  A: Point;
  B: Point;
  slope: number;

  constructor(A: Point, B: Point) {
    this.A = A;
    this.B = B;
    this.slope = StraightLine.getSlope(A,B);
  }

  isVertical(){
    return this.slope === Infinity || this.slope === -Infinity;
  }

  isHorizontal(){
    return this.slope === 0;
  }

  isVerticalOrHorizontal(){
    return this.isVertical()||this.isHorizontal();
  }

  isDiagonal(){
    return this.slope === 1 || this.slope === -1;
  }



  static getSlope(A: Point, B: Point){
    return (A.y - B.y)/(A.x - B.x);
  }

}
