import React, { useEffect, useRef, useState } from "react";
import { AutoGrowthInput } from "../../Common/AutoGrowthInput";
import "./Menu.scss";
import classNames from "classnames";
import { FunctionMode, Mode } from "../../DataStructure/Mode";
type MenuType = { setEditingMode: React.Dispatch<React.SetStateAction<Mode>>,
  setFuntionMode: React.Dispatch<React.SetStateAction<FunctionMode>>
};
export function Menu({ setEditingMode, setFuntionMode }: MenuType) {
  const [page, setPage] = useState("title");
  const [titleEditable, setTitleEditable] = useState(false);
  const [display, setDisplay] = useState("none");
  const [title, setTitle] = useState("提瓦特");
  const inputRef = useRef<HTMLInputElement>(null);
  const [toolsDisPlay, setToolsDisPlay] = useState("none");
  return (
    <div
      className={classNames({ menu: 1, [`page-${page}`]: 1 })}
      onClick={(e) => {
        // if (e.target === e.currentTarget) {
        setPage("title");
        setTitleEditable(false);
        // }
      }}
      onTransitionEnd={() => {
        if (page === "title" || page === "tools") setDisplay("none");
      }}
    >
      <div className="title" onClick={(e) => e.stopPropagation()}>
        <AutoGrowthInput
          value={title}
          onClick={(e) => {
            e.stopPropagation();
            if (page === "title" || page === "tools") {
              setDisplay("block");
              setTimeout(() => setPage("menu"));
              setTitleEditable(true);
            }
          }}
          onInput={(e) => setTitle(e.currentTarget.value)}
          ref={inputRef}
          style={{
            cursor:
              page === "title"
                ? "pointer"
                : page === "tools"
                ? "default"
                : titleEditable
                ? "auto"
                : "default",
          }}
          disabled={!titleEditable}
        />

        <div
          className="tools"
          style={{ display: toolsDisPlay }}
          onTransitionEnd={() => {
            if (page !== "tools") {
              setToolsDisPlay("none");
            }
          }}
        >
          <div className="tool disabled">点击空白处新增站点</div>
          <div className="tool">撤销</div>
          <div className="tool" onClick={(e) => e.stopPropagation()}>
            重做
          </div>
          <div
            className="tool"
            onClick={() => {
              setPage("title");
              setTitleEditable(false);
            }}
          >
            完成
          </div>
        </div>
      </div>

      <div className="dots" style={{ display }}></div>
      <div className="menus" style={{ display }}>
        <div className="columns">
          <div className="column">
            <div className="column-title">站点</div>
            <div className="column-items">
              <div
                className="column-item"
                onClick={(e) => {
                  e.stopPropagation();
                  setFuntionMode(FunctionMode.addingStation);
                  setTitleEditable(false);
                  setToolsDisPlay(
                    window.innerWidth >= 710 ? "inline-block" : "block"
                  );
                  setTimeout(() => setPage("tools"));
                }}
              >
                添加站点...
              </div>
              <div className="column-item">调整站点...</div>
            </div>
          </div>
          <div className="column">
            <div className="column-title">线路</div>
            <div className="column-items">
              <div className="column-item">添加线路...</div>
            </div>
          </div>
          <div className="column">
            <div className="column-title">数据</div>
            <div className="column-items">
              <div className="column-item">新建空白地图...</div>
              <div className="column-item">从已有地图新建...</div>
              <div className="column-item">导入文件...</div>
              <div className="column-item">作为图片导出...</div>
              <div className="column-item">作为矢量图片导出...</div>
              <div className="column-item">作为文件导出...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
