import React, { useEffect } from "react";
import { Line } from "../../DataStructure/Line";
import { Point } from "../../DataStructure/Point";

import { generateLineCommand, getAllKeyPoints, getRoundedPoints } from "../../Line/LinePoints";
import { clearHandle, getHandleCommand } from "../../Line/Handle";

function LineRender({ line }: { line: Line }) {


  const allKeyPoints = getAllKeyPoints(line);
  clearHandle(line);
  const {startHandleCommand, LQLPoints, endHandleCommand} = getHandleCommand(line, allKeyPoints);
  const roundedPoints = getRoundedPoints(LQLPoints);
  const pathCommand = generateLineCommand(roundedPoints);
  const command = startHandleCommand + pathCommand + endHandleCommand;
  useEffect(() => {
    return ()=>{
      clearHandle(line);
    }
  }, [])
  const renderPoints = (keyPoints: Point[]) => {
    return (
      <div>
        {keyPoints.map((P) => (
          <div
            style={{
              position: "absolute",
              left: P.x,
              top: P.y,
              fontSize: 5,
              color: "gray",
            }}
          >
            {`x:${P.x.toFixed()},y:${P.y.toFixed()}`}
          </div>
        ))}
      </div>
    );
  };
  return (
    <>
      <div style={{ position: "absolute" }}>
        <svg width="200" height="200" style={{ overflow: "visible" }}>
          {/* <path fill="transparent" stroke="black" d={MCommand + LCommand} /> */}
          <path fill="transparent" stroke="black" d={command} />

          {/* <circle cx="10" cy="10" r="2" fill="red" /> */}
        </svg>
      </div>
      {renderPoints(allKeyPoints)}
    </>
  );
}

export default LineRender;
