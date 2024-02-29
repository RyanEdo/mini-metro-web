import { Station } from './../DataStructure/Station';
import { Direction, DirectionVictorReverseY } from "../DataStructure/Direction";
import { Line } from "../DataStructure/Line";
import { LineRecord } from "../DataStructure/LineRecord";
import { Point } from "../DataStructure/Point";
import { Vector } from '../DataStructure/Vector';
import { handleLength, handleWidth } from '../Common/const';

const getLPLPoints = (allKeyPoints: Point[])=> {
    const LQLPoints = allKeyPoints.slice();
    // LQLPoints.pop();
    // LQLPoints.shift();
    return LQLPoints;
}

const checkIfStraightTrackHasHander=(direction: Direction, station: Station)=>{
    const {direct} = direction.opposite();
    return station.handlers[direct];
}
const checkifHandeCanGoStraight = (outDirection: Direction, station: Station)=>{
    const ifStraightTrackHasHander = !checkIfStraightTrackHasHander(outDirection, station);
    return ifStraightTrackHasHander;
}
const getDepartureGoStraightHandeCommand = (A: Point,B: Point) =>{
    const BA = new Vector(B,A);
    const C = BA.prolong(handleLength);
    const BC = new Vector(B,C);
    const [D,E] = BC.verticalProlong(handleWidth);
    console.log(A,B)

    return `M ${D.x} ${D.y} L ${E.x} ${E.y} M ${C.x} ${C.y}`;
}
const addHandleForStation = (station: Station, line: Line, direction: Direction) =>{
    station.handlers[direction.opposite().direct] = line;
}
const getBestDirectionForHandle = (station: Station, direction: Direction)=>{

    let min = Infinity, bestChoice;
    for(let i=0; i< station.handlers.length;i++){
        const handle = station.handlers[i];
        if(!handle){
            const delta = direction.opposite().delta(i);
            if(delta<min){
                bestChoice = i;
                min = delta
            }
        }
    }
    return bestChoice;
}
const getDepartureBestChoiceHandeCommand = (A: Point,B: Point, pathStartPoint: Point) =>{
    const F = pathStartPoint;
    const AB = new Vector(A,B);
    const C = AB.prolong(handleLength-1);
    const BC = new Vector(B,C);
    const [D,E] = BC.verticalProlong(handleWidth);
    return `M ${D.x} ${D.y} L ${E.x} ${E.y} M ${C.x} ${C.y} L ${A.x} ${A.y} L ${F.x} ${F.y}`;
}
const getBestChoiceHandleCommand = (station: Station, direction: Direction, pathStartPoint: Point)=>{
    const handleDirect = getBestDirectionForHandle(station, direction);
    if(handleDirect === undefined){
        return ` M  ${pathStartPoint.x} ${pathStartPoint.y}`;
    }else{
        const A = station.position;
        const [x,y] = DirectionVictorReverseY[handleDirect]
        const B = new Point(A.x+x,A.y+y)
        return getDepartureBestChoiceHandeCommand(A,B, pathStartPoint);
    }
}
const getStartHandleCommand = (A: Point,B: Point, departureRecord: LineRecord)=>{
    let command = '';
    const outDirection = departureRecord?.getOutDirection();
    const {station, line} = departureRecord;
    const ifHandeCanGoStraight = checkifHandeCanGoStraight(outDirection!, station);
    if(ifHandeCanGoStraight){
        command = getDepartureGoStraightHandeCommand(A,B);
        addHandleForStation(station, line!, outDirection!);
    }else{
        command = getBestChoiceHandleCommand(station, outDirection!, A);
    }
    console.log(ifHandeCanGoStraight)
    return command;
}

const getEndHandleCommand = (C: Point,D: Point,terminalRecord: LineRecord | undefined)=>{
    return '';
}
const getHandleCommand = (line: Line, allKeyPoints: Point[])=>{
    const [A,B] = allKeyPoints;
    const C = allKeyPoints[allKeyPoints.length-2], D = allKeyPoints[allKeyPoints.length-1];
    const { departureRecord } = line;
    const terminalRecord = line.getTerminalRecord();
    const startHandleCommand = getStartHandleCommand(A,B,departureRecord!);
    const endHandleCommand = getEndHandleCommand(C,D,terminalRecord);
    const LQLPoints = getLPLPoints(allKeyPoints);
    return {startHandleCommand, LQLPoints, endHandleCommand}
}
const clearHandleFromRecord = (lineRecord: LineRecord | undefined)=>{
    if(lineRecord){
          const {station, line} = lineRecord;  
          station.handlers.forEach((handle, index)=>{
                if(handle === line){
                    station.handlers[index] = null;
                }
            })
    }else{
        console.error('no linerecord to clear handle');
    }

}
const clearHandle = (line:Line)=>{
    const { departureRecord } = line;
    const terminalRecord = line.getTerminalRecord();
    clearHandleFromRecord(departureRecord);
    clearHandleFromRecord(terminalRecord);
}




export {getHandleCommand, clearHandle};

