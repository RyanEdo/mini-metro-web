import { Direction } from "./Direction";
import { Line } from "./Line";
import { Point } from "./Point";
import { Station } from "./Station";
import { Track } from "./Track";
import { Vector } from "./Vector";

export class Straight {
  // round 1 : filter empty rails
  static round1(B: Station, C: Station) {
    const direction = new Vector(B.position, C.position);
    const bTrack = B.getTrack(direction);
    const cTrack = C.getTrack(direction.opposite());
    const initScores = [0, 0, 0];
    let max = 0;
    const round1Indexes = initScores
      .map((index) => {
        let score = 0;
        // if rail in bTrack is empty, this rail add one score
        if (bTrack.rails[index].line.empty) {
          score++;
        }
        // if rail in cTrack is empty, this rail add one score
        if (cTrack.rails[index].line.empty) {
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
    let max = 0;
    const round3Indexes = round2Indexes
      .map(({ index }) => {
        let score = 0;
        if (index === 1) {
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
    return round3Indexes;
  }

  // round 4 : filter most close to the last or next rail
  static round4(
    B: Station,
    C: Station,
    line: Line
  ) {
    const direction = new Vector(B.position, C.position);
    const bLineRecord = B.getJoint(line);
    const cLineRecord = C.getJoint(line);
    let zeroRailScore = 0;
    let secondRailScore = 0;
    if (bLineRecord?.lastRail)
      if (bLineRecord.lastRail.track.direction.opposite().sideTo(direction) < 0)
        zeroRailScore++;
      else secondRailScore++;

    if (cLineRecord?.nextRail)
      if (cLineRecord.nextRail.track.direction.sideTo(direction) > 0)
        zeroRailScore++;
      else secondRailScore++;

    return zeroRailScore > secondRailScore ? 0 : 2;
  }
}

class RoundResult {
  score!: number;
  index!: number;
}
