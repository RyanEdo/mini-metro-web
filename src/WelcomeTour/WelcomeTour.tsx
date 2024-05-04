import React, {
  LegacyRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import "./WelcomeTour.scss";
import Infinity from "../Resource/Icon/infinity";
import GoToIcon from "../Resource/Icon/goto";
import { hightLights } from "./HightLights";
import classNames from "classnames";
import { onWheelX } from "../Common/util";
import { showTour } from "./Driver";
import { ShowTourProps, UserDataType } from "../Data/UserData";
import FinishedIcon from "../Resource/Icon/finished";
import QRCode from "qrcode";
export function WelcomeTour({
  showTour: show,
  setShowTour: setShow,
}: ShowTourProps) {
  const [qrCode, setQRCode] = useState(false);
  const [visitedSteps, setVisitedSteps] = useState<string[]>(() => {
    const visitedStepsJson = localStorage.getItem("visited-steps");
    return visitedStepsJson ? JSON.parse(visitedStepsJson) : [];
  });
  const setVisited = (step: string) => {
    const steps = visitedSteps.concat([step]);
    localStorage.setItem("visited-steps", JSON.stringify(steps));
    setVisitedSteps(steps);
  };
  const reset = () => {
    localStorage.setItem("visited-steps", JSON.stringify([]));
    setVisitedSteps([]);
    localStorage.setItem("skip-tour-viewed", "Y");
  };
  const next = hightLights.find(
    (highlight) => !visitedSteps.includes(highlight.id)
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const showQRCode = () => {
    setQRCode(true);
    setVisited("mobile");
    setTimeout(() => {
      QRCode.toCanvas(canvasRef.current, window.location.href);
    });
  };
  return (
    <div
      className="welcome-tour-container"
      style={show ? {} : { display: "none" }}
    >
      <div className="welcome-tour">
        <div className="header">
          <span className="icon">
            <img src="/app-icon.png" />
          </span>
          <span className="title">
            <div className="sub-title">欢迎使用</div>
            <div className="main-title">迷你地铁地图构建工具</div>
          </span>
          <div className="control">
            {next ? (
              <>
                <span
                  className="skip-tour"
                  onClick={() => {
                    setShow(false);
                    if (!localStorage.getItem("skip-tour-viewed"))
                      showTour("skip", () => {
                        localStorage.setItem("skip-tour-viewed", "Y");
                      });
                  }}
                >
                  暂时跳过
                </span>
                <span
                  className="start-tour"
                  onClick={() => {
                    if (next.id === "mobile") {
                      showQRCode();
                    } else {
                      setShow(false);
                      showTour(next.id, () => {
                        setShow(true);
                        setVisited(next.id);
                      });
                    }
                  }}
                >
                  {visitedSteps.length ? "继续" : ""}
                  {next.more}
                </span>
              </>
            ) : (
              <>
                <span className="skip-tour" onClick={reset}>
                  重新开始
                </span>
                <span
                  className="start-tour"
                  onClick={() => {
                    localStorage.setItem("skip-tour-viewed", "Y");
                    setShow(false);
                  }}
                >
                  完成
                </span>
              </>
            )}
          </div>
        </div>
        <div className="divider"></div>
        <div className="body" onWheel={onWheelX}>
          {hightLights.map((hightLight) => {
            const { id, icon, title, subTitle, introText, more } = hightLight;
            const finished = visitedSteps.includes(id);
            return (
              <div className="intro">
                <div className="hight-light">
                  <span className="icon">{icon}</span>
                  <span className="title">{title}</span>
                </div>
                <div className="detail-card">
                  <div className="title">{subTitle}</div>
                  <div className="left-down">
                    <div className="intro-text">
                      {introText.map((line) => {
                        const emphasisStart = line[0];
                        const lineText = line.slice(1);
                        return (
                          <div className="intro-text-line">
                            {lineText.map((text, index) => {
                              const emphasis =
                                (Number(emphasisStart) + index) % 2;
                              return (
                                <span className={classNames({ emphasis })}>
                                  {text}
                                </span>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className="more"
                      onClick={() => {
                        if (id === "mobile") {
                          showQRCode();
                        } else {
                          showTour(id, () => {
                            setVisited(id);
                            setShow(true);
                          });
                          setShow(false);
                        }
                      }}
                    >
                      <span
                        className={classNames({ "more-text": 1, finished })}
                      >
                        {more}
                      </span>
                      <span className="more-icon">
                        {finished ? (
                          <FinishedIcon className="finished" />
                        ) : (
                          <GoToIcon />
                        )}
                      </span>
                    </div>
                  </div>
                  {id === "mobile" ? (
                    <div
                      className={classNames({
                        "qrcode-container": 1,
                        show: qrCode,
                      })}
                      onClick={() => setQRCode(false)}
                    >
                      <canvas id="qrcode" ref={canvasRef} />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
