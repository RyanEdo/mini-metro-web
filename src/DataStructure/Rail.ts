import { EmptyLine, Line } from "./Line";
import { RailPair } from "./RailPair";
import { Track } from "./Track";

export class Rail {
  track: Track;
  index: number;
  line: Line;
  constructor(track: Track, index: number) {
    this.track = track;
    this.index = index;
    this.line = new EmptyLine();
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

  static getBestRailPair(railPairs: RailPair[]) {
    // found center empty rail pair
    return railPairs.find(railPair => railPair.center) || railPairs[0];
  }
}


