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
  RecordType,
  LineChanges,
  LineProps,
  ShowNameProps,
  DrawProps,
  CardShowing,
  setDataFromJson,
  TransformProps,
  ShowTourProps,
  PageProps,
} from "../../Data/UserData";
import PlusIcon from "../../Resource/Icon/plus";
import {
  browserInfo,
  exportFile,
  exportJson,
  importFromFile,
  mediateMap,
  stringifyData,
} from "../../Common/util";
import moment from "moment";

import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import download from "downloadjs";
import { getExistMap } from "../../Common/api";

type MenuType = {
  setEditingMode: React.Dispatch<React.SetStateAction<Mode>>;
  functionMode: FunctionMode;
  setFunctionMode: React.Dispatch<React.SetStateAction<FunctionMode>>;
  record: RecordType;
  setRecord: React.Dispatch<React.SetStateAction<RecordType>>;
  currentRecordIndex: number;
  setCurrentRecordIndex: React.Dispatch<React.SetStateAction<number>>;
  data: UserDataType;
  setData: Dispatch<SetStateAction<UserDataType>>;
  insertInfo?: InsertInfo;
  setInsertInfo: React.Dispatch<React.SetStateAction<InsertInfo | undefined>>;
  cardShowing: CardShowing;
  setCardShowing: Dispatch<SetStateAction<CardShowing>>;
  saved: boolean;
  setSaved: Dispatch<SetStateAction<boolean>>;
} & ShowNameProps &
  DrawProps &
  TransformProps & ShowTourProps & PageProps;
