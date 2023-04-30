import { ConnectType } from './ConnectType';
import { LineRecord } from './LineRecord';
import { RailPair } from './RailPair';
import { Station } from './Station';
export class Line{
    empty: boolean;
    departureStation: LineRecord | undefined;
    constructor(){
        this.empty = false;
    }

    // connect B station and C station
    link(B: Station,C: Station,railPair: RailPair,connectType: ConnectType ){
        switch(connectType){
            case ConnectType.straight:{
                const bLineRecord = B.getJoint(this);
                if(!bLineRecord){
                    throw new Error('bLineRecord is not exist!')
                }
                const cLineRecord = new LineRecord(C, this);
                // establish doubly linked list
                bLineRecord?.establishConnectionTo(cLineRecord);
                // register cLineRecord in C station
                C.addLineRecord(cLineRecord);
                // update rail and connect type for B and C
                LineRecord.updateLineRecords(bLineRecord,cLineRecord,railPair,connectType);
                break;
            }
        }
    }
}

export class EmptyLine extends Line{
    constructor(){
        super();
        this.empty = true;
    }
}