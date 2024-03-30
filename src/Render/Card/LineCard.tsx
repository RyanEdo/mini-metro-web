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
import { mapToArr, onWheelX, onWheelY, scrollOptimize } from "../../Common/util";
import { AutoGrowthInput } from "../../Common/AutoGrowthInput";
import { colorSH, colorSHMap } from "../../Common/color";
import { showConfirmationInterface } from "../Delete/DeleteConfirmation";
export function LineCard({
  line,
  setData,
  data,
  showConfirmation,
}: {
  line: LineProps;
  setData: Dispatch<SetStateAction<UserDataType>>;
  data: UserDataType;
  showConfirmation?: showConfirmationInterface;
}) {
  const {
    lineId,
    lineName,
    stationIds,
    sign,
    order,
    color: colorSelected,
  } = line;
  const {
    getStationById,
    getStationsInThisLine,
    setLineName,
    setSign,
    setOrder,
    setColor,
    getBendFirst,
    setBendFirst,
  } = useData(lineId, setData, data);
  const colorName = colorSHMap.get(colorSelected)?.color_name || colorSelected;
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
    // console.log(width);
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
          <div
            className="name-detail"
            onWheel={onWheelX}
          >
            <div className="name-item sign">
              <div className="title">标识</div>

              <AutoGrowthInput
                className="sign-input"
                value={sign}
                onInput={(e) => setSign(e.currentTarget.value)}
                style={{ backgroundColor: colorSelected }}
              />
            </div>
            <div className="name-item line-name-item">
              <div className="title">名称</div>
              <AutoGrowthInput
                onInput={(e) => setLineName(e.currentTarget.value)}
                className="line-name-input"
                value={lineName}
              />
            </div>
            <div className="name-item order">
              <div className="title">排序</div>

              <AutoGrowthInput
                className="order-input"
                value={order}
                type="number"
                onInput={(e) => setOrder(parseInt(e.currentTarget.value))}
              />
            </div>
          </div>
        );
      }
      case "color": {
        return (
          <div className="color-detail">
            <div className="color-detail-choosing">
              {new Array(10).fill(1).map((x, index) => {
                const { color } = colorSH[index];
                const choosed = color === colorSelected;

                return (
                  <div
                    className={classNames({
                      "color-preview": 1,
                      "color-selected": choosed,
                    })}
                    style={{
                      borderColor: color,
                      backgroundColor: choosed ? "inherit" : color,
                    }}
                    onClick={() => setColor(color)}
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
                <input
                  className="color-input"
                  type="color"
                  value={colorSelected}
                  onInput={(e) => setColor(e.currentTarget.value)}
                />
                <input
                  className="color-value"
                  value={colorSelected}
                  onInput={(e) => setColor(e.currentTarget.value)}
                ></input>
              </div>
            </div>
          </div>
        );
      }
      case "operation": {
        return (
          <div className="operation-detail">
            <div
              className="operation-item delete"
              onClick={() => {
                showConfirmation!({ line });
              }}
            >
              删除线路...
            </div>
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
              // setTab("name");
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

      <AutoGrowthInput
        onInput={(e) => setLineName(e.currentTarget.value)}
        className="line-name"
        value={lineName}
        disabled
      />
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
            onWheel={onWheelX}
          >
            <div className="add-first"></div>
            {getStationsInThisLine().map((station, index) => {
              const { stationName} = station!;
              const bendFirst = getBendFirst(index);
              return (
                <div className="station-block">
                  <div className="track">
                    <div className="sleeper"></div>
                    <div className="sleeper"></div>
                    <div className="sleeper"></div>
                  </div>
                  <div
                    className="bend-first"
                    onClick={() => setBendFirst(index, !bendFirst)}
                  >
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
                  <div
                    className="station-name"
                    style={{ color: colorSelected }}
                  >
                    {stationName}
                  </div>
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
            onWheel={onWheelY}
          >
            <div
              className={classNames({
                "edit-tool name": 1,
                selected: tab === "name",
              })}
              onClick={(e) => {
                scrollOptimize(e);
                setTab("name");
              }}
            >
              <div className="title">名称</div>
              <div className="value">1号线</div>
            </div>
            <div
              className={classNames({
                "edit-tool color": 1,
                selected: tab === "color",
              })}
              onClick={(e) => {
                scrollOptimize(e);
                setTab("color");
              }}
            >
              <div className="title">颜色</div>
              <div className="value" style={{ color: colorSelected }}>
                {colorName}
              </div>
            </div>
            <div
              className={classNames({
                "edit-tool operation": 1,
                selected: tab === "operation",
              })}
              onClick={(e) => {
                scrollOptimize(e);
                setTab("operation");
              }}
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
