import { StationProps } from "../Data/UserData";
import { Direct, Direction } from "./Direction";
import { Line } from "./Line";
import { LineRecord } from "./LineRecord";
import { Point } from "./Point";
import { Rail } from "./Rail";
import { Track } from "./Track";

export class Station {
  position: Point;
  tracks: Track[];
  lineRecords: Map<Line, LineRecord[]>;
  _dev_tag: string | undefined;
  handlers: (Line | undefined | null)[];
  displayStation?: StationProps;
  constructor(position: Point) {
    this.position = position;
    this.tracks = new Array(8)
      .fill(true)
      .map((x, direct: Direct) => new Track(this, new Direction(direct)));
    this.lineRecords = new Map();
    this.handlers = new Array(8);
  }

  isEmpty(direct: Direct){
    return !this.handlers[direct] && this.tracks[direct].isEmpty();
  }

  getBestDirectionForName() {
    let space = 0,
      endIndex = 0,
      maxSpace = 0,
      firstSpace;
    for (let i = 0; i < 8; i++) {
      const empty = !this.handlers[i] && this.tracks[i].isEmpty();
      if (empty) {
        space++;
        if (space > maxSpace) {
          maxSpace = space;
          endIndex = i;
        }
      } else {
        if (firstSpace === undefined) firstSpace = space;
        space = 0;
      }
    }
    // all empty
    if (space === 8 || maxSpace===0) {
      return Direct.right;
    }
    if(maxSpace <= 2) {
      if(this.isEmpty(2)) return 2;
      if(this.isEmpty(6)) return 6;
      if(this.isEmpty(1)) return 1;
      if(this.isEmpty(3)) return 3;
      if(this.isEmpty(5)) return 5;
      if(this.isEmpty(7)) return 7;
    }
    if(firstSpace === undefined) firstSpace =0;
    if (space + firstSpace >= maxSpace) {
      // max space containing 0
      if (firstSpace >= space) {
        return Math.floor((firstSpace - space) / 2);
      } else if (space > firstSpace) {
        return 7 - Math.floor((space - firstSpace) / 2);
      }
    }
      const best = endIndex - Math.floor(maxSpace / 2)
      // max space not containing 0
      if(maxSpace%2===0){
        if(best%2===0){
          return best+1;
        }
      }
      return best;

  }


  getBestDirectionForName2(){
  }
  

  addLineRecord(lineRecord: LineRecord) {
    const { line, station } = lineRecord;
    if (!line) {
      throw new Error("line is undefined while add line record to statation");
    }
    if (station !== this) {
      throw new Error(
        "you are adding a line record which not belongs to this station"
      );
    }
    // this lineRecords is the array saving linerecords
    const lineRecordsArr = this.lineRecords.get(line) || [];
    lineRecordsArr.push(lineRecord);
    // this.lineRecords is the map Line=>Line
    // containing all the information of the lines go through this station
    this.lineRecords.set(line, lineRecordsArr);
  }

  getTrack(direction: Direction) {
    return this.tracks[direction.direct];
  }

  getRail(direction: Direction, index: number) {
    return this.getTrack(direction).getRail(index);
  }

  // getBestRail(direction: Direction){
  //   return this.getTrack(direction).getBestRail();
  // }

  // find the start or end of the Line
  // if no records find, this station must be the departure station
  // if both start and end exist, this station is the loop line joint
  getJoint(line: Line) {
    const terminal = this.lineRecords
      .get(line)
      ?.find((lineRecord) => !lineRecord.lastLineRecord);
    const departure = this.lineRecords
      .get(line)
      ?.find((lineRecord) => !lineRecord.nextLineRecord);
    return departure || terminal;
  }
}
