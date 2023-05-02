import { ConnectType } from "./ConnectType";
import { LineRecord } from "./LineRecord";
import { RailPair } from "./RailPair";
import { Station } from "./Station";
import { Straight } from "./Straight";
import { Vector } from "./Vector";
export class Line {
  empty: boolean;
  departureStation: LineRecord | undefined;
  constructor() {
    this.empty = false;
  }

  // connect B station and C station
  link(B: Station, C: Station, railPair: RailPair) {
    let bLineRecord = B.getJoint(this);
    if (!bLineRecord) {
      //if record not exist, add one
      bLineRecord = new LineRecord(B, this);
      // register cLineRecord in C station
      B.addLineRecord(bLineRecord);
    }
    let cLineRecord = C.getJoint(this);
    if (!cLineRecord) {
      cLineRecord = new LineRecord(C, this);
      // register cLineRecord in C station
      C.addLineRecord(cLineRecord);
    }
    // establish doubly linked list
    bLineRecord?.establishConnectionTo(cLineRecord);
    // update rail and connect type for B and C
    LineRecord.updateLineRecords(bLineRecord, cLineRecord, railPair);
  }

  chooseBestRailPair(B: Station, C: Station, bendFirst: boolean) {
    const direction = new Vector(B.position,C.position);
    if(direction.standard){
      // round 1: 
      const round1Indexes = Straight.round1(B,C);
      if(round1Indexes.length === 1){
        return RailPair.getRailPairByIndex(B,C,round1Indexes[0].index,direction);
      }
      // round 2:
      const round2Indexes = Straight.round2(B,C,round1Indexes, this);
      if(round2Indexes.length === 1){
        return RailPair.getRailPairByIndex(B,C,round2Indexes[0].index,direction);
      }
      // round 3:
      const round3Indexes = Straight.round3(B,C,round2Indexes);
      if(round3Indexes.length === 1){
        return RailPair.getRailPairByIndex(B,C,round3Indexes[0].index,direction);
      }
      // round 4:
      const round4Index = Straight.round4(B,C,this);
      return RailPair.getRailPairByIndex(B,C,round4Index,direction);
    }else{
      const [bOutDirection, cInDirectionOpposite] = direction.getBendSteps(bendFirst);
      const bTrack = B.getTrack(bOutDirection);
      const cTrack = C.getTrack(cInDirectionOpposite.opposite());
      const bLastRail = B.getJoint(this)?.lastRail;
      const cNextRail = C.getJoint(this)?.nextRail;
    }
  }
}

export class EmptyLine extends Line {
  constructor() {
    super();
    this.empty = true;
  }
}
