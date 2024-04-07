import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { AutoGrowthInput } from "../../Common/AutoGrowthInput";
import "./Menu.scss";
import classNames from "classnames";
import { FunctionMode, Mode } from "../../DataStructure/Mode";
import {
  ChangeSteps,
  StationProps,
  UserDataType,
  addNewStation,
  addStationFromRecord,
  deleteStation,
  dataProcessor,
  InsertInfo,
} from "../../Data/UserData";
type MenuType = {
  setEditingMode: React.Dispatch<React.SetStateAction<Mode>>;
  functionMode: FunctionMode;
  setFuntionMode: React.Dispatch<React.SetStateAction<FunctionMode>>;
  record: StationProps[] | ChangeSteps[];
  setRecord: React.Dispatch<React.SetStateAction<StationProps[]|ChangeSteps[]>>;
  currentRecordIndex: number;
  setCurrentRecordIndex: React.Dispatch<React.SetStateAction<number>>;
  data: UserDataType;
  setData: Dispatch<SetStateAction<UserDataType>>;
  insertInfo?: InsertInfo;
  setInsertInfo: React.Dispatch<React.SetStateAction<InsertInfo|undefined>>;
};
export const Menu = forwardRef(function (
  {
    setEditingMode,
    functionMode,
    setFuntionMode,
    record,
    setRecord,
    currentRecordIndex,
    setCurrentRecordIndex,
    data,
    setData,
    insertInfo,
    setInsertInfo,
  }: MenuType,
  ref
) {
  const [page, setPage] = useState("title");
  const [titleEditable, setTitleEditable] = useState(false);
  const [display, setDisplay] = useState("none");
  const [title, setTitle] = useState("提瓦特");
  const inputRef = useRef<HTMLInputElement>(null);
  const [toolsDisPlay, setToolsDisPlay] = useState("none");
  const undoCondition = currentRecordIndex >= 0;
  const redoCondition = currentRecordIndex < record.length - 1;
  // console.log(record, data.stations);
  const backToTitle = () => {
    setPage("title");
    setTitleEditable(false);
    setFuntionMode(FunctionMode.normal);
  };
  useImperativeHandle(
    ref,
    () => {
      return {
        backToTitle,
      };
    },
    []
  );
  const showTools = (e: React.MouseEvent, functionMode: FunctionMode) => {
    e.stopPropagation();
    setRecord([]);
    setCurrentRecordIndex(-1);
    setFuntionMode(functionMode);
    setTitleEditable(false);
    setToolsDisPlay(window.innerWidth >= 710 ? "inline-block" : "block");
    setTimeout(() => setPage("tools"));
  };

  const tools = () => {
    switch (functionMode) {
      case FunctionMode.addingStation: {
        const stationRecords = record as StationProps[];
        return (
          <>
            <div className="tool disabled">
              {currentRecordIndex >= 0
                ? `已添加${currentRecordIndex + 1}站`
                : "点击空白处新增站点"}
            </div>
            <div
              className={classNames({ tool: 1, disabled: !undoCondition })}
              onClick={(e) => {
                e.stopPropagation();
                if (undoCondition) {
                  const station = stationRecords[currentRecordIndex];
                  const { stationId } = station;
                  deleteStation(data, setData, stationId);
                  setCurrentRecordIndex(currentRecordIndex - 1);
                }
              }}
            >
              撤销
            </div>
            <div
              className={classNames({ tool: 1, disabled: !redoCondition })}
              onClick={(e) => {
                e.stopPropagation();
                if (redoCondition) {
                  const station = stationRecords[currentRecordIndex + 1];
                  addStationFromRecord(data, setData, station);
                  setCurrentRecordIndex(currentRecordIndex + 1);
                }
              }}
            >
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
          </>
        );
      }
      case FunctionMode.dragingStation: {
        const changeRecords = record as ChangeSteps[];
        return (
          <>
            <div className="tool disabled">
              {currentRecordIndex >= 0
                ? `已修改${currentRecordIndex + 1}次`
                : "拖动站点更改位置"}
            </div>
            <div
              className={classNames({ tool: 1, disabled: !undoCondition })}
              onClick={(e) => {
                e.stopPropagation();
                if (undoCondition) {
                  const change = changeRecords[currentRecordIndex];
                  const { stationId, fromX, fromY } = change;
                  const {setStationPosition} = dataProcessor(stationId, setData, data);
                  setStationPosition(fromX, fromY);
                  setCurrentRecordIndex(currentRecordIndex - 1);
                }
              }}
            >
              撤销
            </div>
            <div
              className={classNames({ tool: 1, disabled: !redoCondition })}
              onClick={(e) => {
                e.stopPropagation();
                if (redoCondition) {
                  const change = changeRecords[currentRecordIndex+1];
                  const { stationId, toX, toY } = change;
                  const {setStationPosition} = dataProcessor(stationId, setData, data);
                  setStationPosition(toX, toY);
                  setCurrentRecordIndex(currentRecordIndex + 1);
                }
              }}
            >
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
          </>
        );
      }
      case FunctionMode.lineEditing: {
        return (
          <>
            <div className="tool disabled">
              站点插入模式
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
          </>
        );
      }
      case FunctionMode.selectingStation:{
        const {insertIndex, line} = insertInfo!;
        const {lineName} = line;
        return (
          <>
            <div className="tool disabled">
              点击站点将它插入到{lineName}的第{insertIndex+1}站
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
          </>
        );
      }
    }
  };
  return (
    <div
      className={classNames({ menu: 1, [`page-${page}`]: 1 })}
      onClick={backToTitle}
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
              setFuntionMode(FunctionMode.normal);
            }
          }}
        >
          {tools()}
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
                onClick={(e) => showTools(e, FunctionMode.addingStation)}
              >
                添加站点...
              </div>
              <div
                className="column-item"
                onClick={(e) => showTools(e, FunctionMode.dragingStation)}
              >
                调整站点位置...
              </div>
              <div className="column-item">隐藏站点名称...</div>
            </div>
          </div>
          <div className="column">
            <div className="column-title">线路</div>
            <div className="column-items">
              <div className="column-item"
                onClick={(e) => showTools(e, FunctionMode.lineEditing)}
              >插入站点...</div>
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
});