export const Menu = forwardRef(function (
  {
    setEditingMode,
    functionMode,
    setFunctionMode,
    record,
    setRecord,
    currentRecordIndex,
    setCurrentRecordIndex,
    data,
    setData,
    insertInfo,
    setInsertInfo,
    showName,
    setShowName,
    autoHiddenName,
    setAutoHiddenName,
    setDrawing,
    drawing,
    cardShowing,
    setCardShowing,
    scale,
    setScale,
    translateX,
    translateY,
    setTranslateX,
    setTranslateY,
    saved,
    setSaved,
    setShowTour,
    page,
    setPage
  }: MenuType,
  ref
) {
  const [titleEditable, setTitleEditable] = useState(false);
  const [display, setDisplay] = useState("none");
  const inputRef = useRef<HTMLInputElement>(null);
  const [toolsDisPlay, setToolsDisPlay] = useState("none");
  const [selectedMap, setSelectedMap] = useState<string>();
  const [originalMap, setOriginalMap] = useState<UserDataType>();
  const [mapData, setMapData] = useState<Map<string, UserDataType>>(new Map());
  const undoCondition = currentRecordIndex >= 0;
  const redoCondition = currentRecordIndex < record.length - 1;
  const { title } = data;
  const setTitle = (title: string) => setData({ ...data, title });
  const backToTitle = () => {
    setPage("title");
    setTitleEditable(false);
    setFunctionMode(FunctionMode.normal);
    setDrawing(false);
  };
  const { engine } = browserInfo;
  const showTools = (e: React.MouseEvent, functionMode: FunctionMode) => {
    e.stopPropagation();
    setRecord([]);
    setCurrentRecordIndex(-1);
    setFunctionMode(functionMode);
    setTitleEditable(false);
    setToolsDisPlay(window.innerWidth >= 710 ? "inline-block" : "block");
    setTimeout(() => setPage("tools"));
  };

  const transfromTools = {
    scale,
    setScale,
    translateX,
    translateY,
    setTranslateX,
    setTranslateY,
  };
  useEffect(() => {
    mediateMap(data, transfromTools);
  }, []);
  useImperativeHandle(
    ref,
    () => {
      return {
        backToTitle,
        showTools,
      };
    },
    []
  );

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
              id="add-station-finish-btn"
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
                  const { setStationPosition } = dataProcessor(
                    stationId,
                    setData,
                    data
                  );
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
                  const change = changeRecords[currentRecordIndex + 1];
                  const { stationId, toX, toY } = change;
                  const { setStationPosition } = dataProcessor(
                    stationId,
                    setData,
                    data
                  );
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
              先选择一条线路，再点击线路卡片上的“
              <PlusIcon className="tool-plus" />”
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
      case FunctionMode.selectingStation: {
        const { insertIndex, line } = insertInfo!;
        const { lineName } = line;
        const changeRecords = record as LineChanges[];

        return (
          <>
            <div className="tool disabled">
              点击站点将它插入到{lineName}的第{insertIndex + 1}站
            </div>
            <div
              className={classNames({ tool: 1, disabled: !undoCondition })}
              onClick={(e) => {
                e.stopPropagation();
                if (undoCondition) {
                  const change = changeRecords[currentRecordIndex];
                  const { stationId, lineId, stationIndex } = change;
                  const { removeStationFromLine } = dataProcessor(
                    stationId,
                    setData,
                    data
                  );
                  removeStationFromLine(lineId, stationIndex);
                  setInsertInfo({
                    insertIndex: insertIndex === 0 ? 0 : insertIndex - 1,
                    line,
                  });
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
                  const change = changeRecords[currentRecordIndex + 1];
                  const { stationId, lineId, stationIndex } = change;
                  const { addStationToLine } = dataProcessor(
                    lineId,
                    setData,
                    data
                  );
                  addStationToLine(stationId, stationIndex);
                  setCurrentRecordIndex(currentRecordIndex + 1);
                  setInsertInfo({
                    insertIndex: insertIndex === 0 ? 0 : insertIndex + 1,
                    line,
                  });
                }
              }}
            >
              重做
            </div>
            <div
              className="tool"
              id="add-line-finish-btn"
              onClick={() => {
                setPage("title");
                setTitleEditable(false);
                setInsertInfo({ insertIndex: -1, line });
              }}
            >
              完成
            </div>
          </>
        );
      }
      case FunctionMode.choosingExistMap: {
        const existingMap = [
          { name: "上海", id: "shanghai", webkit: true },
          { name: "北京", id: "beijing" },
          { name: "广州", id: "guangzhou" , webkit: true},
          { name: "深圳", id: "shenzhen", webkit: true },
          { name: "香港", id: "hongkong", webkit: true },
          { name: "长沙", id: "changsha", webkit: true },
          { name: "天津", id: "tianjing", webkit: true },


        ];
        const webkit = engine.name === "WebKit";
        return (
          <>
            <div className="tool disabled">选择一张地图</div>
            {existingMap
            .filter(x=>webkit ? x.webkit: true)
            .map(({ name, id }) => {
              return (
                <div
                  onClick={async () => {
                    let data = mapData.get(id);
                    if (!data) {
                      const res = await getExistMap(id);
                      data = setDataFromJson(setData, res);
                      mapData.set(id, data);
                    } 
                    setData({...data,title});
                    mediateMap(data, transfromTools);
                    setSelectedMap(id);
                  }}
                  className={classNames({
                    tool: 1,
                    disabled: selectedMap !== id,
                    [id]: 1
                  })}
                >
                  {name}
                </div>
              );
            })}

            {selectedMap?<div
              className="tool confirm-add-from-existed-map-btn"
              onClick={() => {
                setPage("title");
                setTitleEditable(false);
                const data = mapData.get(selectedMap!);
                if(data)
                setData(data);
              }}
            >
              以{existingMap.find(x=>x.id===selectedMap)?.name}为模板新建地图
            </div>:<></>}
            <div
              className="tool"
              onClick={() => {
                setData(originalMap!);
                mediateMap(originalMap!, transfromTools);
                setPage("title");
                setTitleEditable(false);
              }}
            >
              取消
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
              setFunctionMode(FunctionMode.normal);
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
                id="menu-add-station"
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
              <div
                className="column-item"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowName(!showName);
                }}
              >
                {showName ? "隐藏" : "显示"}站点名称...
              </div>
              {showName ? (
                <div
                  className="column-item auto-hidden-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAutoHiddenName(!autoHiddenName);
                  }}
                >
                  {autoHiddenName ? "关闭" : "启用"}自动隐藏...
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="column">
            <div className="column-title">线路</div>
            <div className="column-items">
              <div
                className="column-item"
                onClick={(e) => showTools(e, FunctionMode.lineEditing)}
              >
                插入站点...
              </div>
              <div
                className="column-item"
                onClick={() => {
                  mediateMap(data, transfromTools);
                }}
              >
                居中路线图...
              </div>
            </div>
          </div>
          <div className="column">
            <div className="column-title">数据</div>
            <div className="column-items">
              <div
                className="column-item new-map-btn"
                onClick={(e) => {
                  const current = localStorage.getItem("current");
                  if (current && !saved)
                    exportJson(
                      current!,
                      `${title}-autosave-${moment().format(
                        "YYYY-MM-DD_HH-mm-ss"
                      )}.json`
                    );
                  setData({
                    stations: new Map(),
                    lines: new Map(),
                    title: "新地图",
                  });
                  showTools(e, FunctionMode.addingStation);
                }}
              >
                新建空白地图...
              </div>
              <div
                className="column-item existed-map-btn"
                onClick={(e) => {
                  setSelectedMap("");
                  setOriginalMap(data);
                  showTools(e, FunctionMode.choosingExistMap);
                }}
              >
                从已有地图新建...
              </div>
              <div
                className="column-item import-file-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  importFromFile().then((res) => {
                    const data = setDataFromJson(setData, res);
                    mediateMap(data, transfromTools);
                  });
                }}
              >
                导入文件...
              </div>
              {engine.name === "WebKit" ? (
                <></>
              ) : (
                <div
                  className="column-item export-as-image-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDrawing(true);

                    setTimeout(() => {
                      toPng(
                        document.querySelector(
                          ".transform-layer"
                        )! as HTMLElement
                      ).then((dataUrl) => {
                        setDrawing(false);
                        download(
                          dataUrl,
                          `${title}-${moment().format(
                            "YYYY-MM-DD_HH-mm-ss"
                          )}.png`
                        );
                      });
                    }, 300);
                  }}
                >
                  作为图片导出...
                </div>
              )}

              <div
                className="column-item export-as-svg-image-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setDrawing(true);
                  setTimeout(() => {
                    toSvg(
                      document.querySelector(".transform-layer")! as HTMLElement
                    ).then((dataUrl) => {
                      const svg = decodeURIComponent(
                        dataUrl.replace(
                          /data:image\/svg\+xml;charset=utf-8,/,
                          ""
                        )
                      );
                      console.log(svg);
                      exportFile(
                        svg!,
                        `${title}-${moment().format(
                          "YYYY-MM-DD_HH-mm-ss"
                        )}.svg`,
                        "image/svg+xml"
                      );
                    });
                  }, 300);
                }}
              >
                作为矢量图片导出...
              </div>
              <div
                className="column-item export-as-file-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  const current = stringifyData(data);
                  setSaved(true);
                  exportJson(
                    current!,
                    `${title}-${moment().format("YYYY-MM-DD_HH-mm-ss")}.json`
                  );
                }}
              >
                作为文件导出...
              </div>
              <div
                className="column-item recover-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  const current = localStorage.getItem("current");
                  if (current) {
                    const data = setDataFromJson(setData, current);
                    mediateMap(data, transfromTools);
                  }
                }}
              >
                恢复数据...
              </div>
              <div
                className="column-item export-recover-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  const current = localStorage.getItem("last");
                  exportJson(
                    current!,
                    `${title}-recovery-${moment().format(
                      "YYYY-MM-DD_HH-mm-ss"
                    )}.json`
                  );
                }}
              >
                导出恢复数据...
              </div>
            </div>
          </div>

          <div className="column">
            <div className="column-title">关于</div>
            <div className="column-items">

              <div
                className="column-item"
                onClick={() => {
                }}
              >
                项目地址...
              </div>
              <div
                className="column-item tour-btn"
                onClick={() => {
                  if(window.innerWidth>=710)
                  setShowTour(true);
                  else{
                    // to-do 教程视频
                  }
                }}
              >
                使用教程...
              </div>
              <div
                className="column-item small"
              >
                版本 :  1.0.0
              </div>
              <div
                className="column-item small author"
                onClick={e => {
                  e.stopPropagation();
                  window.open("https://space.bilibili.com/8217854","_blank");
                }}
              >
                作者 :  江户川瑞安
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
