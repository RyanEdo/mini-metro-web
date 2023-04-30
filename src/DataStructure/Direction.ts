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
  almostUpRight,
  almostRightDown,
  almostDownLeft,
  almostLeftUp,
  coincide,
  error,
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
      return new Direction(((this.direct + 2) % 4) + 8);
    return new Direction(this.direct);
  }

  sameDirectionTo(direction: Direction){
    return this.direct === direction.direct;
  }



}
