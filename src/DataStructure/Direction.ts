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
  lean: boolean;
  constructor(direct: Direct) {
    this.direct = direct;
    this.standard = direct < 8;
    this.lean = direct % 2 === 1;
  }

  delta(direct: Direct){
    const diff = Math.abs(direct - this.direct);
    return Math.min(diff, 8-diff);
  }

  opposite() {
    if (this.direct < 8) return new Direction((this.direct + 4) % 8);
    if (this.direct >= 8 && this.direct < 12)
      return new Direction(this.direct + 4);
    if (this.direct >= 12 && this.direct < 16)
      return new Direction(this.direct - 4);
    return new Direction(this.direct);
  }

  oppositeTo(direction: Direction | undefined) {
    if (direction) return direction.opposite().direct === this.direct;
    throw new Error("no direction!");
  }

  sameTo(direction: Direction) {
    return this.direct === direction.direct;
  }

  // how many rotation should this direction do to coincide to given direction
  // 1 2 3 means clockwise rotate 1 2 3 times
  // -1 -2 -3 means counterclockwise
  // 0 means no need rotate
  // 4 means opposite direction
  rotationTo(direction: Direction) {
    if (this.oppositeTo(direction)) return 4;
    const side = direction.direct - this.direct;
    if (side < -4) return side + 8;
    if (side > 4) return side - 8;
    return side;
  }
  getBendSteps(bendFirst: boolean) {
    if (this.direct < 8 || this.direct > 15) {
      throw new Error("this is not bend direction");
    }
    const firstStep = new Direction(this.direct - 7 - (this.direct % 2));
    const secondStep = new Direction((this.direct - 8 + (this.direct % 2)) % 8);
    return bendFirst ? [firstStep, secondStep] : [secondStep, firstStep];
  }
}

export const DirectionVictor = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

export const DirectionVictorReverseY = DirectionVictor.map(([x,y])=>[x,-y]);
