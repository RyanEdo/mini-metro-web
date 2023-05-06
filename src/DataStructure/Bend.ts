import { Rail } from "./Rail";
import { Track } from "./Track";

export class Bend {
  // filter empty indexes
  static round1(track: Track) {
    const emptyRails = track.getEmptyRails().map((rail) => rail.index);
    if (emptyRails.length) return emptyRails;
    return [0, 1, 2];
  }
  // filter opposite rails
  static round2(track: Track, round1Indexes: number[], rail?: Rail) {
    // rail not exist or in/out rail direction not just opposite to the candidate rail direction
    if (!rail || !rail.track.direction.oppositeTo(track.direction))
      return round1Indexes;
    return round1Indexes.filter(
      (railIndex) => rail.oppositeIndex() === railIndex
    );
  }
  // filter center rail
  static round3(round2Indexes: number[]) {
    if (round2Indexes.find((railIndex) => railIndex === 1)) return 1;
  }

  // filter most close rail
  static round4(track: Track, rail?: Rail) {
    if (!rail) return 0;
    return rail.track.direction.rotationTo(track.direction) > 0 ? 0 : 2;
  }

  static getBestRailIndex(track: Track, rail?: Rail) {
    const round1Indexes = this.round1(track);
    if (round1Indexes.length === 1) return round1Indexes[0];
    const round2Indexes = this.round2(track, round1Indexes, rail);
    if (round2Indexes.length === 1) return round2Indexes[0];
    const round3Res = this.round3(round2Indexes);
    if (round3Res === 1) return 1;
    const round4Res = this.round4(track, rail);
    return round4Res;
  }
}
