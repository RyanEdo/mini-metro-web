import { Direction } from "./Direction";
import { ExtraRail, Rail } from "./Rail";
import { Station } from "./Station";

export class Track {
  station: Station;
  direction: Direction;
  rails: Rail[];
  // extra rail won't occupy the space of rail
  // extraRails save extraRail by index, every index has an array
  extraRails: ExtraRail[][];
  constructor(station: Station, direction: Direction) {
    this.station = station;
    this.direction = direction;
    this.rails = new Array(3)
      .fill(true)
      .map((x, index) => new Rail(this, index));
    this.extraRails = new Array(3).fill(true).map((x, index) => new Array());
  }

  isEmpty(){
    return !this.rails.some(rail=>!rail.line.empty)
  }

  getEmptyRails() {
    return this.rails.filter((rail) => rail.line.empty);
  }

  getRail(index: number) {
    return this.rails[index];
  }

  applyExtraRail(index: number) {
    const extraRail = new ExtraRail(this, index);
    this.extraRails[index].push(extraRail);
    return extraRail;
  }

  getAvailableRail(index: number) {
    const rail = this.getRail(index);
    return rail.line.empty ? rail : this.applyExtraRail(index);
  }
}
