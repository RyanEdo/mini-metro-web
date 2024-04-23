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
} from "../../Data/UserData";
import PlusIcon from "../../Resource/Icon/plus";
import {
  exportFile,
  exportJson,
  importFromFile,
  stringifyData,
} from "../../Common/util";
import moment from "moment";
import html2canvas from "html2canvas";

import ScaleLayer from "../Layer/ScaleLayer";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import download from "downloadjs";
//@ts-ignore
import { convertSVGToPNGUrl } from "svg-to-png-browser"; 
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
} & ShowNameProps &
  DrawProps;
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
  }: MenuType,
  ref
) {
  const [page, setPage] = useState("title");
  const [titleEditable, setTitleEditable] = useState(false);
  const [display, setDisplay] = useState("none");
  const inputRef = useRef<HTMLInputElement>(null);
  const [toolsDisPlay, setToolsDisPlay] = useState("none");
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

  const showTools = (e: React.MouseEvent, functionMode: FunctionMode) => {
    e.stopPropagation();
    setRecord([]);
    setCurrentRecordIndex(-1);
    setFunctionMode(functionMode);
    setTitleEditable(false);
    setToolsDisPlay(window.innerWidth >= 710 ? "inline-block" : "block");
    setTimeout(() => setPage("tools"));
  };

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
                  className="column-item"
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
            </div>
          </div>
          <div className="column">
            <div className="column-title">数据</div>
            <div className="column-items">
              <div
                className="column-item"
                onClick={(e) => {
                  const current = localStorage.getItem("current");
                  if (current)
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
              <div className="column-item">从已有地图新建...</div>
              <div
                className="column-item"
                onClick={(e) => {
                  e.stopPropagation();
                  importFromFile().then((res) => {
                    const {
                      stations: stationsArr,
                      lines: linesArr,
                      title,
                    }: {
                      stations: StationProps[];
                      lines: LineProps[];
                      title: string;
                    } = res;
                    const stations = stationsArr.reduce((map, cur) => {
                      map.set(cur.stationId, cur);
                      return map;
                    }, new Map());
                    const lines = linesArr.reduce((map, cur) => {
                      map.set(cur.lineId, cur);
                      return map;
                    }, new Map());
                    setData({ stations, lines, title });
                  });
                }}
              >
                导入文件...
              </div>
              <div
                className="column-item"
                onClick={(e) => {
                  e.stopPropagation();
                  setDrawing(true);
                  // html2canvas will hidde overflow:visible
                  // setTimeout(() => {
                  //   html2canvas(
                  //     document.querySelector(".transform-layer")!
                  //   ).then((canvas) => {
                  //     //setDrawing(false);
                  //     document.body.appendChild(canvas);
                  //     const dataUrl = canvas.toDataURL("image/png");
                  //     const a = document.createElement("a");
                  //     a.href = dataUrl;
                  //     a.download = `${title}-${moment().format(
                  //       "YYYY-MM-DD_HH-mm-ss"
                  //     )}.png`;
                  //     a.click();
                  //   });
                  // }, 300);
                  // const svgToPngBase64 = (svgString: string | number | boolean) => {
                  //   return new Promise((res, rej) => {
                  //     var image = new Image();
                  //     let xml = window.btoa(unescape(encodeURIComponent(svgString)));
                  //     image.src = "data:image/svg+xml;base64," + xml;
                  //     let url = "";
                  //     image.onload = function() {
                  //       var canvas = document.createElement("canvas");
                  //       const {clientWidth, clientHeight} = document.querySelector(".transform-layer")!
                  //       canvas.width = clientWidth;
                  //       canvas.height = clientHeight;
                  //       var context = canvas.getContext("2d")!;
                  //       context.drawImage(image, 0, 0);
                  //       url = canvas.toDataURL("image/" + "png");
                  //       res(url);
                  //     };
                  //   });
                  // };
                  
                  // const createBlobURL = (image: Blob | MediaSource) => {
                  //   return URL.createObjectURL(image);
                  // };
                  
                  // const makeBlobFromBase64 = (dataURL: string) => {
                  //   const BASE64_MARKER = ";base64,";
                  //   const parts = dataURL.split(BASE64_MARKER);
                  //   const raw = window.atob(parts[1]);
                  //   const rawLength = raw.length;
                  //   const uInt8Array = new Uint8Array(rawLength);
                  
                  //   for (let i = 0; i < rawLength; ++i) {
                  //     uInt8Array[i] = raw.charCodeAt(i);
                  //   }
                  
                  //   return new Blob([uInt8Array], { type: "image/png" });
                  // };
                  
                  // const convertSVGToPNGUrl = async (SVGString: string) => {
                  //   const base64 = await svgToPngBase64(SVGString) as string;
                  //   return base64
                  //   const pngBlob = makeBlobFromBase64(base64);
                  //   return createBlobURL(pngBlob);
                  // };
                  
                  // setTimeout(() => {
                  //   toSvg(
                  //     document.querySelector(".transform-layer")! as HTMLElement
                  //   ).then(async (dataUrl) => {
                  //     setDrawing(false);
                  //     const svg = decodeURIComponent(
                  //       dataUrl.replace(
                  //         /data:image\/svg\+xml;charset=utf-8,/,
                  //         ""
                  //       )
                  //     );
                  //     const pngUrl = await convertSVGToPNGUrl(svg);
                  //     download(
                  //       pngUrl!,
                  //       `${title}-${moment().format("YYYY-MM-DD_HH-mm-ss")}.png`,
                  //     );
                  //   });
                  // }, 300);
                  setTimeout(() => {
                    toPng(
                      document.querySelector(".transform-layer")! as HTMLElement
                    ).then((dataUrl) => {
                      setDrawing(false);
                      download(
                        dataUrl,
                        `${title}-${moment().format("YYYY-MM-DD_HH-mm-ss")}.png`,
                      );
                    });
                  }, 300);
                }}
              >
                作为图片导出...
              </div>
              <div
                className="column-item"
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
                        `${title}-${moment().format("YYYY-MM-DD_HH-mm-ss")}.svg`,
                        "image/svg+xml"
                      );
                    });
                  }, 300);
                }}
              >
                作为矢量图片导出...
              </div>
              <div
                className="column-item"
                onClick={(e) => {
                  e.stopPropagation();
                  const current = stringifyData(data);
                  exportJson(
                    current!,
                    `${title}-${moment().format("YYYY-MM-DD_HH-mm-ss")}.json`
                  );
                }}
              >
                作为文件导出...
              </div>
              <div
                className="column-item"
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
        </div>
      </div>
    </div>
  );
});
