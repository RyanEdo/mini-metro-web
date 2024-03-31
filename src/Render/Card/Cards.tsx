import React, { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { Line } from "../../DataStructure/Line";
import { Station } from "../../DataStructure/Station";
import { DisplayStation } from "../../DataStructure/Display";
import { LineCard } from "./LineCard";
import "./Cards.scss";
import { StationCard } from "./StationCard";
import { UserDataType } from "../../Data/UserData";
import { mapToArr, onWheelX, onWheelY } from "../../Common/util";
import { showConfirmationInterface } from "../Delete/DeleteConfirmation";
import { FunctionMode } from "../../DataStructure/Mode";

export function Cards({
  data,
  setData,
  showConfirmation,
  menuRef
}: {
  data: UserDataType;
  setData: Dispatch<SetStateAction<UserDataType>>;
  showConfirmation?: showConfirmationInterface;
  menuRef: RefObject<any>
}) {
  const { lines, stations } = data;
  return (
    <div
      className="cards"
      onWheel={onWheelX}
    >
      {mapToArr(lines).map((line) => (
        <LineCard
          setData={setData}
          line={line}
          data={data}
          key={"line-card-" + line.lineId}
          showConfirmation={showConfirmation}
        />
      ))}
      {mapToArr(stations).map((station) => (
        <StationCard
          setData={setData}
          station={station}
          data={data}
          key={"station-card-" + station.stationId}
          showConfirmation={showConfirmation}
          menuRef={menuRef}

        />
      ))}
    </div>
  );
}
