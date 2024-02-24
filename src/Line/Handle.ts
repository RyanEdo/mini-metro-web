import { Line } from "../DataStructure/Line";
import { LineRecord } from "../DataStructure/LineRecord";
import { Point } from "../DataStructure/Point";

const getLPLPoints = (allKeyPoints: Point[])=> {
    const LQLPoints = allKeyPoints.slice();
    LQLPoints.pop();
    LQLPoints.shift();
    return LQLPoints;
}
const getStartHandleCommand = (A: Point,B: Point,departureRecord: LineRecord | undefined)=>{
    return '';
}

const getEndHandleCommand = (C: Point,D: Point,terminalRecord: LineRecord | undefined)=>{
    return '';
}
const getHandleCommand = (line: Line, allKeyPoints: Point[])=>{
    const [A,B] = allKeyPoints;
    const C = allKeyPoints[allKeyPoints.length-2], D = allKeyPoints[allKeyPoints.length-1];
    const { departureRecord } = line;
    const terminalRecord = line.getTerminalRecord();
    const startHandleCommand = getStartHandleCommand(A,B,departureRecord);
    const endHandleCommand = getEndHandleCommand(C,D,terminalRecord);
    const LQLPoints = getLPLPoints(allKeyPoints);
    return {startHandleCommand, LQLPoints, endHandleCommand}
}

const clearHandle = (line:Line)=>{

}




export {getHandleCommand, clearHandle};

