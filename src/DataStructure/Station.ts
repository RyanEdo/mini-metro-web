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
  constructor(position: Point) {
    this.position = position;
    this.tracks = new Array(8)
      .fill(true)
      .map((x, direct: Direct) => new Track(this, new Direction(direct)));
    this.lineRecords = new Map();
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
    const lineRecords = this.lineRecords.get(line) || [lineRecord];
    // this.lineRecords is the map Line=>Line
    // containing all the information of the lines go through this station
    this.lineRecords.set(line,lineRecords);
  }


  getTrack(direction: Direction) {
    return this.tracks[direction.direct];
  }

  // find the end of the Line
  // if no records find, this station must be the departure station
  getJoint(line: Line){
    return this.lineRecords.get(line)?.find(lineRecord=>!lineRecord.lastLineRecord);
  }


  // assume this station is B
  // given station is C
  // find empty rail pair
  // in given direction (this direction is B out direction)
  // to C station

  getAvailableRailPairsTo(C: Station, direction: Direction){
    const bEmptyRails = this.getTrack(direction).getEmptyRails();
    const cEmptyRails = C.getTrack(direction.opposite()).getEmptyRails();
    const availableRailPairs = Rail.getStraightConnectRailPair(bEmptyRails, cEmptyRails);
    return availableRailPairs;
  }
}
