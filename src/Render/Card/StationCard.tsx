import React, { useEffect, useState } from "react";

import './StationCard.scss';
import classNames from "classnames";
import { Point } from "../../DataStructure/Point";
export function StationCard() {
  const mock = {
    stationName: '风起地站',
    lineCount: 2,
    position: new Point(200,300),
    shape: '圆形',
  };
  const { stationName, lineCount,position,shape } = mock;

  const{y} = position;
  const [tab, setTab] = useState("name");
  const [x, setX] = useState(200);

  const editTools = (tab: string) => {
    switch (tab) {
      case "name": {
        return (
          <div className="name-detail">
            <div className="name-item sign">
              <div className="title">横坐标</div>
              <span className="auto-growth-span">{x}</span>

              <input className="auto-growth-input" value={x} onInput={x=>setX(parseInt(x.currentTarget.value))} type="number"></input>

            </div>
            <div className="name-item order">
              <div className="title">纵坐标</div>
              <span className="auto-growth-span">{y}</span>

              <input className="auto-growth-input" value={y} type="number"></input>
            
            </div>
          </div>
        );
      }
      case "color": {
        const column = 4;
        const row =3;
        return (
          <div className="color-detail">
            <div className="color-detail-choosing">
              {new Array(column*row).fill(1).map((x,index, arr) => {
                
                const left = index%column ===0;
                const bottom = Math.floor(index/column) === row-1
                const randomColor = () => {
                  const r = Math.floor(Math.random() * 255);
                  const g = Math.floor(Math.random() * 255);
                  const b = Math.floor(Math.random() * 255);
                  return "rgba(" + r + "," + g + "," + b + ",1)";
                };
                const color = randomColor();
                return (
                  <div className={classNames({"shape-container":1,left,bottom})}>
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
                  </div>
                );
              })}
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
      className={classNames({ "station-card": 1,  })}
    >

      <input className="station-name" value={stationName}></input>
      <div className="line-count">{lineCount}条线路</div>
      <div className="edit-detail">{editTools(tab)}</div>

      {
        <div className={classNames({ "edit-panel": 1, "edit": 1 })}>
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
              <div className="title">位置</div>
              <div className="value">
                X
                <span className="position">{x}</span>
                Y
                <span className="position">{y}</span>
              </div>
            </div>
            <div
              className={classNames({
                "edit-tool color": 1,
                selected: tab === "color",
              })}
              onClick={() => setTab("color")}
            >
              <div className="title">形状</div>
              <div className="value">{shape}</div>
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


        </div>
      }
    </div>
  );
}
