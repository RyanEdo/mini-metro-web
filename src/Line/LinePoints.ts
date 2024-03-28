import { gauge, line_radius } from "../Common/const";
import { Direction } from "../DataStructure/Direction";
import { Line } from "../DataStructure/Line";
import { LineRecord } from "../DataStructure/LineRecord";
import { Point } from "../DataStructure/Point";
import { Rail } from "../DataStructure/Rail";
import { Vector } from "../DataStructure/Vector";

const getTurningPoint = (
  A: Point,
  B: Point,
  aDirection: Direction,
  bDirection: Direction
) => {
  const aVector = Vector.getVectorByPointAndDirection(A, aDirection);
  const bVector = Vector.getVectorByPointAndDirection(B, bDirection);
  const crossPoint = aVector.getCrossPointTo(bVector);
  return crossPoint;
};
const getOffsetPointFromDirectionAndRail = (
  point: Point,
  direction: Direction,
  rail: Rail
) => {
  if(rail.track.station.displayStation!.stationName==='风起地站' && rail.line.displayLine?.lineName==='2号线')
  debugger 
  const s = Math.SQRT1_2;

  // lean
  const directionOffset = [
    [[-1,0],[0,0],[1,0]],// 0 up
    [[-s,-s],[0,0],[s,s]],// 1 upRight
    [[0,-1],[0,0],[0,1]],// 2 right
    [[s,-s],[0,0],[-s,s]],// 3 rightDown
    [[-1,0],[0,0],[1,0]],// 4 down
    [[-s,-s],[0,0],[s,s]],// 5 downLeft
    [[0,1],[0,0],[0,-1]],// 6 left
    [[-s,s],[0,0],[s,-s]],// 7 leftUp
  ];

  // const directionOffset = [
  //   [0, -1],
  //   [SQRT1_2, -SQRT1_2],
  //   [1, 0],
  //   [SQRT1_2, SQRT1_2],
  //   [0, 1],
  //   [-SQRT1_2, SQRT1_2],
  //   [-1, 0],
  //   [-SQRT1_2, -SQRT1_2],
  // ];
  // const offsetIndex = (direction.direct + rail.index - 1 + 8) % 8;
  const offset = directionOffset[direction.direct];
  const [offsetX, offsetY] = offset[rail.index].map((x) => x * gauge);
  return new Point(offsetX + point.x, offsetY + point.y);
};
const getStartOffsetPointOfStation = (lineRecord: LineRecord) => {
  const { station, nextRail } = lineRecord;
  return getOffsetPointFromDirectionAndRail(
    station.position,
    nextRail!.track.direction,
    nextRail!
  );
};
const getEndOffsetPointOfStation = (lineRecord: LineRecord) => {
  const { station, lastRail } = lineRecord;
  return getOffsetPointFromDirectionAndRail(
    station.position,
    lastRail!.track.direction,
    lastRail!
  );
};
const getInOffsetPointOfStation = (lineRecord: LineRecord) => {
  const { station, lastRail } = lineRecord;
  return getOffsetPointFromDirectionAndRail(
    station.position,
    lastRail!.track.direction,
    lastRail!
  );
};
const getOutOffsetPointOfStation = (lineRecord: LineRecord) => {
  const { station, nextRail } = lineRecord;
  return getOffsetPointFromDirectionAndRail(
    station.position,
    nextRail!.track.direction,
    nextRail!
  );
};
const getPointsBetweenStations = (lineRecord: LineRecord) => {
  const { nextLineRecord } = lineRecord;
  if (nextLineRecord) {
    const AOffsetPoint = getStartOffsetPointOfStation(lineRecord);
    const BOffsetPoint = getEndOffsetPointOfStation(nextLineRecord);
    if (
      lineRecord.getOutDirection()!.oppositeTo(nextLineRecord.getInDirection())
    ) {
      //direct to next station
      return [AOffsetPoint, BOffsetPoint];
    } else {
      //has turning
      const turningPoint = getTurningPoint(
        AOffsetPoint,
        BOffsetPoint,
        lineRecord.getOutDirection()!,
        nextLineRecord.getInDirection()!
      );
      return [AOffsetPoint, turningPoint, BOffsetPoint];
    }
  } else throw new Error("No NextLineRecord!");
  return [];
};
const getPointsInStation = (lineRecord: LineRecord) => {
  const { nextLineRecord, lastLineRecord } = lineRecord;
  if (nextLineRecord && lastLineRecord) {
    const AOffsetPoint = getInOffsetPointOfStation(lineRecord);
    const BOffsetPoint = getOutOffsetPointOfStation(lineRecord);
    const inDirection = lineRecord.getInDirection();
    const outDirection = lineRecord.getOutDirection();
    // same point in and out
    if (
      AOffsetPoint.sameTo(BOffsetPoint) ||
      inDirection?.oppositeTo(outDirection)
    )
      return [];
    else {
      // same in same out, need two points
      if (inDirection?.sameTo(outDirection!)) {
        return [AOffsetPoint, BOffsetPoint];
      }
      const crossPointInStation = getTurningPoint(
        AOffsetPoint,
        BOffsetPoint,
        inDirection!,
        outDirection!
      );
      // if(crossPointInStation.x === Infinity) debugger
      // not same point, but cross in inPoint or outPoint
      if (
        crossPointInStation.sameTo(AOffsetPoint) ||
        crossPointInStation.sameTo(BOffsetPoint)
      )
        return [];
      return [crossPointInStation];
    }
  } else return [];
};
const isPointInStationInNextLine = ([A]: Point[], [B, C]: Point[]) => {
  if (A) {
    const BC = new Vector(B, C);
    return BC.passesThroughPoint(A);
  }
  return false;
};
// keypoints record all points to draw line
const getAllKeyPoints = (line: Line) => {
  let lineRecord = line.departureRecord;
  let keyPoints: Point[] = [];
  if (!lineRecord) {
    console.error("No DepartureStation!");
    return [];
  }
  while (lineRecord.nextLineRecord) {
    const pointsInStation = getPointsInStation(lineRecord);
    keyPoints = keyPoints.concat(pointsInStation);
    const pointsBetweenStations = getPointsBetweenStations(lineRecord);

    // cross point in next line, delete next line start point
    if (isPointInStationInNextLine(pointsInStation, pointsBetweenStations))
      pointsBetweenStations.shift();
    // next line start point is the same with this line's end,
    // delete next line start point
    if (
      keyPoints.length &&
      pointsBetweenStations[0].sameTo(keyPoints[keyPoints.length - 1])
    )
      pointsBetweenStations.shift();
    keyPoints = keyPoints.concat(pointsBetweenStations);
    lineRecord = lineRecord.nextLineRecord;
    if (lineRecord === line.departureRecord) break;
  }
  return keyPoints;
};

