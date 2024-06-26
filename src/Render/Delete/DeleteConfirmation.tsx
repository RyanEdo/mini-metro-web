import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { LineProps, StationProps } from "../../Data/UserData";
import "./DeleteConfirmation.scss";
import { AutoGrowthInput } from "../../Common/AutoGrowthInput";
import shapes from "../../Resource/Shape/shape";
import classNames from "classnames";
export interface showConfirmationInterface {
  (
    {
      line,
      station,
      stationIndex,
    }: { line?: LineProps; station?: StationProps; stationIndex?: number },
    callback?: any
  ): void;
}
enum ShowMode {
  none,
  beforeAnimate,
  animated,
  beforeDisappear,
}
export const DeleteConfirmation = forwardRef(function (
  {}: any,
  ref: React.Ref<unknown> | undefined
) {
  const [show, setShow] = useState(ShowMode.none);
  //   const [title, setTitle] = useState();
  //   const [subTitle, setSubTitle] = useState();
  const [line, setLine] = useState<LineProps>();
  const [station, setStation] = useState<StationProps>();
  const [stationIndex, setStationIndex] = useState<number | undefined>();
  const [callback, setCallback] = useState(() => () => {});
  //@ts-ignore
  window.setShow = setShow
  const showWithAnimate = () => {
    setShow(ShowMode.beforeAnimate);
    setTimeout(() => setShow(ShowMode.animated));
  };
  const disappearWithAnimate = () => {
    setShow(ShowMode.beforeDisappear);
    setTimeout(() => setShow(ShowMode.none),300);
  };
  const showConfirmation: showConfirmationInterface = (
    { line, station, stationIndex },
    callback
  ) => {
    showWithAnimate();
    setLine(line);
    setStation(station);
    setCallback(() => callback);
    setStationIndex(stationIndex);
  };
  useImperativeHandle(
    ref,
    () => {
      return {
        showConfirmation,
      };
    },
    []
  );
  const remove = line && station;
  const deleteText = remove ? "移除" : "删除";
  const title = `确实要${deleteText}吗?`;
  const { stationName, shape } = station || {};
  const { lineName, sign, color } = line || {};
  const index = stationIndex ? stationIndex + 1 : 0;
  const subTitle = `不再作为${lineName}的第${index}站`;

  return (
    <div
      style={show === ShowMode.none ? { display: "none" } : {}}
      className={classNames({
        "delete-confirmation-container": 1,
        "before-animate": show === ShowMode.beforeAnimate, 
        "animated": show === ShowMode.animated,
        "before-disappear": show === ShowMode.beforeDisappear,
      })}
      onClick={disappearWithAnimate}
    >
      <div className="delete-confirmation">
        <div className="title">{title}</div>
        {remove ? <div className="sub-title">{subTitle}</div> : <></>}
        <div className="preview">
          <div className="preview-content">
            <div className="icon">
              {line && !station ? (
                <div className="line">
                  <AutoGrowthInput
                    className="sign-input"
                    value={sign!}
                    //   disabled
                    style={{ backgroundColor: color }}
                  />
                </div>
              ) : (
                <div className="station">
                  {
                    //@ts-ignore
                    shapes[shape]
                  }
                </div>
              )}
            </div>
            <div className="text">{stationName || lineName}</div>
          </div>
          <div
            className="delete-line"
            style={show===ShowMode.animated || show === ShowMode.beforeDisappear ? {} : { width: 0 }}
          ></div>
        </div>
        <div
          className="delete"
          onClick={() => {
            disappearWithAnimate();
            if (typeof callback === "function") callback();
          }}
        >
          {deleteText}
        </div>
        <div className="back" onClick={disappearWithAnimate}>
          取消
        </div>
      </div>
    </div>
  );
});
