import React, { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { Line } from "../../DataStructure/Line";
import { Station } from "../../DataStructure/Station";
import { DisplayStation } from "../../DataStructure/Display";
import { LineCard } from "./LineCard";
import "./Cards.scss";
import { StationCard } from "./StationCard";
import { UserDataType } from "../../Data/UserData";
import { browserInfo, mapToArr, onWheelX, onWheelY } from "../../Common/util";
import { showConfirmationInterface } from "../Delete/DeleteConfirmation";
import { FunctionMode } from "../../DataStructure/Mode";

export function Cards({
  data,
  setData,
  showConfirmation,
  menuRef,
}: {
  data: UserDataType;
  setData: Dispatch<SetStateAction<UserDataType>>;
  showConfirmation?: showConfirmationInterface;
  menuRef: RefObject<any>;
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
        <div className="card-container">
          <LineCard
            setData={setData}
            line={line}
            data={data}
            key={"line-card-" + line.lineId}
            showConfirmation={showConfirmation}
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
