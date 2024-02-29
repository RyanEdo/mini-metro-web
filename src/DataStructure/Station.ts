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
  handlers: (Line|undefined|null)[];
  constructor(position: Point) {
    this.position = position;
    this.tracks = new Array(8)
      .fill(true)
      .map((x, direct: Direct) => new Track(this, new Direction(direct)));
    this.lineRecords = new Map();
    this.handlers = [];
  }



  addLineRecord(lineRecord: LineRecord){
    const {line, station} = lineRecord;
    if(!line){
      throw new Error('line is undefined while add line record to statation');
    }
    if(station !== this){
      throw new Error('you are adding a line record which not belongs to this station');
    }
    // this lineRecords is the array saving linerecords
    const lineRecordsArr = this.lineRecords.get(line) || [];
    lineRecordsArr.push(lineRecord)
    // this.lineRecords is the map Line=>Line
    // containing all the information of the lines go through this station
    this.lineRecords.set(line,lineRecordsArr);
  }


  getTrack(direction: Direction) {
    return this.tracks[direction.direct];
  }

  getRail(direction: Direction, index: number){
    return this.getTrack(direction).getRail(index);
  }


  // getBestRail(direction: Direction){
  //   return this.getTrack(direction).getBestRail();
  // }

  // find the start or end of the Line
  // if no records find, this station must be the departure station
  // if both start and end exist, this station is the loop line joint
  getJoint(line: Line){
    const terminal = this.lineRecords.get(line)?.find(lineRecord=>!lineRecord.lastLineRecord);
    const departure = this.lineRecords.get(line)?.find(lineRecord=>!lineRecord.nextLineRecord);
    return departure || terminal;
  }


}
