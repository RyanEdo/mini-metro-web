import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import "./StationCard.scss";
import classNames from "classnames";
import { Point } from "../../DataStructure/Point";
import { StationProps, UserDataType, useData } from "../../Data/UserData";
import shapes from "../../Resource/Shape/shape";
import { Shape } from "../../Data/Shape";
import { AutoGrowthInput } from "../../Common/AutoGrowthInput";
import { onWheelY, scrollOptimize } from "../../Common/util";
import { showConfirmationInterface } from "../Delete/DeleteConfirmation";
export function StationCard({
  station,
  setData,
  data,
  showConfirmation,
}: {
  station: StationProps;
  setData: Dispatch<SetStateAction<UserDataType>>;
  data: UserDataType;
  showConfirmation?: showConfirmationInterface;
}) {
  const {
    stationName,
    lineIds,
    position,
    shape: shapeSelected,
    stationId,
  } = station;
  const { setStationName, setStationPosition, setStationShape, getLineById } =
    useData(stationId, setData, data);
  const [x, y] = position;
  const setX = (x: number) => setStationPosition(x, y);
  const setY = (y: number) => setStationPosition(x, y);
  const lineCount = lineIds.length;
  const [tab, setTab] = useState("name");

  const editTools = (tab: string) => {
    switch (tab) {
      case "name": {
        return (
          <div className="name-detail">
            <div className="name-item sign">
              <div className="title">横坐标</div>
              <AutoGrowthInput
                value={x}
                onInput={(x) => setX(parseInt(x.currentTarget.value))}
                type="number"
              />
            </div>
            <div className="name-item order">
              <div className="title">纵坐标</div>
              <AutoGrowthInput
                value={y}
                onInput={(y) => setY(parseInt(y.currentTarget.value))}
                type="number"
              />
              {/* <span className="auto-growth-span">{y}</span>

              <input
                className="auto-growth-input"
                value={y}
                type="number"
                onInput={(y) => setY(parseInt(y.currentTarget.value))}
              ></input> */}
            </div>
          </div>
        );
      }
      case "color": {
        const column = 4;
        const row = 3;
        const grid = new Array(column * row).fill(0);
        Object.keys(shapes).forEach((shape, index) => (grid[index] = shape));
        return (
          <div className="color-detail">
            <div className="color-detail-choosing">
              {grid.map((shape, index) => {
                const left = index % column === 0;
                const bottom = Math.floor(index / column) === row - 1;
                console.log({ shape });
                return (
                  <div
                    className={classNames({
                      "shape-container": 1,
                      left,
                      bottom,
                    })}
                    onClick={() => {
                      if (shape) setStationShape(shape);
                    }}
                  >
                    <div
                      className={classNames({
                        "shape-preview": 1,
                        "shape-selected": shape === shapeSelected,
                        [shape]: 1,
                      })}
                    >
                      {
                        //@ts-ignore
                        shapes[shape]
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
      case "operation": {
        return (
          <div className="operation-detail" onWheel={onWheelY}>
            <div className="operation-item">以此为起点新建线路...</div>
            {lineIds.map((lineId) => {
              const line = getLineById(lineId);
              const index = line?.stationIds.findIndex((x) => x === stationId);
              const { lineName } = line!;
              return (
                <div
                  className="operation-item delete"
                  onClick={() => {
                    showConfirmation!({ line, station });
                  }}
                >
                  从{lineName}的第{index! + 1}站移除...
                </div>
              );
            })}
            <div
              className="operation-item delete"
              onClick={() => {
                showConfirmation!({ station });
              }}
            >
              删除站点...
            </div>
          </div>
        );
      }
    }
  };
  return (
    <div className={classNames({ "station-card": 1 })}>
      <div className="line-count">{lineCount}条线路</div>
      <AutoGrowthInput
        onInput={(e) => setStationName(e.currentTarget.value)}
        className="station-name"
        value={stationName}
      />
      <div className="edit-detail">{editTools(tab)}</div>

      {
        <div className={classNames({ "edit-panel": 1, edit: 1 })}>
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
              <div className="title">位置</div>
              <div className="value">
                X<span className="position">{x}</span>Y
                <span className="position">{y}</span>
              </div>
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
              <div className="title">形状</div>
              <div className="value">
                {
                  //@ts-ignore
                  Shape[shapeSelected]
                }
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
        </div>
      }
    </div>
  );
}
