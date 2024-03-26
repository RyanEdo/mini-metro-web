import React, { Dispatch, SetStateAction } from "react";
import DevelopLayer from "./DevelopLayer";
import { LineCard } from "../Card/LineCard";
import { Cards } from "../Card/Cards";
import { LineProps, StationProps, UserDataType } from "../../Data/UserData";
import { Station } from "../../DataStructure/Station";
import { Point } from "../../DataStructure/Point";
import { mapToArr } from "../../Common/util";
import { Line } from "../../DataStructure/Line";
import LineRender from "../Component/LineRender";
class RenderProps {
  data!: UserDataType;
  setData!: Dispatch<SetStateAction<UserDataType>>;
}
const buildStations = (
  stations: Map<string | number, StationProps>
): Map<number, Station> => {
  const stationMap = new Map();
  mapToArr(stations).forEach((station) => {
    const { position, stationId } = station;
    const [x, y] = position;
    const dStation = new Station(new Point(x, y));
    stationMap.set(stationId, dStation);
  });
  return stationMap;
};

const buildLines = (
  lines: Map<string | number, LineProps>,
  stationMap: Map<number, Station>
) => {
  const lineMap = new Map();
  mapToArr(lines).forEach((line) => {
    const { stationIds, lineId } = line;
    const dStations = stationIds.map((stationId) => {
      const dStation = stationMap.get(stationId)!;
      return dStation;
    });
    const dLine = new Line();
    dLine.linkAll(dStations);
    lineMap.set(lineId, dLine);
  });
  return lineMap;
};

const renderStations = (allStationsList: Station[]) => {
  return (
    <div>
      {allStationsList.map((station, index) => (
        <div
          style={{
            position: "absolute",
            left: station.position.x,
            top: station.position.y,
          }}
        >
          {String.fromCharCode("A".charCodeAt(0) + index)}
        </div>
      ))}
    </div>
  );
};

const renderLines = (allLinesList: Line[]) => {
  return (
    <div>
      {allLinesList.map((line) => {
        return <LineRender line={line} />;
      })}
    </div>
  );
};

function RenderLayer({ data, setData }: RenderProps) {
  const { lines, stations } = data;
  const stationMap = buildStations(stations);
  const lineMap = buildLines(lines, stationMap);
  const allStationsList = mapToArr(stationMap);
  const allLinesList = mapToArr(lineMap);
  return (
    <div className="RenderLayer">
      {renderStations(allStationsList)}
      {renderLines(allLinesList)}
      {/* <DevelopLayer /> */}
    </div>
  );
}

export default RenderLayer;
