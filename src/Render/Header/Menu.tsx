import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ReactComponent as ShareIcon } from "../../Resource/Icon/share.svg";
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
  calculateTransform,
  deleteFileFromIndexedDB,
  exportFile,
  exportJson,
  importFromFile,
  importImage,
  mediateMap,
  readFileFromIndexedDB,
  storeFileInIndexedDB,
  stringifyData,
} from "../../Common/util";
import moment from "moment";

import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import download from "downloadjs";
import { getExistMap } from "../../Common/api";
import OpacityControl from "./Component/OpacityControl";
import ShapeSelector from "./Component/ShapeSelector";
import { useTranslation } from "react-i18next";

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
  defaultShape: string,
  setDefaultShape: Dispatch<SetStateAction<string>>;
} & ShowNameProps &
  DrawProps &
  TransformProps &
  ShowTourProps &
  PageProps;
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
    setPage,
    defaultShape,
    setDefaultShape,
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
  const { t } = useTranslation();
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
  const importImageClick = (e: React.MouseEvent) => {
    importImage()
      .then((file) => {
        if (file) {
          calculateTransform(file).then(
            ({ translateX: x, translateY: y, scale: s }) => {
              showTools(e, FunctionMode.editingCustomBackgroundPosition);
              setData((data) => ({
                ...data,
                // backgroundColor: "image",
                backgroundImage: file,
                translateX: (x - translateX) / scale,
                translateY: (y - translateY) / scale,
                scale: s / scale,
              }));
              storeFileInIndexedDB(file, "image");
            }
          );

          console.log("图片 Blob 对象:", file);
        } else {
          console.log("未选择图片");
        }
      })
      .catch((error) => {
        console.error("导入图片时出错:", error);
      });
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
                ? t('menu.alreadyAddStations', {count: currentRecordIndex + 1})
                : t('menu.clickBlankToAddStation')}
            </div>
            <ShapeSelector          defaultShape={defaultShape}
          setDefaultShape={setDefaultShape}/>
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
              {t('menu.withdraw')}
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
              {t('menu.redo')}
            </div>
            <div
              className="tool"
              id="add-station-finish-btn"
              onClick={() => {
                setPage("title");
                setTitleEditable(false);
              }}
            >
              {t('menu.done')}
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
                ? t('menu.alreadyModified', {count:currentRecordIndex + 1})
                : t('menu.dragToChangePoistion')}
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
              {t('withdraw')}
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
              {t('menu.redo')}
            </div>
            <div
              className="tool"
              onClick={() => {
                setPage("title");
                setTitleEditable(false);
              }}
            >
              {t('menu.done')}
            </div>
          </>
        );
      }
      case FunctionMode.lineEditing: {
        return (
          <>
            <div className="tool disabled">
              {t('menu.chooseALineFirst')}“
              <PlusIcon className="tool-plus" />”
            </div>
            <div
              className="tool"
              onClick={() => {
                setPage("title");
                setTitleEditable(false);
              }}
            >
              {t('menu.done')}
            </div>
          </>
        );
      }
      case FunctionMode.backgroundEditing: {
        const { backgroundColor = "#ffffff", backgroundImage } = data;
        const setColor = (color: string) =>
          setData((data) => ({ ...data, backgroundColor: color }));
        return (
          <>
            <div className="tool disabled">{t('menu.backgroudSetting')}</div>
            <div
              className={classNames({
                tool: 1,
                disabled: backgroundColor === "#ffffff",
              })}
              onClick={() => setColor("#ffffff")}
            >
              {t('menu.white')}
            </div>
            <div
              className={classNames({
                tool: 1,
                disabled: backgroundColor === "#fffeea",
              })}
              onClick={() => setColor("#fffeea")}
            >
              {t('menu.lightYellow')}
            </div>
            <div
              className={classNames({
                tool: 1,
                disabled: backgroundColor === "transparent",
              })}
              onClick={() => setColor("transparent")}
            >
              {t('menu.transparent')}
            </div>
            <div className="tool">
              <input
                className="color-input"
                type="color"
                value={backgroundColor}
                onInput={(e) => setColor(e.currentTarget.value)}
              />
            </div>
            {backgroundImage ? (
              <div
                className="tool"
                onClick={(e) => {
                  showTools(e, FunctionMode.editingCustomBackgroundPosition);
                }}
              >
                {t('menu.changeBackgroudImage')}...
              </div>
            ) : (
              <div className="tool" onClick={importImageClick}>
                {t('menu.importBackgroudImage')}...
              </div>
            )}
            <div
              className="tool"
              onClick={() => {
                setPage("title");
                setTitleEditable(false);
              }}
            >
              {t('menu.done')}
            </div>
          </>
        );
      }
      case FunctionMode.customBackground:
      case FunctionMode.editingCustomBackgroundPosition: {
        const { backgroundColor, backgroundImage, opacity = 1 } = data;
        const setColor = (color: string) =>
          setData((data) => ({ ...data, backgroundColor: color }));
        const setOpacity = (opacity: number) =>
          setData((data) => ({ ...data, opacity }));
        return (
          <>
            <div className="tool disabled">{t('menu.backgroudSetting')} / {t('menu.changeBackgroudImage')}</div>
            <div className="tool" onClick={importImageClick}>
              {t('menu.importImage')}
            </div>
            <OpacityControl opacity={opacity} setOpacity={setOpacity} />
            {/* 
            {functionMode === FunctionMode.editingCustomBackgroundPosition ? (
              <div className="tool" onClick={(e) => showTools(e, FunctionMode.customBackground)}>调整地图</div>
            ) : (
              <div className={classNames({ tool: 1, disabled: !backgroundImage })} onClick={(e) => showTools(e, FunctionMode.editingCustomBackgroundPosition)}>调整位置与缩放</div>
            )} */}

            <div
              className={classNames({ tool: 1, disabled: !backgroundImage })}
              onClick={(e) => {
                showTools(e, FunctionMode.customBackground);
                setData((data) => ({
                  ...data,
                  backgroundImage: undefined,
                }));
                deleteFileFromIndexedDB("image");
              }}
            >
              {t('menu.deleteImage')}
            </div>
            <div
              className="tool"
              onClick={(e) => showTools(e, FunctionMode.backgroundEditing)}
            >
              {t('menu.back')}
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
              {t('menu.clickAddStationToLine',{lineName, insertIndex: insertIndex+1})}
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
              {t('menu.withdraw')}
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
              {t('menu.redo')}
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
              {t('menu.done')}
            </div>
          </>
        );
      }
      case FunctionMode.choosingExistMap: {
        const existingMap = [
          { name: t('shang-hai'), id: "shanghai", webkit: true },
          { name: t('bei-jing'), id: "beijing" },
          { name: t('guang-zhou'), id: "guangzhou", webkit: true },
          { name: t('shen-zhen'), id: "shenzhen", webkit: true },
          { name: t('xiang-gang'), id: "hongkong", webkit: true },
          { name: t('chang-sha'), id: "changsha", webkit: true },
          { name: t('tian-jin'), id: "tianjing", webkit: true },
        ];
        const webkit = engine.name === "WebKit";
        return (
          <>
            <div className="tool disabled">{t('menu.chooseAMap')}</div>
            {existingMap
              .filter((x) => (webkit ? x.webkit : true))
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
                      setData({ ...data, title });
                      mediateMap(data, transfromTools);
                      setSelectedMap(id);
                    }}
                    className={classNames({
                      tool: 1,
                      disabled: selectedMap !== id,
                      [id]: 1,
                    })}
                  >
                    {name}
                  </div>
                );
              })}

            {selectedMap ? (
              <div
                className="tool confirm-add-from-existed-map-btn"
                onClick={() => {
                  setPage("title");
                  setTitleEditable(false);
                  const data = mapData.get(selectedMap!);
                  if (data) setData(data);
                }}
              >
            
                {t('menu.useTemplate',{name: existingMap.find((x) => x.id === selectedMap)?.name})}
              </div>
            ) : (
              <></>
            )}
            <div
              className="tool"
              onClick={() => {
                setData(originalMap!);
                mediateMap(originalMap!, transfromTools);
                setPage("title");
                setTitleEditable(false);
              }}
            >
              {t('menu.cancel')}
            </div>
          </>
        );
      }
    }
  };

  useEffect(() => {
    if (drawing) {
      toPng(document.querySelector(".transform-layer")! as HTMLElement).then(
        (dataUrl) => {
          setDrawing(false);
          download(
            dataUrl,
            `${title}-${moment().format("YYYY-MM-DD_HH-mm-ss")}.png`
          );
        }
      );
    }
  }, [drawing]);

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
            <div className="column-title">{t('menu.station')}</div>
            <div className="column-items">
              <div
                id="menu-add-station"
                className="column-item"
                onClick={(e) => showTools(e, FunctionMode.addingStation)}
              >
                {t('menu.addStation')}...
              </div>
              <div
                className="column-item"
                onClick={(e) => showTools(e, FunctionMode.dragingStation)}
              >
                {t('menu.changeStationPosition')}...
              </div>
              <div
                className="column-item"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowName(!showName);
                }}
              >
                {showName ? t('menu.hidden') : t('menu.show')}{t('menu.stationName')}...
              </div>
              {showName ? (
                <div
                  className="column-item auto-hidden-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAutoHiddenName(!autoHiddenName);
                  }}
                >
                  {autoHiddenName ? t('menu.turnOff') : t('menu.turnOn')}{t('menu.AutoHidden')}...
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="column">
            <div className="column-title">{t('menu.line')}</div>
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
              <div
                className="column-item"
                onClick={(e) => showTools(e, FunctionMode.backgroundEditing)}
              >
                设定背景...
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
                    readFileFromIndexedDB("image")
                      .then((file) => {
                        setData((data) => ({
                          ...data,
                          // backgroundColor: "image",
                          backgroundImage: file as File,
                        }));
                      })
                      .catch((e) => {
                        console.error(e);
                      });

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
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    "https://github.com/RyanEdo/mini-metro-web",
                    "_blank"
                  );
                }}
              >
                项目地址...
              </div>
              <div
                className="column-item tour-btn"
                onClick={(e) => {
                  if (window.innerWidth >= 710) setShowTour(true);
                  else {
                    e.stopPropagation();
                    window.open(
                      "https://www.bilibili.com/video/BV1E4421D7Yn/",
                      "_blank"
                    );
                  }
                }}
              >
                使用教程...
              </div>
              {window.innerWidth >= 710 ? (
                <div
                  className="column-item tour-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      "https://www.bilibili.com/video/BV1E4421D7Yn/",
                      "_blank"
                    );
                  }}
                >
                  视频教程...
                </div>
              ) : (
                <></>
              )}
              <div
                className="column-item friend"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    "https://railmapgen.org/?utm_source=mini-metro-web",
                    "_blank"
                  );
                }}
              >
                线路图工具包
                <ShareIcon />
              </div>
              <div className="column-item small">版本 : 1.1.1</div>
              <div
                className="column-item small author"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open("https://space.bilibili.com/8217854", "_blank");
                }}
              >
                作者 : 江户川瑞安
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
