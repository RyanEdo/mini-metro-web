import { CardShowing, ChangeSteps, RecordType, StationProps, UserDataType, addNewStation } from "./../Data/UserData";
import {
  WheelEvent,
  Dispatch,
  SetStateAction,
  MouseEvent,
  TouchEvent,
} from "react";
import { FunctionMode, Mode } from "../DataStructure/Mode";
import { Point } from "../DataStructure/Point";
import React from "react";

const sensitivity = -0.0006;

const scaleByPointer = (
  scaleRatio: number,
  translateX: number,
  translateY: number,
  refPoint: Point
) =>
  new Point(
    refPoint.x - scaleRatio * (refPoint.x - translateX),
    refPoint.y - scaleRatio * (refPoint.y - translateY)
  );

export const onWheel = (
  event: WheelEvent<HTMLDivElement>,
  preScale: number,
  setScale: Dispatch<SetStateAction<number>>,
  translateX: number,
  translateY: number,
  setTranslateX: Dispatch<SetStateAction<number>>,
  setTranslateY: Dispatch<SetStateAction<number>>,
  functionMode: FunctionMode,
) => {
  const { deltaY, clientX, clientY } = event;

  const nextScale = deltaY * sensitivity + preScale;
  const scaleRatio = nextScale / preScale;
  const refPoint = new Point(clientX, clientY);
  if (nextScale > 0.1 || (functionMode ===FunctionMode.editingCustomBackgroundPosition && nextScale > 0)) {
    const transform = scaleByPointer(
      scaleRatio,
      translateX,
      translateY,
      refPoint
    );
    setTranslateX(transform.x);
    setTranslateY(transform.y);
    setScale(nextScale);
  }
};

export const onMouseDown = (
  event: MouseEvent<HTMLDivElement>,
  translateX: number,
  translateY: number,
  setEditingMode: Dispatch<SetStateAction<Mode>>,
  setMouseRefPoint: Dispatch<SetStateAction<Point>>,
  setMouseStartTranslate: Dispatch<React.SetStateAction<Point>>,
  setMoved: Dispatch<SetStateAction<boolean>>
) => {
  const point = Point.getPointFromMouse(event);
  setMouseRefPoint(point);
  setEditingMode(Mode.moving);
  setMouseStartTranslate(new Point(translateX, translateY));
  setMoved(false);
};

export const onMouseMove = (
  event: MouseEvent<HTMLDivElement>,
  translateX: number,
  translateY: number,
  setTranslateX: Dispatch<SetStateAction<number>>,
  setTranslateY: Dispatch<SetStateAction<number>>,
  editingMode: Mode,
  mouseRefPoint: Point,
  mouseStartTranslate: Point,
  setMoved: Dispatch<SetStateAction<boolean>>
) => {
  // setMoved(true);
  switch (editingMode) {
    case Mode.moving: {
      // console.log(event);
      const point = Point.getPointFromMouse(event);
      const displacement = point.displacementTo(mouseRefPoint);
      const distance = point.distanceTo(mouseRefPoint);
      if(distance>5) setMoved(true);  
      setTranslateX(mouseStartTranslate.x + displacement.x);
      setTranslateY(mouseStartTranslate.y + displacement.y);
      break;
    }
  }
};

export const onMouseUp = (
  event: MouseEvent<HTMLDivElement>,
  setEditingMode: Dispatch<SetStateAction<Mode>>,
  editingMode: Mode,
  functionMode: FunctionMode,
  data: UserDataType,
  setData: Dispatch<SetStateAction<UserDataType>>,
  moved: boolean,
  translateX: number,
  translateY: number,
  scale: number,
  record: RecordType,
  setRecord: React.Dispatch<React.SetStateAction<RecordType>>,
  currentRecordIndex: number,
  setCurrentRecordIndex: React.Dispatch<React.SetStateAction<number>>,
  cardShowing: CardShowing,
  setCardShowing: Dispatch<SetStateAction<CardShowing>>,
) => {
  // console.log(event);
  setEditingMode(Mode.normal);
  if (functionMode === FunctionMode.addingStation && !moved) {
    console.log({ translateX, translateY, scale });
    const { clientX, clientY } = event;
    const x = (clientX - translateX) / scale;
    const y = (clientY - translateY) / scale;
    addNewStation(
      data,
      setData,
      x,
      y,
      record as StationProps[],
      setRecord,
      currentRecordIndex,
      setCurrentRecordIndex,
      cardShowing,
      setCardShowing,
    );
  }
  const {currentTarget, target} = event;
  if(currentTarget === target && !moved){
    setCardShowing({});
  }
};

export const onMouseLeave = (
  event: MouseEvent<HTMLDivElement>,
  setEditingMode: Dispatch<SetStateAction<Mode>>
) => {
  // console.log(event);
  setEditingMode(Mode.normal);
};

