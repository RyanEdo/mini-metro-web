import React, { useState } from "react";
import { Line } from "../../DataStructure/Line";
import { LineRecord } from "../../DataStructure/LineRecord";
import { Point } from "../../DataStructure/Point";
import { Direct, Direction } from "../../DataStructure/Direction";
import { Rail } from "../../DataStructure/Rail";
import { gauge } from "../../Common/const";
import { Vector } from "../../DataStructure/Vector";

function LineRender({ line }: { line: Line }) {
  const getTurningPoint = (
    A: Point,B: Point,aDirection: Direction,bDirection: Direction
  ) => {
    const aVector = Vector.getVectorByPointAndDirection(A,aDirection);
    const bVector = Vector.getVectorByPointAndDirection(B,bDirection);
    const crossPoint = aVector.getCrossPointTo(bVector);
    return crossPoint;
  };
  const getOffsetPointFromDirectionAndRail = (
    point: Point,
    direction: Direction,
    rail: Rail
  ) => {
    const directionOffset = [
      [0, -1],
      [Math.SQRT1_2, -Math.SQRT1_2],
      [1, 0],
      [Math.SQRT1_2, Math.SQRT1_2],
      [0, 1],
      [-Math.SQRT1_2, Math.SQRT1_2],
      [-1, 0],
      [-Math.SQRT1_2, -Math.SQRT1_2],
    ];
    const offsetIndex = (direction.direct + rail.index - 1 + 8) % 8;
    const offset = directionOffset[offsetIndex];
    const [offsetX, offsetY] = offset.map((x) => x * gauge);
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
  const getPointsBetweenStations = (lineRecord: LineRecord) => {
    const { nextLineRecord } = lineRecord;
    if (nextLineRecord) {
      const AOffsetPoint = getStartOffsetPointOfStation(lineRecord);
      const BOffsetPoint = getEndOffsetPointOfStation(nextLineRecord);
      if (
        lineRecord
          .getOutDirection()!
          .oppositeTo(nextLineRecord.getInDirection())
      ) {
        //direct to next station
        return [AOffsetPoint, BOffsetPoint];
      } else {
        //has turning
        const turningPoint = getTurningPoint(
          AOffsetPoint,
          BOffsetPoint,
          lineRecord.getOutDirection()!,
          nextLineRecord.getInDirection()!,
        );
        return [AOffsetPoint, turningPoint, BOffsetPoint];
      }
    } else throw new Error("No NextLineRecord!");
    return [];
  };

  // keypoints record all points to draw line
  const getAllKeyPoints = (line: Line) => {
    let lineRecord = line.departureStation;
    let keyPoints: Point[] = [];
    if(!lineRecord) throw new Error('no departureStation')
    while (lineRecord.nextLineRecord) {
        const pointsBetweenStations = getPointsBetweenStations(lineRecord);
        keyPoints = keyPoints.concat(pointsBetweenStations);
        lineRecord = lineRecord.nextLineRecord;
        if(lineRecord === line.departureStation) break;
    }
    return keyPoints;
  };

  const keyPoints =  getAllKeyPoints(line);
  const [firstPoint] = keyPoints;
  const MCommand = `M ${firstPoint.x} ${firstPoint.y} `
  const LCommand = keyPoints.map(P=>` L ${P.x} ${P.y} `).join('');
    return <div style={{position: 'absolute'}}>
        <svg width="200" height="200" style={{overflow: 'visible'}}>
            <path fill="transparent" stroke="black" d={MCommand+LCommand} />
            {/* <circle cx="10" cy="10" r="2" fill="red" /> */}
        </svg>
    </div>;
}

export default LineRender;
