import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ReactComponent as RecoverIcon } from "../../Resource/Icon/clock.arrow.circlepath.svg";
import { ReactComponent as OkIcon } from "../../Resource/Icon/ok.svg";
import { ReactComponent as NoIcon } from "../../Resource/Icon/no.svg";

import "./Recovery.scss";
import { setDataFromJson, UserDataType } from "../../Data/UserData";
import { mediateMap, readFileFromIndexedDB } from "../../Common/util";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
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
  const {t} = useTranslation();
  const notificationRef = useRef<HTMLDivElement>(null);
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    const current = localStorage.getItem("current");
    const show = current && !recoveredFromError;
    setRecoveredFromError(false);
    setShowNotification(!!show);
    const handleClickCapture = (event: TouchEvent | MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        console.log("recovery focusout");
        setShowNotification(false);
      }
    };
    document.addEventListener("touchstart", handleClickCapture, true);
    document.addEventListener("click", handleClickCapture, true);
    return () => {
      document.removeEventListener("touchstart", handleClickCapture, true);
      document.addEventListener("click", handleClickCapture, true);
    };
  }, []);
  return (
    <div
      ref={notificationRef}
      className={classNames({
        "recovery-notification-container": 1,
        show: showNotification,
      })}
    >
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
          <div className="title">{t('recover.text')}</div>
          <div className="sub-title">{t('recover.subTitle')}</div>
        </div>
        <div
          className="ok"
          onClick={() => {
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
