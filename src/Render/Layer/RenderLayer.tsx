import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import DevelopLayer from "./DevelopLayer";
import { LineCard } from "../Card/LineCard";
import { Cards } from "../Card/Cards";
import {
  ChangeSteps,
  LineProps,
  StationProps,
  UserDataType,
  dataProcessor,
} from "../../Data/UserData";
import { Station } from "../../DataStructure/Station";
import { Point } from "../../DataStructure/Point";
import { mapToArr } from "../../Common/util";
import { Line } from "../../DataStructure/Line";
import LineRender from "../Component/LineRender";
import shapes from "../../Resource/Shape/shape";
import "./RenderLayer.scss";
import { FunctionMode } from "../../DataStructure/Mode";
class RenderProps {
  data!: UserDataType;
  setData!: Dispatch<SetStateAction<UserDataType>>;
  funtionMode!: FunctionMode;
  record!: StationProps[] | ChangeSteps[];
  setRecord!: React.Dispatch<
    React.SetStateAction<StationProps[] | ChangeSteps[]>
  >;
  currentRecordIndex!: number;
  setCurrentRecordIndex!: React.Dispatch<React.SetStateAction<number>>;
  translateX!: number;
  translateY!: number;
  scale!: number;
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
    for (let i = 1; i < stationIds.length; i++) {
      const B = stationMap.get(stationIds[i - 1])!;
      const C = stationMap.get(stationIds[i])!;

      dLine.link(B, C, !!bendFirst[i - 1]);
    }
    lineMap.set(lineId, dLine);
  });
  return lineMap;
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

function RenderLayer({
  data,
  setData,
  funtionMode,
  record,
  setRecord,
  currentRecordIndex,
  setCurrentRecordIndex,
  translateX,
  translateY,
  scale,
}: RenderProps) {
  const { lines, stations } = data;
  const stationMap = buildStations(stations);
  const lineMap = buildLines(lines, stationMap);
  const allStationsList = mapToArr(stationMap);
  const allLinesList = mapToArr(lineMap);
  const [mouseDown, setMouseDown] = useState(false);
  const [stationBeingDrag, setStationBeingDrag] = useState<Station>();
  const mouseUp = (e: Event) => {
    setMouseDown(false);
    if (stationBeingDrag) {
      const { displayStation, position } = stationBeingDrag;
      const { stationId } = displayStation!;
      const { x: fromX, y: fromY } = position;
      const { setStationPosition } = dataProcessor(stationId, setData, data);
      if (funtionMode === FunctionMode.dragingStation && mouseDown) {
        const { clientX, clientY } = e as MouseEvent;
        const toX = (clientX - translateX) / scale;
        const toY = (clientY - translateY) / scale;
        setStationPosition(toX, toY);
        const newRecord = record.slice(
          0,
          currentRecordIndex + 1
        ) as ChangeSteps[];
        setRecord(newRecord.concat([{ stationId, fromX, fromY, toX, toY }]));
        setCurrentRecordIndex(currentRecordIndex + 1);
      }
      setStationBeingDrag(undefined);
    }
  };
  const mouseMove = (e: Event) => {
    if (stationBeingDrag) {
      const { displayStation } = stationBeingDrag;
      const { stationId } = displayStation!;
      const { setStationPosition } = dataProcessor(stationId, setData, data);
      if (funtionMode === FunctionMode.dragingStation && mouseDown) {
        const { clientX, clientY } = e as MouseEvent;
        const x = (clientX - translateX) / scale;
        const y = (clientY - translateY) / scale;
        setStationPosition(x, y);
      }
    }
  };

  const touchMove = (e: Event) => {
    if (stationBeingDrag) {
      const { displayStation } = stationBeingDrag;
      const { stationId } = displayStation!;
      const { setStationPosition } = dataProcessor(stationId, setData, data);
      if (funtionMode === FunctionMode.dragingStation && mouseDown) {
        const { touches } = e as TouchEvent;
        if (touches.length === 1) {
          e.stopPropagation();
          const touch = touches[0];
          const { clientX, clientY } = touch;
          console.log(clientX,clientY);
          const x = (clientX - translateX) / scale;
          const y = (clientY - translateY) / scale;
          setStationPosition(x, y);
        }
      }
    }
  };

  const touchEnd = (e: Event) => {
    setMouseDown(false);
    if (stationBeingDrag) {
      const { displayStation, position } = stationBeingDrag;
      const { stationId } = displayStation!;
      const { x: fromX, y: fromY } = position;
      const { setStationPosition } = dataProcessor(stationId, setData, data);
      if (funtionMode === FunctionMode.dragingStation && mouseDown) {
        const { changedTouches } = e as TouchEvent;
        if (changedTouches.length === 1) {
          e.stopPropagation();
          const touch = changedTouches[0];
          const { clientX, clientY } = touch;
          const toX = (clientX - translateX) / scale;
          const toY = (clientY - translateY) / scale;
          console.log('touch end:',clientX, clientY);
          setStationPosition(toX, toY);
          const newRecord = record.slice(
            0,
            currentRecordIndex + 1
          ) as ChangeSteps[];
          setRecord(newRecord.concat([{ stationId, fromX, fromY, toX, toY }]));
          setCurrentRecordIndex(currentRecordIndex + 1);
        }
      }
      setStationBeingDrag(undefined);
    }
  };
  useEffect(() => {
    const scaleLayer = document.querySelector(".ScaleLayer");
    scaleLayer?.addEventListener("mouseup", mouseUp);
    scaleLayer?.addEventListener("mouseleave", mouseUp);
    scaleLayer?.addEventListener("mousemove", mouseMove);
    scaleLayer?.addEventListener("touchmove", touchMove);
    scaleLayer?.addEventListener("touchend", touchEnd);
    return () => {
      scaleLayer?.removeEventListener("mouseup", mouseUp);
      scaleLayer?.removeEventListener("mouseleave", mouseUp);
      scaleLayer?.removeEventListener("mousemove", mouseMove);
      scaleLayer?.removeEventListener("touchmove", touchMove);
      scaleLayer?.removeEventListener("touchend", touchEnd);
    };
  }, [stationBeingDrag]);
  const operationStart = (
    e: React.MouseEvent | React.TouchEvent,
    station: Station
  ) => {
    if (funtionMode === FunctionMode.dragingStation) {
      e.stopPropagation();
      setMouseDown(true);
      setStationBeingDrag(station);
    }
  };
  const renderStations = (allStationsList: Station[]) => {
    return (
      <div>
        {allStationsList.map((station, index) => {
          const { displayStation } = station;
          const { stationName, shape } = displayStation!;
          return (
            <div
              onMouseDown={(e) => operationStart(e, station)}
              onTouchStart={(e) => operationStart(e, station)}
              style={{
                position: "absolute",
                left: station.position.x - 15,
                top: station.position.y - 15,
                whiteSpace: "nowrap",
              }}
              className="station-render"
            >
              <div className="station-shape">
                {
                  //@ts-ignore
                  shapes[shape]
                }
              </div>
              <div className="station-name">{stationName}</div>
              {/* {String.fromCharCode("A".charCodeAt(0) + index)} */}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="RenderLayer">
      {renderLines(allLinesList)}

      {renderStations(allStationsList)}
      {/* <DevelopLayer /> */}
    </div>
  );
}

export default RenderLayer;
