import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Line } from "../../DataStructure/Line";
import { Station } from "../../DataStructure/Station";
import { DisplayStation } from "../../DataStructure/Display";
import { LineCard } from "./LineCard";
import "./Cards.scss";
import { StationCard } from "./StationCard";
import { UserDataType } from "../../Data/UserData";

export function Cards({
  data,
  setData,
}: {
  data: UserDataType;
  setData: Dispatch<SetStateAction<UserDataType>>;
}) {
  const { lines, stations } = data;
  return (
    <div className="cards">
      {lines.map((line) => (
        <LineCard
          setData={setData}
          line={line}
          key={"line-card-" + line.lineId}
        />
      ))}
      {stations.map((station) => (
        <StationCard
          setData={setData}
          station={station}
          key={"station-card-" + station.stationId}
        />
      ))}
    </div>
  );
}
