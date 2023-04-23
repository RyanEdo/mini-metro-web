import React, { useState } from "react";
import { Mode } from "../DataStructure/Mode";
import RenderLayer from "./RenderLayer";
import {
  onMouseDown,
  onMouseLeave,
  onMouseMove,
  onMouseUp,
  onWheel,
} from "../Grid/Scale";
import "./ScaleLayer.scss";
import { getCursor } from "../Style.ts/Cursor";
class ScaleLayerProp {
  editingMode!: Mode;
  setEditingMode!: React.Dispatch<React.SetStateAction<Mode>>;
}
function ScaleLayer({ editingMode, setEditingMode }: ScaleLayerProp) {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, settranslateY] = useState(0);
  const [scale, setScale] = useState(1);
  const style = {
    transform: `translate(${translateX}px,${translateY}px) scale(${scale})`,
  };
  console.log(editingMode, getCursor(editingMode));

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
          settranslateY
        )
      }
      onMouseDown={(event) => onMouseDown(event, setEditingMode)}
      onMouseUp={(event) => onMouseUp(event, setEditingMode)}
      onMouseLeave={(event) => onMouseLeave(event, setEditingMode)}
      onMouseMove={(event) =>
        onMouseMove(event, translateX, translateY, setTranslateX, settranslateY, editingMode)
      }
      style={{ cursor: getCursor(editingMode) }}
    >
      <div className="transform-layer" style={style}>
        <RenderLayer />
      </div>
    </div>
  );
}

export default ScaleLayer;
