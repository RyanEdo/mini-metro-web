import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Line } from "../../DataStructure/Line";
import { Station } from "../../DataStructure/Station";
import { DisplayStation } from "../../DataStructure/Display";
import "./LineCard.scss";
import arrowIcon from "../../Resource/Icon/arrow.right.circle.fill.svg";
import expendIcon from "../../Resource/Icon/expend-icon.svg";
import shrinkIcon from "../../Resource/Icon/shrink-icon.svg";
import EditIcon from "../../Resource/Icon/edit.svg";

import classNames from "classnames";
import { LineProps, UserDataType, useData } from "../../Data/UserData";
export function LineCard({
  line,
  setData,
  data,
}: {
  line: LineProps;
  setData: Dispatch<SetStateAction<UserDataType>>;
  data: UserDataType
}) {
  const { lineId, lineName, stationIds } = line;
  const { getStationById, getStationsInThisLine } = useData(
    lineId,
    setData,
    data
  );
  const firstStation = getStationById(stationIds[0]);
  const lastStation = getStationById(stationIds[stationIds.length - 1]);
  const [expend, setExpend] = useState(false);
  const [edit, setEdit] = useState(false);
  const [expendWidth, setExpendWidth] = useState(455);
  const [tab, setTab] = useState("name");
  const getExpendWidth = () => {
    const expected = 33 + 161 * stationIds.length;
    const width =
      expected > window.innerWidth ? window.innerWidth - 100 : expected;
    console.log(width);
    setExpendWidth(width);
  };
  useEffect(() => {
    window.addEventListener("resize", getExpendWidth);
    return () => window.removeEventListener("resize", getExpendWidth);
  }, [stationIds]);
  useEffect(() => {
    getExpendWidth();
  }, [expend]);
  const editTools = (tab: string) => {
    switch (tab) {
      case "name": {
        return (
          <div className="name-detail">
            <div className="name-item sign">
              <div className="title">标识</div>
              <input className="sign-input" value={1}></input>
            </div>
            <div className="name-item line-name-item">
              <div className="title">名称</div>
              <input className="line-name-input" value={lineName}></input>
            </div>
            <div className="name-item order">
              <div className="title">排序</div>
              <input className="order-input" value={1} type="number"></input>
            </div>
          </div>
        );
      }
      case "color": {
        return (
          <div className="color-detail">
            <div className="color-detail-choosing">
              {new Array(10).fill(1).map((x) => {
                const randomColor = () => {
                  const r = Math.floor(Math.random() * 255);
                  const g = Math.floor(Math.random() * 255);
                  const b = Math.floor(Math.random() * 255);
                  return "rgba(" + r + "," + g + "," + b + ",1)";
                };
                const color = randomColor();
                return (
                  <div
                    className={classNames({
                      "color-preview": 1,
                      "color-selected": 1,
                    })}
                    style={{ borderColor: color }}
                  >
                    <div
                      className="color-preview-inner"
                      style={{ backgroundColor: color }}
                    ></div>
                  </div>
                );
              })}
            </div>
            <div className="custom-color">
              <div className="selected-color-preview">
                <input className="color-input" type="color" />
                <input className="color-value" value={"E54242"}></input>
              </div>
            </div>
          </div>
        );
      }
      case "operation": {
        return (
          <div className="operation-detail">
            <div className="operation-item delete">删除线路...</div>
          </div>
        );
      }
    }
  };
  return (
    <div
      className={classNames({ "line-card": 1, "expend-card": expend })}
      style={expend ? { width: expendWidth } : {}}
    >
      <div className="tools">
        {expend || edit ? (
          <></>
        ) : (
          <div
            className="edit tool-item"
            onClick={() => {
              setEdit(true);
              setTab("name");
            }}
          >
            <EditIcon className="edit-icon"></EditIcon>
          </div>
        )}
        {edit ? (
          <></>
        ) : (
          <div className="expend tool-item" onClick={() => setExpend(!expend)}>
            <img
              className="expend-icon"
              src={expend ? shrinkIcon : expendIcon}
            ></img>
          </div>
        )}
      </div>
      <div className="stations-count">{stationIds.length}个站点</div>
      <div className="line-name">{lineName}</div>
      {edit ? (
        <div className="edit-detail">{editTools(tab)}</div>
      ) : (
        <>
          <div className="from-to">
            从{firstStation!.stationName}开往{lastStation!.stationName}
          </div>
          <div
            className="station-bar"
            style={expend ? { width: expendWidth } : {}}
            onWheel={(event) => {
              const { currentTarget, deltaY } = event;
              currentTarget.scrollBy({
                top: 0,
                left: deltaY,
                behavior: "auto",
              });
            }}
          >
            <div className="add-first"></div>
            {getStationsInThisLine().map((station) => {
              const { stationName, bendFirst } = station!;
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
                      className={classNames({
                        "bend-icon": 1,
                        bend: bendFirst,
                      })}
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
        </>
      )}

      {
        <div className={classNames({ "edit-panel": 1, edit })}>
          <div
            className={classNames({
              "edit-tools": 1,
            })}
          >
            <div
              className={classNames({
                "edit-tool name": 1,
                selected: tab === "name",
              })}
              onClick={() => setTab("name")}
            >
              <div className="title">名称</div>
              <div className="value">1号线</div>
            </div>
            <div
              className={classNames({
                "edit-tool color": 1,
                selected: tab === "color",
              })}
              onClick={() => setTab("color")}
            >
              <div className="title">颜色</div>
              <div className="value">品红</div>
            </div>
            <div
              className={classNames({
                "edit-tool operation": 1,
                selected: tab === "operation",
              })}
              onClick={() => setTab("operation")}
            >
              <div className="title">操作</div>
              <div className="value">删除</div>
            </div>
          </div>

          <div className="done" onClick={() => setEdit(false)}>
            <EditIcon className="done-icon" />
            <span className="done-des">完成</span>
          </div>
        </div>
      }
    </div>
  );
}
