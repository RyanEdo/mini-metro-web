import { WheelEvent, Dispatch, SetStateAction, MouseEvent } from "react";
import { Mode } from "../DataStructure/Mode";
import { Point } from "../DataStructure/Point";

const sensitivity = -0.0006;

const scaleByPointer = (
  scaleRatio: number,
  translateX: number,
  translateY: number,
  clientX: number,
  clientY: number,
  setTranslateX: Dispatch<SetStateAction<number>>,
  setTranslateY: Dispatch<SetStateAction<number>>
) => {
  setTranslateX(clientX - scaleRatio * (clientX - translateX));
  setTranslateY(clientY - scaleRatio * (clientY - translateY));
};

export const onWheel = (
  event: WheelEvent<HTMLDivElement>,
  preScale: number,
  setScale: Dispatch<SetStateAction<number>>,
  translateX: number,
  translateY: number,
  setTranslateX: Dispatch<SetStateAction<number>>,
  setTranslateY: Dispatch<SetStateAction<number>>
) => {
  const { deltaY, clientX, clientY } = event;

  const nextScale = deltaY * sensitivity + preScale;
  const scaleRatio = nextScale / preScale;
  if (nextScale > 0.1) {
    scaleByPointer(
      scaleRatio,
      translateX,
      translateY,
      clientX,
      clientY,
      setTranslateX,
      setTranslateY
    );
    setScale(nextScale);
  }
};

export const onMouseDown = (
  event: MouseEvent<HTMLDivElement>,
  setEditingMode: Dispatch<SetStateAction<Mode>>
) => {
  console.log(event);
  setEditingMode(Mode.MOVING);
};

export const onMouseMove = (
  event: MouseEvent<HTMLDivElement>,
  translateX: number,
  translateY: number,
  setTranslateX: Dispatch<SetStateAction<number>>,
  setTranslateY: Dispatch<SetStateAction<number>>,
  editingMode: Mode
) => {
  console.log(event);
  const { movementX, movementY } = event;
  switch (editingMode) {
    case Mode.MOVING: {
      setTranslateX((translateX) => translateX + movementX);
      setTranslateY((translateY) => translateY + movementY);
    }
  }
};

export const onMouseUp = (
  event: MouseEvent<HTMLDivElement>,
  setEditingMode: Dispatch<SetStateAction<Mode>>
) => {
  console.log(event);
  setEditingMode(Mode.NORMAL);
};

export const onMouseLeave = (
  event: MouseEvent<HTMLDivElement>,
  setEditingMode: Dispatch<SetStateAction<Mode>>
) => {
  console.log(event);
  setEditingMode(Mode.NORMAL);
};
