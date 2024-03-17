import React, { useEffect, useState } from "react";
import { Line } from "../../DataStructure/Line";
import { Station } from "../../DataStructure/Station";
import { DisplayStation } from "../../DataStructure/Display";
import "./LineCard.scss";
import arrowIcon from "../../Resource/Icon/arrow.right.circle.fill.svg";
import expendIcon from "../../Resource/Icon/expend-icon.svg";
import shrinkIcon from "../../Resource/Icon/shrink-icon.svg";

import classNames from "classnames";
export function LineCard() {
  const mock = {
    lineId: 1,
    lineName: "1号线",
    stations: [
      ["蒙德站", true],
      ["风起地站", false],
      ["鹰翔海滩", true],
      ["星落湖", true],
      ["望风山地", true],
      ["达达乌帕谷", true],
      ["蒙德站", true],
      ["风起地站", false],
      ["鹰翔海滩", true],
      ["星落湖", true],
      ["望风山地", true],
      ["达达乌帕谷", true],
    ].map(
      ([stationName, bendFirst]) =>
        new DisplayStation(stationName.toString(), !!bendFirst)
    ),
  };
  const { lineName, stations } = mock;
  const firstStation = stations[0];
  const lastStation = stations[stations.length - 1];
  const [expend, setExpend] = useState(false);
  const [expendWidth, setExpendWidth] = useState(455);
  const getExpendWidth = () => {
    const expected = 33 + 161 * stations.length;
    const width =
      expected > window.innerWidth ? window.innerWidth - 100 : expected;
      console.log(width)
    setExpendWidth(width);
  };
  useEffect(() => {
    window.addEventListener("resize", getExpendWidth);
    return ()=>window.removeEventListener("resize", getExpendWidth);
  }, [stations]);
  useEffect(() => {
    getExpendWidth();
  }, [expend]);
  return (
    <div
      className={classNames({ "line-card": 1, "expend-card": expend })}
      style={expend ? { width: expendWidth } : {}}
    >
      <div className="tools">
        <div className="edit"></div>
        <div className="expend" onClick={() => setExpend(!expend)}>
          <img
            className="expend-icon"
            src={expend ? shrinkIcon : expendIcon}
          ></img>
        </div>
      </div>
      <div className="line-name">{lineName}</div>
      <div className="stations-count">{stations.length}个站点</div>
      <div className="from-to">
        从{firstStation.stationName}开往{lastStation.stationName}
      </div>
      <div className="station-bar" style={expend ? { width: expendWidth} : {}}>
        <div className="add-first"></div>
        {stations.map((station) => {
          const { stationName, bendFirst } = station;
          return (
            <div className="station-block">
              <div className="track">
                <div className="sleeper"></div>
                <div className="sleeper"></div>
                <div className="sleeper"></div>
              </div>
              <div className="bend-first">
                <img
                  src={arrowIcon}
                  className={classNames({ "bend-icon": 1, bend: bendFirst })}
                ></img>
                <div className="bend-des">
                  {bendFirst ? "斜向优先" : "直线优先"}
                </div>
              </div>
              <div className="station-name">{stationName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
