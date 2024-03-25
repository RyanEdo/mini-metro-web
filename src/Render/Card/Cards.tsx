import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Line } from "../../DataStructure/Line";
import { Station } from "../../DataStructure/Station";
import { DisplayStation } from "../../DataStructure/Display";
import { LineCard } from "./LineCard";
import "./Cards.scss";
import { StationCard } from "./StationCard";
import { UserDataType } from "../../Data/UserData";
import { mapToArr } from "../../Common/util";
import { showConfirmationInterface } from "../Delete/DeleteConfirmation";

export function Cards({
  data,
  setData,
  showConfirmation,
}: {
  data: UserDataType;
  setData: Dispatch<SetStateAction<UserDataType>>;
  showConfirmation?: showConfirmationInterface;
}) {
  const { lines, stations } = data;
  return (
    <div className="cards">
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
        />
      ))}
    </div>
  );
}
