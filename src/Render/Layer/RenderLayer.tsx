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
import shapes from "../../Resource/Shape/shape";
import './RenderLayer.scss';
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
    dStation.displayStation = station;
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
    const { stationIds, lineId, bendFirst } = line;
    const dLine = new Line();
    dLine.displayLine = line;
    for(let i=1;i<stationIds.length;i++){
      const B = stationMap.get(stationIds[i-1])!;
      const C = stationMap.get(stationIds[i])!;
      const _bendFirst = bendFirst.has(stationIds[i-1]);
      dLine.link(B,C,_bendFirst);
    }
    lineMap.set(lineId, dLine);
  });
  return lineMap;
};

const renderStations = (allStationsList: Station[]) => {
  return (
    <div>
      {allStationsList.map((station, index) => {
        
        const {displayStation} = station;
        const {stationName, shape} = displayStation!;
        return(
        <div
          style={{
            position: "absolute",
            left: station.position.x - 15,
            top: station.position.y - 15,
          }}
          className="station-render"
        >
          <div className="station-shape">
          {
          //@ts-ignore
          shapes[shape]}
          </div>
          <div className="station-name">
          {stationName}</div>
          {/* {String.fromCharCode("A".charCodeAt(0) + index)} */}
        </div>
      )})}
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
      {renderLines(allLinesList)}

      {/* {renderStations(allStationsList)} */}
      {/* <DevelopLayer /> */}
    </div>
  );
}

export default RenderLayer;
