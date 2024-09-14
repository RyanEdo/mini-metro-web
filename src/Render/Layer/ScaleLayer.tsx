import React, {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { FunctionMode, Mode } from "../../DataStructure/Mode";
import RenderLayer from "./RenderLayer";
import {
  onMouseDown,
  onMouseLeave,
  onMouseMove,
  onMouseUp,
  onTouchEnd,
  onTouchMove,
  onTouchStart,
  onWheel,
} from "../../Grid/Scale";
import "./ScaleLayer.scss";
import { getCursor } from "../../Style/Cursor";
import { Point } from "../../DataStructure/Point";
import {
  CardShowing,
  ChangeSteps,
  DrawProps,
  InsertInfo,
  PageProps,
  RecordType,
  ShowNameProps,
  StationProps,
  TransformProps,
  UserDataType,
} from "../../Data/UserData";
import { browserInfo, getBoundary, mapToArr } from "../../Common/util";

type ScaleLayerProp = {
  editingMode: Mode;
  setEditingMode: React.Dispatch<React.SetStateAction<Mode>>;
  data: UserDataType;
  setData: Dispatch<SetStateAction<UserDataType>>;
  functionMode: FunctionMode;
  setFunctionMode: React.Dispatch<React.SetStateAction<FunctionMode>>;
  record: RecordType;
  setRecord: React.Dispatch<React.SetStateAction<RecordType>>;
  currentRecordIndex: number;
  setCurrentRecordIndex: React.Dispatch<React.SetStateAction<number>>;
  insertInfo?: InsertInfo;
  setInsertInfo: React.Dispatch<React.SetStateAction<InsertInfo | undefined>>;
  cardShowing: CardShowing;
  setCardShowing: Dispatch<SetStateAction<CardShowing>>;
} & ShowNameProps &
  DrawProps &
  TransformProps &
  PageProps;
function ScaleLayer({
  editingMode,
  setEditingMode,
  data,
  setData,
  functionMode,
  setFunctionMode,
  record,
  setRecord,
  currentRecordIndex,
  setCurrentRecordIndex,
  insertInfo,
  setInsertInfo,
  cardShowing,
  setCardShowing,
  showName,
  setShowName,
  autoHiddenName,
  setAutoHiddenName,
  drawing,
  setDrawing,
  scale,
  setScale,
  translateX,
  translateY,
  setTranslateX,
  setTranslateY,
  page,
}: ScaleLayerProp) {
  // mouseRefPoint
  // in mouse drag mode: this point record mouse start point
  const [mouseRefPoint, setMouseRefPoint] = useState(new Point());
  // mouseStartTranslate
  // record translate position when mouse start
  // translate should add this value when mouse moving
  const [mouseStartTranslate, setMouseStartTranslate] = useState(new Point());

  // touchRefPoint
  // 1. in touch move mode: this point record touch start point
  // 2. in touch scale mode: this point record the center position of start touch
  const [touchRefPoint, setTouchRefPoint] = useState(new Point());
  // touchStartDistance
  // record distance between two finger touch points for scaling operation
  const [touchStartDistance, setTouchStartDistance] = useState(1);
  // touchStartScale
  // record the scale when touch start
  // the finnal scale will be calculated by this value
  const [touchStartScale, setTouchStartScale] = useState(1);
  // touchStartTranslate
  // record translate position when touch start
  // translate should add this value when touch moving
  const [touchStartTranslate, setTouchStartTranslate] = useState(new Point());
  // touches or mouse moved, that means user trying to scale or move, not adding station
  const [moved, setMoved] = useState(false);

  // translate and scale used for map or background image

  const { stations, backgroundColor, backgroundImage, opacity } = data;
  // const backgroundColor =
  //   _backgroundColor === "image" ? "transparent" : _backgroundColor;
  const allStationsList = mapToArr(stations);
  const { minX, minY, maxX, maxY } = getBoundary(data);
  const drawerX = maxX - minX + 400;
  const drawerY = maxY - minY + 400;
  const style: CSSProperties = {
    backgroundColor,
    transform: drawing
      ? `scale(2)`
      : `translate(${translateX}px,${translateY}px) scale(${scale})`,
    width: drawing ? drawerX * 2 : undefined,
    height: drawing ? drawerY * 2 : undefined,
  };
  const drawingStationMap = new Map();
  allStationsList.forEach((station) => {
    const { stationId } = station;
    const [x, y] = station.position;
    const position = [x - minX + 200, y - minY + 200];
    drawingStationMap.set(stationId, { ...station, position });
  });
  const drawingData = { ...data, stations: drawingStationMap };
  const { engine } = browserInfo;
  const webkit = engine.name === "WebKit";
  const display =
    stations.size > 100 && webkit && page === "menu" ? "none" : undefined;
  const imageSrc = useMemo(
    () => (backgroundImage ? URL.createObjectURL(backgroundImage) : undefined),
    [backgroundImage]
  );
  return (
    <div
      className="ScaleLayer"
      onWheel={(event) =>
        onWheel(
          event,
          scale,
          setScale,
          translateX,
          translateY,
          setTranslateX,
          setTranslateY
        )
      }
      onMouseDown={(event) =>
        onMouseDown(
          event,
          translateX,
          translateY,
          setEditingMode,
          setMouseRefPoint,
          setMouseStartTranslate,
          setMoved
        )
      }
      onMouseUp={(event) =>
        onMouseUp(
          event,
          setEditingMode,
          editingMode,
          functionMode,
          data,
          setData,
          moved,
          translateX,
          translateY,
          scale,
          record,
          setRecord,
          currentRecordIndex,
          setCurrentRecordIndex,
          cardShowing,
          setCardShowing
        )
      }
      onMouseLeave={(event) => onMouseLeave(event, setEditingMode)}
      onMouseMove={(event) =>
        onMouseMove(
          event,
          translateX,
          translateY,
          setTranslateX,
          setTranslateY,
          editingMode,
          mouseRefPoint,
          mouseStartTranslate,
          setMoved
        )
      }
      onTouchStart={(event) =>
        onTouchStart(
          event,
          setEditingMode,
          setTouchRefPoint,
          setTouchStartDistance,
          setTouchStartScale,
          scale,
          setTouchStartTranslate,
          translateX,
          translateY,
          setMoved
        )
      }
      onTouchMove={(event) =>
        onTouchMove(
          event,
          editingMode,
          touchRefPoint,
          translateX,
          translateY,
          setTranslateX,
          setTranslateY,
          touchStartDistance,
          touchStartScale,
          setScale,
          touchStartTranslate,
          setMoved
        )
      }
      onTouchEnd={(event) =>
        onTouchEnd(
          event,
          setEditingMode,
          editingMode,
          functionMode,
          data,
          setData,
          moved,
          translateX,
          translateY,
          scale,
          record,
          setRecord,
          currentRecordIndex,
          setCurrentRecordIndex,
          cardShowing,
          setCardShowing
        )
      }
      style={{ cursor: getCursor(editingMode), backgroundColor }}
    >
      <div className="layer-for-welcome-tour"></div>

      <div className="transform-layer" style={style}>
        <img
          className="background-layer"
          src={imageSrc}
          style={{
            opacity,
          }}
        />
        <RenderLayer
          data={drawing ? drawingData : data}
          setData={setData}
          translateX={translateX}
          translateY={translateY}
          scale={scale}
          functionMode={functionMode}
          setFunctionMode={setFunctionMode}
          record={record}
          setRecord={setRecord}
          currentRecordIndex={currentRecordIndex}
          setCurrentRecordIndex={setCurrentRecordIndex}
          insertInfo={insertInfo}
          setInsertInfo={setInsertInfo}
          cardShowing={cardShowing}
          setCardShowing={setCardShowing}
          editingMode={editingMode}
          showName={showName}
          setShowName={setShowName}
          autoHiddenName={autoHiddenName}
          setAutoHiddenName={setAutoHiddenName}
          drawing={drawing}
          setDrawing={setDrawing}
          drawerX={drawerX}
          drawerY={drawerY}
        />
      </div>
    </div>
  );
}

export default ScaleLayer;