const deleteDuplicatedPoints = (keyPoints: Point[]) => {
  if (keyPoints.length <= 2) return keyPoints; // no need delete duplicate point
  const start = keyPoints[0],
    end = keyPoints[keyPoints.length - 1];
  const QKeyPoints: Point[] = [start];
  for (let i = 1; i < keyPoints.length - 1; i++) {
    const A = keyPoints[i - 1];
    const B = keyPoints[i];
    const C = keyPoints[i + 1];
    const AC = new Vector(A, C);
    const AB = new Vector(A, B);
    const BC = new Vector(B, C);
    if (!AC.passesThroughPointRound(B) || AB.direct !== BC.direct)
      QKeyPoints.push(B);
  }
  QKeyPoints.push(end);
  return QKeyPoints;
};

const addLPointsAroundQPoints = (qPoints: Point[]) => {
  if (qPoints.length <= 2) return qPoints; // no need add L points
  const start = qPoints[0],
    end = qPoints[qPoints.length - 1];
  const LQLKeyPoints: Point[] = [start];
  for (let i = 1; i < qPoints.length - 1; i++) {
    const A = qPoints[i - 1];
    const B = qPoints[i];
    const C = qPoints[i + 1];
    const BA = new Vector(B, A);
    const BC = new Vector(B, C);
    const BAOffsetPoint = BA.normalize(line_radius).end.offset(B);
    const BCOffsetPoint = BC.normalize(line_radius).end.offset(B);
    BAOffsetPoint.q_start = true;
    B.q = true;
    BCOffsetPoint.q_end = true;
    LQLKeyPoints.push(BAOffsetPoint);
    LQLKeyPoints.push(B);
    LQLKeyPoints.push(BCOffsetPoint);
  }
  LQLKeyPoints.push(end);
  return LQLKeyPoints;
};
const getRoundedPoints = (keyPoints: Point[]) => {
  const QKeyPoints = deleteDuplicatedPoints(keyPoints);
  const LQLPoints = addLPointsAroundQPoints(QKeyPoints);
  return LQLPoints;
};
const generateLineCommand = (LQLPoints: Point[]) => {
  if (LQLPoints.length <= 1) {
    console.error(
      "no enough point to draw line. now we have " + LQLPoints.length
    );
    return "";
  }
  const start = LQLPoints[0],
    end = LQLPoints[LQLPoints.length - 1];
  const MCommand = ``;
  const EndCommand = ` L ${end.x} ${end.y} `;
  let path = "";
  for (let i = 1; i < LQLPoints.length - 1; i++) {
    const P = LQLPoints[i];
    switch (true) {
      case P.q_start:
        path += ` L ${P.x} ${P.y} `;
        break;
      case P.q:
        path += ` Q ${P.x} ${P.y} `;
        break;
      case P.q_end:
        path += ` , ${P.x} ${P.y} `;
        break;
      default:
        throw new Error("no Point flag for command!");
    }
  }
  return MCommand + path + EndCommand;
};

export { getAllKeyPoints, getRoundedPoints, generateLineCommand };
