import { Direction } from "./Direction";
import { Rail } from "./Rail";
import { Station } from "./Station";

export class Track{
    station:Station;
    direction: Direction;
    rails: Rail[];
    constructor(station: Station,direction: Direction){
        this.station = station;
        this.direction = direction;
        this.rails = new Array(3).fill(true).map((x,index)=>new Rail(this, index));
    }
    getEmptyRails(){
        return this.rails.filter(rail=>rail.line.empty);
    }
}