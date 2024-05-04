import React, { useEffect, useState } from "react";
import "./WelcomeTour.scss";
import Infinity from "../Resource/Icon/infinity";
import GoToIcon from "../Resource/Icon/goto";
import { hightLights } from "./HightLights";
import classNames from "classnames";
import { onWheelX } from "../Common/util";
import { showTour } from "./Driver";
import { UserDataType } from "../Data/UserData";
import FinishedIcon from "../Resource/Icon/finished";
export function WelcomeTour({data}:{data: UserDataType}) {
  const [show, setShow] = useState(true);
  const [visitedSteps, setVisitedSteps] = useState<string[]>(()=>{
    const visitedStepsJson = localStorage.getItem('visited-steps');
    return visitedStepsJson ? JSON.parse(visitedStepsJson): [];
  });
  const setVisited = (step: string) =>{
    const steps = visitedSteps.concat([step]);
    localStorage.setItem('visited-steps',JSON.stringify(steps));
    setVisitedSteps(steps);
  }
  const reset = () =>{
    localStorage.setItem('visited-steps',JSON.stringify([]));
    setVisitedSteps([]);
  }
  const next = hightLights.find(highlight=>!visitedSteps.includes(highlight.id));
  return (
    <div className="welcome-tour-container" style={show?{}:{display: 'none'}}>
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
            {next?<>
                        <span className="skip-tour" onClick={()=>{setShow(false)}}>暂时跳过</span>
            <span className="start-tour" onClick={()=>{
              setShow(false);
               showTour(next.id,()=>{
                setShow(true);
                setVisited(next.id);
               });
            }}>{visitedSteps.length?"继续":""}{next.more}</span>
            </>:<>
            <span className="skip-tour" onClick={reset}>重新开始</span>
            <span className="start-tour" onClick={()=>{
              setShow(false);
            }}>完成</span>
            </>}

          </div>
        </div>
        <div className="divider"></div>
        <div className="body"  onWheel={onWheelX}>
          {hightLights.map((hightLight) => {
            const { id,icon, title, subTitle, introText, more } = hightLight;
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
                    <div className="more" onClick={()=>{
                      showTour(id,()=>{setVisited(id);setShow(true)});
                      setShow(false);
                    }}>
                      <span className={classNames({"more-text":1,finished})}>{more}</span>
                      <span className="more-icon">
                        {finished?<FinishedIcon className="finished"/>:<GoToIcon />}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
