import React, { Dispatch, SetStateAction, useState } from "react";
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
import { CardShowing, ChangeSteps, InsertInfo, StationProps, UserDataType } from "../../Data/UserData";
class ScaleLayerProp {
  editingMode!: Mode;
  setEditingMode!: React.Dispatch<React.SetStateAction<Mode>>;
  data!: UserDataType;
  setData!: Dispatch<SetStateAction<UserDataType>>;
  functionMode!: FunctionMode;
  setFunctionMode!: React.Dispatch<React.SetStateAction<FunctionMode>>;
  record!: StationProps[] | ChangeSteps[];
  setRecord!: React.Dispatch<
    React.SetStateAction<StationProps[] | ChangeSteps[]>
  >;
  currentRecordIndex!: number;
  setCurrentRecordIndex!: React.Dispatch<React.SetStateAction<number>>;
  insertInfo?: InsertInfo;
  setInsertInfo!: React.Dispatch<React.SetStateAction<InsertInfo|undefined>>;
  cardShowing!: CardShowing;
  setCardShowing!: Dispatch<SetStateAction<CardShowing>>;
}
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
}: ScaleLayerProp) {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [scale, setScale] = useState(1);
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
  const style = {
    transform: `translate(${translateX}px,${translateY}px) scale(${scale})`,
  };

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
          setCardShowing,
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
          setCardShowing,
        )
      }
      style={{ cursor: getCursor(editingMode) }}
    >
      <div className="transform-layer" style={style}>
        <RenderLayer
          data={data}
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
        />
      </div>
    </div>
  );
}

export default ScaleLayer;
