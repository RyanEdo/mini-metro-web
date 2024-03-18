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
    expendHorizental: true,
  };
  const { lineName, stations, expendHorizental } = mock;
  const firstStation = stations[0];
  const lastStation = stations[stations.length - 1];
  const [expend, setExpend] = useState(false);
  const getExpendWidth = () => {
    const expected = 33 + 162 * stations.length;
    const width =
      expected > window.innerWidth ? window.innerWidth - 100 : expected;
    return width;
  };
  const getExpendHeight = () => {
    const expected = 250 + 80.8 * Math.floor(stations.length / 3);
    const height =
      expected > window.innerHeight ? window.innerHeight - 100 : expected;
    return height;
  };
  const [expendWidth, setExpendWidth] = useState(getExpendWidth);
  const [expendHeight, setExpendHeight] = useState(getExpendHeight);
  useEffect(() => {
    const resize = () => {
      setExpendWidth(getExpendWidth());
      setExpendHeight(getExpendHeight());
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [stations]);
  console.log(expendHeight);
  return (
    <div
      className={classNames({ "line-card": 1, "expend-card": expend })}
      style={
        expend
          ? expendHorizental
            ? { width: 33 + 162 * 3, height: expendHeight }
            : { width: expendWidth }
          : {}
      }
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
      <div
        className={classNames({
            "station-bar": 1,
            "expend-horizental": expendHorizental && expend,
          })}
        style={
          expend
            ? expendHorizental
              ? { width: 33 + 3 * 162 }
              : { width: expendWidth }
            : {}
        }
      >
        <div className="add-first"></div>
        {stations.map((station, index) => {
          const { stationName, bendFirst } = station;
          return (
            <>
              {expendHorizental && expend && index % 3 === 0 && index !== 0 ? (
                <div className="extra-sleeper"></div>
              ) : (
                <></>
              )}
              <div
                className={classNames({
                  "station-block": 1,
            "expend-horizental": expendHorizental,

                })}
              >
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
            </>
          );
        })}
      </div>
    </div>
  );
}
