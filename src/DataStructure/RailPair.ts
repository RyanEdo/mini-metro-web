import { Direction } from "./Direction";
import { Line } from "./Line";
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

    setLine(line: Line){
      this.departureRail.setLine(line);
      this.arrivalRail.setLine(line);
    }
  }