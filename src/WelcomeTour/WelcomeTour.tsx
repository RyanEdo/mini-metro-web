import React from "react";
import "./WelcomeTour.scss";
import Infinity from "../Resource/Icon/infinity";
import GoToIcon from "../Resource/Icon/goto";
import { hightLights } from "./HightLights";
import classNames from "classnames";
export function WelcomeTour() {
  return (
    <div className="welcome-tour-container">
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
            <span className="skip-tour">暂时跳过</span>
            <span className="start-tour">开始教程</span>
          </div>
        </div>
        <div className="divider"></div>
        <div className="body">
          {hightLights.map((hightLight) => {
            const { icon, title, subTitle, introText, more } = hightLight;
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
                    <div className="more">
                      <span className="more-text">{more}</span>
                      <span className="more-icon">
                        <GoToIcon />
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
