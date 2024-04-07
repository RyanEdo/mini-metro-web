import React, { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { Line } from "../../DataStructure/Line";
import { Station } from "../../DataStructure/Station";
import { DisplayStation } from "../../DataStructure/Display";
import { LineCard } from "./LineCard";
import "./Cards.scss";
import { StationCard } from "./StationCard";
import { InsertInfo, UserDataType } from "../../Data/UserData";
import { browserInfo, mapToArr, onWheelX, onWheelY } from "../../Common/util";
import { showConfirmationInterface } from "../Delete/DeleteConfirmation";
import { FunctionMode } from "../../DataStructure/Mode";

export function Cards({
  data,
  setData,
  showConfirmation,
  menuRef,
  functionMode,
  setFuntionMode,
  insertInfo,
  setInsertInfo,
}: {
  data: UserDataType;
  setData: Dispatch<SetStateAction<UserDataType>>;
  showConfirmation?: showConfirmationInterface;
  menuRef: RefObject<any>;
  functionMode: FunctionMode;
  setFuntionMode: React.Dispatch<React.SetStateAction<FunctionMode>>;
  insertInfo?: InsertInfo;
  setInsertInfo: React.Dispatch<React.SetStateAction<InsertInfo|undefined>>;
}) {
  const { lines, stations } = data;
  const { engine } = browserInfo;
  return (
    <div
      className="cards"
      onWheel={onWheelX}
      style={engine.name === "WebKit" ? { pointerEvents: "auto", height: 370, paddingTop:70 } : {}}
    >
      {mapToArr(lines).map((line) => (
        <div className="card-container"
        >
          <LineCard
            setData={setData}
            line={line}
            data={data}
            key={"line-card-" + line.lineId}
            showConfirmation={showConfirmation}
            functionMode={functionMode}
            setFuntionMode={setFuntionMode}
            insertInfo={insertInfo}
            setInsertInfo={setInsertInfo}
          />
        </div>
      ))}
      {mapToArr(stations).map((station) => (
        <div className="card-container">
          <StationCard
            setData={setData}
            station={station}
            data={data}
            key={"station-card-" + station.stationId}
            showConfirmation={showConfirmation}
            menuRef={menuRef}
          />
        </div>
      ))}
    </div>
  );
}
