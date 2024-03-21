import React, { useState } from "react";
import { Mode } from "../../DataStructure/Mode";
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
class ScaleLayerProp {
  editingMode!: Mode;
  setEditingMode!: React.Dispatch<React.SetStateAction<Mode>>;
}
function ScaleLayer({ editingMode, setEditingMode }: ScaleLayerProp) {
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
          setMouseStartTranslate
        )
      }
      onMouseUp={(event) => onMouseUp(event, setEditingMode)}
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
          mouseStartTranslate
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
          translateY
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
          touchStartTranslate
        )
      }
      onTouchEnd={(event) => onTouchEnd(event, setEditingMode)}
      style={{ cursor: getCursor(editingMode) }}
    >
      <div className="transform-layer" style={style}>
        <RenderLayer />
      </div>
    </div>
  );
}

export default ScaleLayer;