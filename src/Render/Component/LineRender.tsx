import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Line } from "../../DataStructure/Line";
import { Point } from "../../DataStructure/Point";

import {
  generateLineCommand,
  getAllKeyPoints,
  getRoundedPoints,
} from "../../Line/LinePoints";
import { clearHandle, getHandleCommand } from "../../Line/Handle";
import { gauge } from "../../Common/const";
import { CardShowing } from "../../Data/UserData";

function LineRender({
  line,
  cardShowing,
  setCardShowing,
  command,
}: {
  line: Line;
  cardShowing: CardShowing;
  setCardShowing: Dispatch<SetStateAction<CardShowing>>;
  command: string;
}) {
  const { displayLine } = line;
  const { color, lineId } = displayLine!;
  // let command = "",
  //   allKeyPoints: Point[] = [];
  // if (line.departureRecord?.nextLineRecord) {
  //   allKeyPoints = getAllKeyPoints(line);
  //   clearHandle(line);
  //   const { startHandleCommand, LQLPoints, endHandleCommand } =
  //     getHandleCommand(line, allKeyPoints);
  //   const roundedPoints = getRoundedPoints(LQLPoints);
  //   const pathCommand = generateLineCommand(roundedPoints);
  //   command = startHandleCommand + pathCommand + endHandleCommand;
  // }

  // useEffect(() => {
  //   return () => {
  //     clearHandle(line);
  //   };
  // }, []);
  const renderPoints = (keyPoints: Point[]) => {
    return (
      <div>
        {keyPoints.map((P) => (
          <div
            style={{
              position: "absolute",
              left: P.x,
              top: P.y,
              fontSize: 1,
              color: "gray",
            }}
          >
            {/* {`x:${P.x.toFixed()},y:${P.y.toFixed()}`} */}
          </div>
        ))}
      </div>
    );
  };
  const [moved, setMoved] = useState(false);
  const onClick = ()=>{
    if(!moved){
      setCardShowing({lineIds:[lineId]})

    }
}
  return (
    <>
      <div style={{ position: "absolute" }}>
        <svg width="200" height="200" style={{ overflow: "visible" }}>
          {/* <path fill="transparent" stroke="black" d={MCommand + LCommand} /> */}
          <path
            // fill="transparent"
            // stroke-linecap="round" 
            fill="none" 
            stroke={`${color}`}
            d={command}
            stroke-width={gauge}
            style={{cursor: "pointer"}}
            onMouseDown={()=>setMoved(false)}
            onTouchStart={()=>setMoved(false)}
            onTouchMove={()=>setMoved(true)}
            onMouseMove={()=>setMoved(true)}
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
