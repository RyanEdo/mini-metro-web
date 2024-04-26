import { Station } from "./../DataStructure/Station";
import {
  Direct,
  Direction,
  DirectionVictorReverseY,
} from "../DataStructure/Direction";
import { Line } from "../DataStructure/Line";
import { LineRecord } from "../DataStructure/LineRecord";
import { Point } from "../DataStructure/Point";
import { Vector } from "../DataStructure/Vector";
import { handleLength, handleWidth } from "../Common/const";

const getLPLPoints = (allKeyPoints: Point[]) => {
  const LQLPoints = allKeyPoints.slice();
  // LQLPoints.pop();
  // LQLPoints.shift();
  return LQLPoints;
};

const checkIfStraightTrackHasHanderOrLine = (
  direction: Direction,
  station: Station
) => {
  const { direct } = direction.opposite();
  return station.handlers[direct] || !station.tracks[direct].isEmpty();
};
const checkifHandeCanGoStraight = (
  outDirection: Direction,
  station: Station
) => {
  const ifStraightTrackHasHander = !checkIfStraightTrackHasHanderOrLine(
    outDirection,
    station
  );
  return ifStraightTrackHasHander;
};
const getDepartureGoStraightHandeCommand = (A: Point, B: Point) => {
  const BA = new Vector(B, A);
  const C = BA.prolong(handleLength);
  const BC = new Vector(B, C);
  const [D, E] = BC.verticalProlong(handleWidth);
  return `M ${D.x} ${D.y} L ${E.x} ${E.y} M ${C.x} ${C.y}`;
};
const addHandleForStation = (station: Station, line: Line, direct: Direct) => {
  station.handlers[direct] = line;
};
const getBestDirectionForHandle = (station: Station, direction: Direction) => {
  let min = Infinity,
    bestChoice = 0;
  for (let i = 0; i < station.handlers.length; i++) {
    const notEmpty = station.handlers[i] || !station.tracks[i].isEmpty();
    if (!notEmpty) {
      const delta = direction.opposite().delta(i);
      if (delta < min) {
        bestChoice = i;
        min = delta;
      }
    }
  }
  return bestChoice;
};
const getDepartureBestChoiceHandeCommand = (
  A: Point,
  B: Point,
  pathStartPoint: Point
) => {
  const F = pathStartPoint;
  const AB = new Vector(A, B);
  const C = AB.prolong(handleLength - 1);
  const BC = new Vector(B, C);
  const [D, E] = BC.verticalProlong(handleWidth);
  return `M ${D.x} ${D.y} L ${E.x} ${E.y} M ${C.x} ${C.y} L ${A.x} ${A.y} L ${F.x} ${F.y}`;
};
const getBestChoiceHandleCommand = (
  station: Station,
  direction: Direction,
  pathStartPoint: Point,
  line: Line
) => {
  const handleDirect = getBestDirectionForHandle(station, direction);
  if (handleDirect === undefined) {
    return ` M  ${pathStartPoint.x} ${pathStartPoint.y}`;
  } else {
    const A = station.position;
    const [x, y] = DirectionVictorReverseY[handleDirect];
    const B = new Point(A.x + x, A.y + y);
    addHandleForStation(station, line!, handleDirect);
    return getDepartureBestChoiceHandeCommand(A, B, pathStartPoint);
  }
};
const getStartHandleCommand = (
  A: Point,
  B: Point,
  departureRecord: LineRecord
) => {
  let command = "";
  const outDirection = departureRecord?.getOutDirection();
  const { station, line } = departureRecord;
  const ifHandeCanGoStraight = checkifHandeCanGoStraight(
    outDirection!,
    station
  );
  if (ifHandeCanGoStraight) {
    command = getDepartureGoStraightHandeCommand(A, B);
    addHandleForStation(station, line!, outDirection!.opposite().direct);
  } else {
    command = getBestChoiceHandleCommand(station, outDirection!, A, line!);
  }
  return command;
};

