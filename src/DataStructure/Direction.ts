//clockwise

export enum Direct {
  up,
  upRight,
  right,
  rightDown,
  down,
  downLeft,
  left,
  leftUp,
  // Quadrant I bisected by a diagonal line
  // upRightA means the upper half
  // upRightB means the lower half
  // all the directions is marked in clockwise
  upRightA,
  upRightB,
  rightDownA,
  rightDownB,
  downLeftA,
  downLeftB,
  leftUpA,
  leftUpB,
  coincide,
}

export class Direction {
  direct: Direct;
  standard: boolean;
  constructor(direct: Direct) {
    this.direct = direct;
    this.standard = direct < 8;
  }

  opposite() {
    if (this.direct < 8) return new Direction((this.direct + 4) % 8);
    if (this.direct >= 8 && this.direct < 12)
      return new Direction(this.direct+4);
    if(this.direct >= 12 && this.direct <16)
      return new Direction(this.direct-4);
    return new Direction(this.direct);
  }

  oppositeTo(direction: Direction){
    return direction.opposite().direct === this.direct;
  }

  sameTo(direction: Direction){
    return this.direct === direction.direct;
  }

  // this direction at given direction's which side
  // 1 2 3 means clockwise poistion
  // -1 -2 -3 means counterclockwise
  // 0 means same direction
  // 4 means opposite direction
  sideTo(direction: Direction){
    if(this.oppositeTo(direction)) return 4;
    const side = this.direct - direction.direct;
    if(side < -4) return side + 8;
    if(side > 4) return side -8;
    return side;

  }
  getBendSteps(bendFirst: boolean){
    if(this.direct<8||this.direct>15){
      throw new Error('this is not bend direction');
    }
    const firstStep = new Direction(this.direct - 7 - this.direct%2);
    const secondStep = new Direction((this.direct - 8 + this.direct%2)%8);
    return bendFirst ? [firstStep,secondStep]: [secondStep,firstStep];
  }

}
