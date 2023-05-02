import { EmptyLine, Line } from "./Line";
import { RailPair } from "./RailPair";
import { Track } from "./Track";

export class Rail {
  track: Track;
  index: number;
  line: Line;
  extra: boolean;
  constructor(track: Track, index: number) {
    this.track = track;
    this.index = index;
    this.line = new EmptyLine();
    this.extra = false;
  }

  oppositeIndex(){
    return 2 - this.index;
  }

  static getStraightConnectRailPair(aEmptyRails: Rail[], bEmptyRails: Rail[]) {
    if (aEmptyRails.length === 0 || bEmptyRails.length === 0) return;
    const railPairs: RailPair[] = [];
    aEmptyRails.forEach((aRail) => {
      bEmptyRails.forEach((bRail) => {
        //found just opposite rail
        if (aRail.index + bRail.index === 2) {
          railPairs.push(new RailPair(aRail,bRail));
        }
      });
    });
    return railPairs;
  }
  
  static getBestRail(rails: Rail[]){
    return rails.find(rail=>rail.index === 1) || rails[0];
  }

  static getRailByIndex(rails: Rail[], index: number){
    return rails.find(rail=>rail.index === index);
  }

}

export class ExtraRail extends Rail{
    constructor(track: Track, index: number){
      super(track, index);
      this.extra = true;
    }
}


