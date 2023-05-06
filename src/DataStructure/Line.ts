import { Bend } from "./Bend";
import { ConnectType } from "./ConnectType";
import { LineRecord } from "./LineRecord";
import { Rail } from "./Rail";
import { RailPair } from "./RailPair";
import { Station } from "./Station";
import { Straight } from "./Straight";
import { Vector } from "./Vector";
export class Line {
  empty: boolean;
  departureStation: LineRecord | undefined;
  _dev_tag: string | undefined;
  constructor() {
    this.empty = false;
  }

  linkAll(stations: Station[]){
    stations.reduce((pre,cur)=>{
      this.link(pre,cur);
      return cur;
    });
  }


  // connect B station and C station
  link(B: Station, C: Station, bendFirst: boolean = true) {
    const railPair = this.applyBestRailPair(B,C,bendFirst);
    railPair.setLine(this);
    let bLineRecord = B.getJoint(this);
    if (!bLineRecord) {
      //if record not exist, add one
      bLineRecord = new LineRecord(B, this);
      // register cLineRecord in C station
      B.addLineRecord(bLineRecord);
      this.departureStation = bLineRecord;
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

  applyBestRailPair(B: Station, C: Station, bendFirst: boolean) {
    const direction = new Vector(B.position, C.position);
    if (direction.standard) {
      const bOutIndex = Straight.getBestRailIndex(B, C, this);
      const cInIndex = Rail.oppositeIndex(bOutIndex);
      const bTrack = B.getTrack(direction);
      const cTrack = C.getTrack(direction.opposite());
      const bRail = bTrack.getAvailableRail(bOutIndex);
      const cRail = cTrack.getAvailableRail(cInIndex);
      return new RailPair(bRail, cRail);
    } else {
      const [bOutDirection, cInDirectionOpposite] =
        direction.getBendSteps(bendFirst);
      const cInDirection = cInDirectionOpposite.opposite();
      const bTrack = B.getTrack(bOutDirection);
      const cTrack = C.getTrack(cInDirection);
      const bLastRail = B.getJoint(this)?.lastRail;
      const cNextRail = C.getJoint(this)?.nextRail;
      const bOutIndex = Bend.getBestRailIndex(bTrack, bLastRail);
      const cInIndex = Bend.getBestRailIndex(cTrack, cNextRail);
      const bRail = bTrack.getAvailableRail(bOutIndex);
      const cRail = cTrack.getAvailableRail(cInIndex);
      return new RailPair(bRail, cRail);
    }
  }
}

export class EmptyLine extends Line {
  constructor() {
    super();
    this.empty = true;
  }
}
