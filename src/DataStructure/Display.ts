import { Station } from "./Station";

export class DisplayStation {
    stationName: string;
    bendFirst: boolean;
    constructor(stationName: string, bendFirst: boolean){
        this.stationName = stationName;
        this.bendFirst = bendFirst;
    }
}