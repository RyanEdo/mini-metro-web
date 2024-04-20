import React, {
  CSSProperties,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import DevelopLayer from "./DevelopLayer";
import { LineCard } from "../Card/LineCard";
import { Cards } from "../Card/Cards";
import {
  CardShowing,
  ChangeSteps,
  InsertInfo,
  LineChanges,
  LineProps,
  RecordType,
  StationProps,
  UserDataType,
  dataProcessor,
} from "../../Data/UserData";
import { Station } from "../../DataStructure/Station";
import { Point } from "../../DataStructure/Point";
import { mapToArr } from "../../Common/util";
import { Line } from "../../DataStructure/Line";
import LineRender from "../Component/LineRender";
import shapes, { shapesWithStyle } from "../../Resource/Shape/shape";
import "./RenderLayer.scss";
import { FunctionMode, Mode } from "../../DataStructure/Mode";
import { Direct } from "../../DataStructure/Direction";
import { clearHandle, getHandleCommand } from "../../Line/Handle";
import {
  getAllKeyPoints,
  getRoundedPoints,
  generateLineCommand,
} from "../../Line/LinePoints";
class RenderProps {
  data!: UserDataType;
  setData!: Dispatch<SetStateAction<UserDataType>>;
  functionMode!: FunctionMode;
  record!: RecordType;
  setRecord!: React.Dispatch<React.SetStateAction<RecordType>>;
  currentRecordIndex!: number;
  setCurrentRecordIndex!: React.Dispatch<React.SetStateAction<number>>;
  translateX!: number;
  translateY!: number;
  scale!: number;
  insertInfo?: InsertInfo;
  setInsertInfo!: React.Dispatch<React.SetStateAction<InsertInfo | undefined>>;
  setFunctionMode!: React.Dispatch<React.SetStateAction<FunctionMode>>;
  cardShowing!: CardShowing;
  setCardShowing!: Dispatch<SetStateAction<CardShowing>>;
  editingMode!: Mode;
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

const renderLines = (
  allLinesList: Line[],
  cardShowing: CardShowing,
  setCardShowing: Dispatch<SetStateAction<CardShowing>>,
  commandMap: Map<Line, string>,
  data: UserDataType,
  setData: Dispatch<SetStateAction<UserDataType>>
) => {
  return (
    <div>
      {allLinesList.map((line) => {
        const command = commandMap.get(line);
        return (
          <LineRender
            command={command!}
            line={line}
            cardShowing={cardShowing}
            setCardShowing={setCardShowing}
            data={data}
            setData={setData}
          />
        );
      })}
    </div>
  );
};

function RenderLayer({
  data,
  setData,
  functionMode,
  setFunctionMode,
  record,
  setRecord,
  currentRecordIndex,
  setCurrentRecordIndex,
  translateX,
  translateY,
  scale,
  insertInfo,
  setInsertInfo,
  cardShowing,
  setCardShowing,
  editingMode,
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
      if (functionMode === FunctionMode.dragingStation && mouseDown) {
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
      if (functionMode === FunctionMode.dragingStation && mouseDown) {
        setCardShowing({ stationIds: [stationId] });
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
      if (functionMode === FunctionMode.dragingStation && mouseDown) {
        const { touches } = e as TouchEvent;
        if (touches.length === 1) {
          e.stopPropagation();
          const touch = touches[0];
          const { clientX, clientY } = touch;
          console.log(clientX, clientY);
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
      if (functionMode === FunctionMode.dragingStation && mouseDown) {
        const { changedTouches } = e as TouchEvent;
        if (changedTouches.length === 1) {
          e.stopPropagation();
          const touch = changedTouches[0];
          const { clientX, clientY } = touch;
          const toX = (clientX - translateX) / scale;
          const toY = (clientY - translateY) / scale;
          console.log("touch end:", clientX, clientY);
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
  const [moved, setMoved] = useState(false);
  const operationStart = (
    e: React.MouseEvent | React.TouchEvent,
    station: Station
  ) => {
    setMoved(false);
    if (functionMode === FunctionMode.dragingStation) {
      e.stopPropagation();
      setMouseDown(true);
      setStationBeingDrag(station);
    }
  };
  const renderStations = (allStationsList: Station[]) => {
    return (
      <div>
        {allStationsList.map((station, index) => {
          const { displayStation, position } = station;
          const { x, y } = position;
          const {
            stationName,
            shape,
            stationId,
            lineIds: stationLineIds,
          } = displayStation!;
          const add = () => {
            if (!moved) setCardShowing({ stationIds: [stationId] });
            if (functionMode === FunctionMode.selectingStation) {
              const { insertIndex, line } = insertInfo!;
              const { lineId } = line;
              const { addStationToLine } = dataProcessor(lineId, setData, data);
              addStationToLine(stationId, insertIndex);
              setInsertInfo({
                insertIndex: insertIndex ? insertIndex + 1 : 0,
                line,
              });
              const newRecord = record.slice(
                0,
                currentRecordIndex + 1
              ) as LineChanges[];
              setRecord(
                newRecord.concat([
                  { stationId, lineId, stationIndex: insertIndex },
                ])
              );
              setCurrentRecordIndex(currentRecordIndex + 1);
              setCardShowing({ stationIds: [stationId], lineIds: [lineId] });

              // setFunctionMode(FunctionMode.lineEditing);
            }
          };
          const nameDirection: Direct = station.getBestDirectionForName();
          const SQRT1_2 = Math.SQRT1_2;
          const directionOffset = [
            [0, -1],
            [SQRT1_2, -SQRT1_2],
            [1, 0],
            [SQRT1_2, SQRT1_2],
            [0, 1],
            [-SQRT1_2, SQRT1_2],
            [-1, 0],
            [-SQRT1_2, -SQRT1_2],
          ];
          const k = 20; // distance from station to name
          const namePosition = directionOffset[nameDirection];
          const [dX, dY] = namePosition;
          const nameX = dX * k + x;
          const nameY = dY * k + y;
          const translate = [
            [-1, -2],
            [0, -2],
            [0, -1],
            [0, 0],
            [-1, 0],
            [-2, 0],
            [-2, -1],
            [-2, -2],
          ];
          const [tX, tY] = translate[nameDirection];
          const { lineIds, stationIds } = cardShowing;
          const emphasis = stationIds?.includes(stationId);
          const getEmphasisColor = (lineIds?: number[]) =>
            Array.isArray(lineIds) &&
            lineIds.length &&
            lines.get(lineIds[0])?.color;
          const emphasisColor =
            getEmphasisColor(lineIds) ||
            getEmphasisColor(stationLineIds) ||
            "#00000055";
          const nameStyle: CSSProperties = {
            position: "absolute",
            left: nameX,
            top: nameY,
            transform: `translate(${50 * tX}%,${50 * tY}%)`,
          };
          return (
            <div
              onMouseDown={(e) => operationStart(e, station)}
              onTouchStart={(e) => operationStart(e, station)}
              className="station-render"
              onTouchMove={() => setMoved(true)}
              onMouseMove={() => setMoved(true)}
              onTouchEnd={add}
              onClick={add}
            >
              <div
                className="station-shape"
                style={{
                  position: "absolute",
                  left: station.position.x - 15,
                  top: station.position.y - 15,
                  whiteSpace: "nowrap",
                }}
              >
                {emphasis && //@ts-ignore
                  shapesWithStyle(
                    {
                      fill: emphasisColor,
                      stroke: emphasisColor,
                    },
                    "shadow"
                  )[shape]}

                {
                  //@ts-ignore
                  shapesWithStyle({ zIndex: 100 })[shape]
                }
              </div>
              <div
                className="station-name"
                style={scale < 0.65 ? { display: "none" } : nameStyle}
                // style={{transform: `scale(${1/scale})`}}
              >
                {stationName}
              </div>
              {/* {String.fromCharCode("A".charCodeAt(0) + index)} */}
            </div>
          );
        })}
      </div>
    );
  };
  const commandMap = new Map<Line, string>();
  const calculateCommand = allLinesList.map((line) => {
    const { displayLine } = line;
    const { color, lineId } = displayLine!;
    let command = "",
      allKeyPoints: Point[] = [];
    if (line.departureRecord?.nextLineRecord) {
      allKeyPoints = getAllKeyPoints(line);
      clearHandle(line);
      const { startHandleCommand, LQLPoints, endHandleCommand } =
        getHandleCommand(line, allKeyPoints);
      const roundedPoints = getRoundedPoints(LQLPoints);
      const pathCommand = generateLineCommand(roundedPoints);
      command = startHandleCommand + pathCommand + endHandleCommand;
      commandMap.set(line, command);
    }
  });
  const stationComp = renderStations(allStationsList);

  const lineComp = renderLines(
    allLinesList,
    cardShowing,
    setCardShowing,
    commandMap,
    data,
    setData
  );

  return (
    <div className="RenderLayer">
      {lineComp}
      {stationComp}
      {/* <DevelopLayer /> */}
    </div>
  );
}

export default RenderLayer;
