import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ReactComponent as RecoverIcon } from "../../Resource/Icon/clock.arrow.circlepath.svg";
import { ReactComponent as OkIcon } from "../../Resource/Icon/ok.svg";
import { ReactComponent as NoIcon } from "../../Resource/Icon/no.svg";

import "./Recovery.scss";
import { setDataFromJson, UserDataType } from "../../Data/UserData";
import { mediateMap } from "../../Common/util";
import classNames from "classnames";
export function Recovery({
  data,
  setData,
  recoveredFromError,
  setRecoveredFromError,
  transfromTools,
}: {
  data: UserDataType;
  setData: Dispatch<SetStateAction<UserDataType>>;
  recoveredFromError: boolean;
  setRecoveredFromError: Dispatch<SetStateAction<boolean>>;
  transfromTools: {
    scale: number;
    setScale: React.Dispatch<React.SetStateAction<number>>;
    translateX: number;
    translateY: number;
    setTranslateX: React.Dispatch<React.SetStateAction<number>>;
    setTranslateY: React.Dispatch<React.SetStateAction<number>>;
  };
}) {
  const [showNotification, setShowNotification] = useState(false);
useEffect(() => {
  const current = localStorage.getItem("current");
    const show = current && !recoveredFromError;
    setRecoveredFromError(false);
    setShowNotification(!!show);
}, [])
  return (
    <div className={classNames({
      "recovery-notification-container": 1,
      show: showNotification,
    })}>
      <div
        className={classNames({
          "recovery-notification": 1,
          show: showNotification,
        })}
      >
        <div className="icon">
          <RecoverIcon />
        </div>
        <div className="text">
          <div className="title">需要恢复数据吗？</div>
          <div className="sub-title">缓存中有不久前编辑过的地图</div>
        </div>
        <div
          className="ok"
          onClick={() => {
            const current = localStorage.getItem("current");
            if (current) {
              const data = setDataFromJson(setData, current);
              mediateMap(data, transfromTools);
            }
            setShowNotification(false);
          }}
        >
          <OkIcon />
        </div>
        <div
          className="no"
          onClick={() => {
            setShowNotification(false);
          }}
        >
          <NoIcon />
        </div>
      </div>
    </div>
  );
}
