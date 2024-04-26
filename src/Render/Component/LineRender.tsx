import React, {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Line } from "../../DataStructure/Line";
import { Point } from "../../DataStructure/Point";

import {
  generateLineCommand,
  getAllKeyPoints,
  getRoundedPoints,
} from "../../Line/LinePoints";
import { clearHandle, getHandleCommand } from "../../Line/Handle";
import { gauge } from "../../Common/const";
import { CardShowing, DrawProps, DrawerSize, UserDataType } from "../../Data/UserData";

function LineRender({
  line,
  cardShowing,
  setCardShowing,
  command,
  data,
  setData,
  drawing,
  drawerX,drawerY
}: {
  line: Line;
  cardShowing: CardShowing;
  setCardShowing: Dispatch<SetStateAction<CardShowing>>;
  command: string;
  data: UserDataType;
  setData: Dispatch<SetStateAction<UserDataType>>;
} & DrawProps & DrawerSize) {
  const { stations } = data;
  const { displayLine, departureRecord } = line;
  const { color, lineId, subLine } = displayLine!;
  const { lineIds, stationIds } = cardShowing;
  const showing = lineIds?.length || stationIds?.length;
  console.log(stationIds &&
    stationIds.length === 1 &&
    stationIds[0] &&
    stations.get(stationIds[0]));
  const emphasis =
    lineIds?.includes(lineId) ||
    (stationIds &&
      stationIds.length === 1 &&
      stationIds[0] &&
      stations.get(stationIds[0]) &&
      stations.get(stationIds[0])?.lineIds?.includes(lineId));

  const [moved, setMoved] = useState(false);
  const onClick = () => {
    if (!moved) {
      setCardShowing({ lineIds: [lineId] });
    }
  };
  // let minX = Infinity,
  //   minY = Infinity,
  //   maxX = -Infinity,
  //   maxY = -Infinity,
  //   patchX = 0,
  //   patchY = 0;
  // let p = departureRecord;
  // while (p) {
  //   const { station } = p;
  //   const { position } = station;
  //   const { x, y } = position;
  //   minX = Math.min(x, minX);
  //   minY = Math.min(y, minY);
  //   maxX = Math.max(x, maxX);
  //   maxY = Math.max(y, maxY);
  //   p = p.nextLineRecord;
  // }
  // if (minX !== Infinity) {
  //   if (minX < 0) patchX = -minX;
  //   if (minY < 0) patchY = -minY;
  // }
  // const drawingStyle: CSSProperties = {};
  return (
    <>
      <div style={{ position: "absolute" }}>
        <svg width={drawing? drawerX: 300} height={drawing? drawerY:300} style={{ overflow: "visible" }}>
          {/* <path fill="transparent" stroke="black" d={MCommand + LCommand} /> */}
          <path
            // fill="transparent"
            // stroke-linecap="round"
            stroke-dasharray={subLine?'10,5': undefined}
            fill="none"
            stroke={showing && !emphasis ? `${color}55` : `${color}`}
            d={command}
            stroke-width={gauge}
            style={{ cursor: "pointer" }}
            onMouseDown={() => setMoved(false)}
            onTouchStart={() => setMoved(false)}
            onTouchMove={() => setMoved(true)}
            onMouseMove={() => setMoved(true)}
            onMouseUp={onClick}
            onTouchEnd={onClick}
          />

          {/* <circle cx="10" cy="10" r="2" fill="red" /> */}
        </svg>
      </div>
      {/* {renderPoints(allKeyPoints)} */}
    </>
  );
}

export default LineRender;
