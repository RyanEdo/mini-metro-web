import { ConnectType } from "./ConnectType";
import { Line } from "./Line";
import { Rail } from "./Rail";
import { RailPair } from "./RailPair";
import { Station } from "./Station";

export class LineRecord {
  station: Station;
  line: Line | undefined;
  lastLineRecord: LineRecord | undefined;
  nextLineRecord: LineRecord | undefined;
  lastRail: Rail | undefined;
  nextRail: Rail | undefined;
  lastConnectType: ConnectType | undefined;
  nextConnectType: ConnectType | undefined;

  constructor(station: Station, line?: Line) {
    this.station = station;
    if (line) {
      this.line = line;
    }
  }

  establishConnectionTo(BRecord: LineRecord) {
    LineRecord.establishConnection(this, BRecord);
  }

  static establishConnection(ARecord: LineRecord, BRecord: LineRecord) {
    ARecord.nextLineRecord = BRecord;
    BRecord.lastLineRecord = ARecord;
  }

  // update the rail and connect type information for connectting 2 linerecords
  static updateLineRecords(
    ARecord: LineRecord,
    BRecord: LineRecord,
    railPair: RailPair,
    connectType: ConnectType
  ) {
    const { departureRail, arrivalRail } = railPair;
    ARecord.nextRail = departureRail;
    BRecord.lastRail = arrivalRail;
    ARecord.nextConnectType = connectType;
    BRecord.lastConnectType = connectType;
  }
}