export const onTouchStart = (
  event: TouchEvent<HTMLDivElement>,
  setEditingMode: Dispatch<SetStateAction<Mode>>,
  setTouchRefPoint: Dispatch<SetStateAction<Point>>,
  setTouchStartDistance: Dispatch<SetStateAction<number>>,
  setTouchStartScale: Dispatch<SetStateAction<number>>,
  scale: number,
  setTouchStartTranslate: Dispatch<SetStateAction<Point>>,
  translateX: number,
  translateY: number,
  setMoved: Dispatch<SetStateAction<boolean>>
) => {
  event.preventDefault();
  const { touches } = event;
  // record touch start translate position
  setTouchStartTranslate(new Point(translateX, translateY));
  setMoved(false);

  switch (touches.length) {
    //one finger
    case 1: {
      const touch = touches[0];
      setTouchRefPoint(Point.getPointFromTouch(touch));
      setEditingMode(Mode.touchMoving);
      break;
    }
    //two finger
    case 2: {
      const touchA = touches[0];
      const touchB = touches[1];
      const pointA = Point.getPointFromTouch(touchA);
      const pointB = Point.getPointFromTouch(touchB);
      setTouchRefPoint(Point.getMidPoint(pointA, pointB));
      setEditingMode(Mode.touchScaling);
      //start touch distance
      const distance = pointA.distanceTo(pointB);
      setTouchStartDistance(distance);
      setTouchStartScale(scale);
      break;
    }
  }
};

export const onTouchMove = (
  event: TouchEvent<HTMLDivElement>,
  editingMode: Mode,
  touchRefPoint: Point,
  translateX: number,
  translateY: number,
  setTranslateX: Dispatch<SetStateAction<number>>,
  setTranslateY: Dispatch<SetStateAction<number>>,
  touchStartDistance: number,
  touchStartScale: number,
  setScale: Dispatch<SetStateAction<number>>,
  touchStartTranslate: Point,
  setMoved: Dispatch<SetStateAction<boolean>>
) => {
  event.preventDefault();
  const { touches } = event;
  setMoved(true);
  // console.log(event, touches.length, editingMode);
  switch (touches.length) {
    //one finger
    case 1: {
      if (editingMode === Mode.touchMoving) {
        const touch = touches[0];
        const point = Point.getPointFromTouch(touch);
        // console.log(touchRefPoint);
        const displacement = point.displacementTo(touchRefPoint);
        setTranslateX(displacement.x + touchStartTranslate.x);
        setTranslateY(displacement.y + touchStartTranslate.y);
      }
      break;
    }
    //two finger
    case 2: {
      if (editingMode === Mode.touchScaling) {
        const touchA = touches[0];
        const touchB = touches[1];
        const pointA = Point.getPointFromTouch(touchA);
        const pointB = Point.getPointFromTouch(touchB);

        // for scale
        const distance = pointA.distanceTo(pointB);
        const nextScale = (touchStartScale * distance) / touchStartDistance;
        setScale(nextScale);

        // for translate
        const midPoint = Point.getMidPoint(pointA, pointB);
        const scaleRatio = nextScale / touchStartScale;
        const transform = scaleByPointer(
          scaleRatio,
          touchStartTranslate.x,
          touchStartTranslate.y,
          touchRefPoint
        );
        //displacement between preMidPoint and midPoint
        const displacement = midPoint.displacementTo(touchRefPoint);
        setTranslateX(displacement.x + transform.x);
        setTranslateY(displacement.y + transform.y);
      }
      break;
    }
  }
};

export const onTouchEnd = (
  event: TouchEvent<HTMLDivElement>,
  setEditingMode: Dispatch<SetStateAction<Mode>>,
  editingMode: Mode,
  functionMode: FunctionMode,
  data: UserDataType,
  setData: Dispatch<SetStateAction<UserDataType>>,
  moved: boolean,
  translateX: number,
  translateY: number,
  scale: number,
  record: RecordType,
  setRecord: React.Dispatch<React.SetStateAction<RecordType>>,
  currentRecordIndex: number,
  setCurrentRecordIndex: React.Dispatch<React.SetStateAction<number>>,
  cardShowing: CardShowing,
  setCardShowing: Dispatch<SetStateAction<CardShowing>>,
) => {
  event.preventDefault();
  const { changedTouches } = event;
  // console.log(event,editingMode);
  if (
    functionMode === FunctionMode.addingStation &&
    !moved &&
    changedTouches.length === 1
  ) {
    const touch = changedTouches[0];
    console.log({ touch, translateX, translateY, scale });
    const { clientX, clientY } = touch;
    const x = (clientX - translateX) / scale;
    const y = (clientY - translateY) / scale;
    addNewStation(
      data,
      setData,
      x,
      y,
      record as StationProps[],
      setRecord,
      currentRecordIndex,
      setCurrentRecordIndex,
      cardShowing,
      setCardShowing,
    );
  }
  const {currentTarget, target} = event;
  if(currentTarget === target && !moved){
    setCardShowing({});
  }
  setEditingMode(Mode.normal);
};