const getTerminalGoStraightHandeCommand = (C: Point, D: Point) => {
  const CD = new Vector(C, D);
  const E = CD.prolong(handleLength);
  const CE = new Vector(C, E);
  const [F, G] = CE.verticalProlong(handleWidth);
  return ` L ${E.x} ${E.y} M ${F.x} ${F.y} L ${G.x} ${G.y}`;
};

const getTerminalBestChoiceHandeCommand = (
  A: Point,
  B: Point,
  pathEndPoint: Point
) => {
  const F = pathEndPoint;
  const AB = new Vector(A, B);
  const C = AB.prolong(handleLength - 1);
  const BC = new Vector(B, C);
  const [D, E] = BC.verticalProlong(handleWidth);
  return `L ${F.x} ${F.y} L ${A.x} ${A.y} L ${C.x} ${C.y}   M ${D.x} ${D.y} L ${E.x} ${E.y} `;
};

const getBestChoiceTerminalHandleCommand = (
  station: Station,
  direction: Direction,
  pathStartPoint: Point,
  line: Line
) => {
  const handleDirect = getBestDirectionForHandle(station, direction);
  if (handleDirect === undefined) {
    return ` L  ${pathStartPoint.x} ${pathStartPoint.y}`;
  } else {
    const A = station.position;
    const [x, y] = DirectionVictorReverseY[handleDirect];
    const B = new Point(A.x + x, A.y + y);
    addHandleForStation(station, line!, handleDirect);
    return getTerminalBestChoiceHandeCommand(A, B, pathStartPoint);
  }
};

const getEndHandleCommand = (
  C: Point,
  D: Point,
  terminalRecord: LineRecord
) => {
  let command = "";
  const inDirection = terminalRecord?.getInDirection();
  const { station, line } = terminalRecord;
  const ifHandeCanGoStraight = checkifHandeCanGoStraight(inDirection!, station);
  if (ifHandeCanGoStraight) {
    command = getTerminalGoStraightHandeCommand(C, D);
    addHandleForStation(station, line!, inDirection!.opposite().direct);
  } else {
    command = getBestChoiceTerminalHandleCommand(
      station,
      inDirection!,
      D,
      line!
    );
  }
  return command;
};
const getHandleCommand = (line: Line, allKeyPoints: Point[]) => {
  const [A, B] = allKeyPoints;
  const C = allKeyPoints[allKeyPoints.length - 2],
    D = allKeyPoints[allKeyPoints.length - 1];
  const { departureRecord, displayLine } = line;
  const { subLine } = displayLine!;
  const terminalRecord = line.getTerminalRecord();
  let startHandleCommand = getStartHandleCommand(A, B, departureRecord!);
  let endHandleCommand = ` L ${A.x} ${A.y}`; // loop line
  if (!(departureRecord?.station === terminalRecord?.station)) {
    endHandleCommand = getEndHandleCommand(C, D, terminalRecord!);
  }
  const LQLPoints = getLPLPoints(allKeyPoints);
  // subline no need handler in joint
  if (
    subLine &&
    departureRecord?.station?.lineCount &&
    departureRecord?.station?.lineCount() >= 2
  ) {
    startHandleCommand = ` M ${A.x} ${A.y} `;
  }
  if (
    subLine &&
    terminalRecord?.station?.lineCount &&
    terminalRecord?.station?.lineCount() >= 2
  ) {
    endHandleCommand = "";
  }
  return { startHandleCommand, LQLPoints, endHandleCommand };
};
const clearHandleFromRecord = (lineRecord: LineRecord | undefined) => {
  if (lineRecord) {
    const { station, line } = lineRecord;
    station.handlers.forEach((handle, index) => {
      if (handle === line) {
        station.handlers[index] = null;
      }
    });
  } else {
    console.error("no linerecord to clear handle");
  }
};
const clearHandle = (line: Line) => {
  const { departureRecord } = line;
  const terminalRecord = line.getTerminalRecord();
  clearHandleFromRecord(departureRecord);
  clearHandleFromRecord(terminalRecord);
};

export { getHandleCommand, clearHandle };
