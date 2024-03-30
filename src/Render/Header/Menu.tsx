import React, { useEffect, useRef, useState } from "react";
import { AutoGrowthInput } from "../../Common/AutoGrowthInput";
import "./Menu.scss";
import classNames from "classnames";
export function Menu() {
  const [page, setPage] = useState("title");
  const chrome = navigator.userAgent.toLowerCase().includes('chrome')
  const [titleEditable, setTitleEditable] = useState(!chrome);
  const [display, setDisplay] = useState("none");
  const [title, setTitle] = useState("提瓦特");
  return (
    <div
      className={classNames({ menu: 1, [`page-${page}`]: 1 })}
      onClick={() => {
        setPage("title");
        if(chrome)
        setTitleEditable(false);
      }}
      onTransitionEnd={() => {
        if (page === "title") setDisplay("none");
      }}
    >
      <div
        className="title"
        onClick={(e) => {
          e.stopPropagation();
          if (page === "title") {
            setDisplay("block");
            setTimeout(()=>setPage("menu"))
          }
          if (page === "menu") setTitleEditable(true);
        }}
      >
        <AutoGrowthInput
          value={title}
          onInput={e=>setTitle(e.currentTarget.value)}
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
      </div>
      <div className="tools">
        <div className="tool"></div>
      </div>
      <div className="dots" style={{ display }}></div>
      <div className="menus" style={{ display }}>
        <div className="columns">
          <div className="column">
            <div className="column-title">站点</div>
            <div className="column-items">
              <div className="column-item">添加站点...</div>
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
