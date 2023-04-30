import { Rail } from "./Rail";

export class RailPair {
    departureRail: Rail;
    arrivalRail: Rail;
    center: boolean;
    constructor(departureRail: Rail, arrivalRail: Rail) {
      this.departureRail = departureRail;
      this.arrivalRail = arrivalRail;
      this.center = departureRail.index === 1;
    }


    // find a rail pair by given railIndex
    static getRailPair(railPairs:RailPair[], railIndex: number){
        return railPairs.find(railPair=>railPair.departureRail.index === railIndex)
    }

  }