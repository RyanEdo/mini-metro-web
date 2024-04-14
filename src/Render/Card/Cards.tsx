import React, {
  CSSProperties,
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Line } from "../../DataStructure/Line";
import { Station } from "../../DataStructure/Station";
import { DisplayStation } from "../../DataStructure/Display";
import { LineCard } from "./LineCard";
import "./Cards.scss";
import { StationCard } from "./StationCard";
import { CardShowing, InsertInfo, UserDataType } from "../../Data/UserData";
import { browserInfo, mapToArr, onWheelX, onWheelY } from "../../Common/util";
import { showConfirmationInterface } from "../Delete/DeleteConfirmation";
import { FunctionMode } from "../../DataStructure/Mode";

export function Cards({
  data,
  setData,
  showConfirmation,
  menuRef,
  functionMode,
  setFunctionMode,
  insertInfo,
  setInsertInfo,
  cardShowing,
  setCardShowing,
}: {
  data: UserDataType;
  setData: Dispatch<SetStateAction<UserDataType>>;
  showConfirmation?: showConfirmationInterface;
  menuRef: RefObject<any>;
  functionMode: FunctionMode;
  setFunctionMode: React.Dispatch<React.SetStateAction<FunctionMode>>;
  insertInfo?: InsertInfo;
  setInsertInfo: React.Dispatch<React.SetStateAction<InsertInfo | undefined>>;
  cardShowing: CardShowing;
  setCardShowing: Dispatch<SetStateAction<CardShowing>>;
}) {
  const { lines, stations } = data;
  const { engine } = browserInfo;
  const [pointerEvents, setPointerEvents] = useState<"auto" | "none">("none");
  const { lineIds, stationIds, stationFirst } = cardShowing;
  const linesComp = lineIds?.map((lineId) => {
    const line = lines.get(lineId);
    if (line)
      return (
        <div className="card-container">
          <LineCard
            setData={setData}
            line={line}
            data={data}
            key={"line-card-" + line.lineId}
            showConfirmation={showConfirmation}
            functionMode={functionMode}
            setFunctionMode={setFunctionMode}
            insertInfo={insertInfo}
            setInsertInfo={setInsertInfo}
            menuRef={menuRef}
            cardShowing={cardShowing}
            setCardShowing={setCardShowing}
          />
        </div>
      );
  });
  const stationComp = stationIds?.map((stationId) => {
    const station = stations.get(stationId);
    if (station)
      return (
        <div className="card-container">
          <StationCard
            setData={setData}
            station={station}
            data={data}
            key={"station-card-" + station.stationId}
            showConfirmation={showConfirmation}
            menuRef={menuRef}
            functionMode={functionMode}
            setFunctionMode={setFunctionMode}
            insertInfo={insertInfo}
            setInsertInfo={setInsertInfo}
            cardShowing={cardShowing}
            setCardShowing={setCardShowing}
          />
        </div>
      );
  });
  const [style, setStyle] = useState<CSSProperties>();
  const handleStyle = () => {
    const style: CSSProperties =
      engine.name === "WebKit"
        ? { pointerEvents: "auto", height: 370, paddingTop: 70 }
        : {};
    if (
      ((stationIds?.length || 0) + (lineIds?.length || 0)) * 555  <
      window.innerWidth
    ) {
      style.paddingRight = 100;
      style.pointerEvents = "none";
    }
    setStyle(style);
  };

  useEffect(() => {
    handleStyle();
    window.addEventListener("resize", handleStyle);
    return () => window.removeEventListener("resize", handleStyle);
  }, [cardShowing]);
  return (
    <div
      className="cards"
      onWheel={onWheelX}
      style={style}
      // style={{pointerEvents}}
      onTouchStart={(e) => {
        const { target, currentTarget } = e;
        if (target === currentTarget) setPointerEvents("none");
        else setPointerEvents("auto");
      }}
    >
      {stationFirst ? stationComp : linesComp}
      {stationFirst ? linesComp : stationComp}
    </div>
  );
}
