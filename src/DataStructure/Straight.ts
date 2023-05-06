import { Direction } from "./Direction";
import { Line } from "./Line";
import { Point } from "./Point";
import { Rail } from "./Rail";
import { Station } from "./Station";
import { Track } from "./Track";
import { Vector } from "./Vector";

export class Straight {
  // round 1 : filter empty rails
  static round1(B: Station, C: Station) {
    const direction = new Vector(B.position, C.position);
    const bTrack = B.getTrack(direction);
    const cTrack = C.getTrack(direction.opposite());
    const initScores = [0, 1, 2];
    let max = 0;
    const round1Indexes = initScores
      .map((index) => {
        let score = 0;
        // if rail in bTrack is empty, this rail add one score
        if (bTrack.rails[index].line.empty) {
          score++;
        }
        // if rail in cTrack is empty, this rail add one score
        if (cTrack.rails[Rail.oppositeIndex(index)].line.empty) {
          score++;
        }
        // record the highest score
        if (score > max) {
          max = score;
        }
        return { index, score };
      })
      .filter(({ score }) => {
        // find the highest score indexes
        return score === max;
      });
    return round1Indexes;
  }

  // round 2 : filter straight pass rails
  static round2(
    B: Station,
    C: Station,
    round1Indexes: RoundResult[],
    line: Line
  ) {
    const direction = new Vector(B.position, C.position);
    const bLineRecord = B.getJoint(line);
    const cLineRecord = C.getJoint(line);
    let max = 0;
    const round2Indexes = round1Indexes
      .map(({ index }) => {
        let score = 0;
        if (
          bLineRecord?.lastRail?.track.direction.oppositeTo(direction) &&
          bLineRecord?.lastRail?.oppositeIndex() === index
        ) {
          score++;
        }
        if (
          cLineRecord?.nextRail?.track.direction.sameTo(direction) &&
          cLineRecord?.nextRail?.index === index
        ) {
          score++;
        }
        if (score > max) {
          max = score;
        }
        return { index, score };
      })
      .filter(({ score }) => {
        // find the highest score indexes
        return score === max;
      });
    return round2Indexes;
  }

  // round 3 : filter center rails
  static round3(B: Station, C: Station, round2Indexes: RoundResult[]) {
    const round3Res = round2Indexes.find(({ index }) => index === 1);
    return round3Res ? 1 : 0;
  }

  // round 4 : filter most close to the last or next rail
  static round4(B: Station, C: Station, line: Line) {
    const direction = new Vector(B.position, C.position);
    const bLineRecord = B.getJoint(line);
    const cLineRecord = C.getJoint(line);
    let zeroRailScore = 0;
    let secondRailScore = 0;
    if (bLineRecord?.lastRail)
      if (bLineRecord.lastRail.track.direction.rotationTo(direction) > 0)
        zeroRailScore++;
      else secondRailScore++;

    if (cLineRecord?.nextRail)
      if (cLineRecord.nextRail.track.direction.rotationTo(direction) > 0)
        zeroRailScore++;
      else secondRailScore++;

    return zeroRailScore > secondRailScore ? 0 : 2;
  }

  static getBestRailIndex(B: Station, C: Station, line: Line) {
    if (B._dev_tag === "B" && line._dev_tag === "line8") {
      // debugger;
    }
    // round 1:
    const round1Indexes = Straight.round1(B, C);
    if (round1Indexes.length === 1) {
      return round1Indexes[0].index;
    }
    // round 2:
    const round2Indexes = Straight.round2(B, C, round1Indexes, line);
    if (round2Indexes.length === 1) {
      return round2Indexes[0].index;
    }
    // round 3:
    const round3Index = Straight.round3(B, C, round2Indexes);
    if (round3Index === 1) {
      return round3Index;
    }
    // round 4:
    const round4Index = Straight.round4(B, C, line);
    return round4Index;
  }
}

class RoundResult {
  score!: number;
  index!: number;
}
