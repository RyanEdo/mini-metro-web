import { Direction } from "./Direction";
import { Rail } from "./Rail";
import { Station } from "./Station";

export class RailPair {
    departureRail: Rail;
    arrivalRail: Rail;
    center: boolean;
    constructor(departureRail: Rail, arrivalRail: Rail) {
      this.departureRail = departureRail;
      this.arrivalRail = arrivalRail;
      this.center = departureRail.index === 1;
    }

    reverse(){
      const temp = this.departureRail;
      this.departureRail = this.arrivalRail;
      this.arrivalRail = temp;
    }

    static getRailPairByIndex(B: Station, C:Station, bIndex: number, direction: Direction){
      const bTrack = B.getTrack(direction);
      const cTrack = C.getTrack(direction.opposite());
      const bRail = bTrack.getAvailableRail(bIndex);
      const cRail = cTrack.getAvailableRail(bRail.oppositeIndex());
      return new RailPair(bRail,cRail);
    }
/* 
    to-do: to be delete
    // find a rail pair by given railIndex
    static getRailPairByIndex(railPairs:RailPair[], railIndex: number){
        return railPairs.find(railPair=>railPair.departureRail.index === railIndex)
    }

    static getBestRailPair(railPairs: RailPair[]) {
      // found center empty rail pair
      return railPairs.find(railPair => railPair.center) || railPairs[0];
    }

    // given a rail, find the opposite rail in given station
    // if opposite rail in given station occupied
    // create an extra rail for given station
    static applyRailPairByRail(aRail: Rail, bStation: Station, aLinkToB: boolean){
      let railPair;
      const bDirection = aRail.track.direction.opposite();
      const bRailIndex = aRail.oppositeIndex();
      const bRailCandidate = bStation.getRail(bDirection,bRailIndex);
      if(bRailCandidate.line.empty){
        railPair = new RailPair(aRail, bRailCandidate);
      }else{
        const bExtraRail = bStation.getTrack(bDirection).applyExtraRail(bRailIndex);
        railPair = new RailPair(aRail, bExtraRail);
      }
      return aLinkToB? railPair: railPair.reverse();
    }
*/

  }