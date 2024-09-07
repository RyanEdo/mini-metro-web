import React from "react";
import "./ErrorFallback.scss";
import { ReactComponent as RecoverIcon } from "../../Resource/Icon/clock.arrow.circlepath.svg";
import { ReactComponent as ExportIcon } from "../../Resource/Icon/export.svg";
import { exportFile, exportJson } from "../../Common/util";
import moment from "moment";

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  const exportFile = (key: string) => {
    const current = localStorage.getItem(key);
    exportJson(
      current!,
      `recovery-${key}-${moment().format("YYYY-MM-DD_HH-mm-ss")}.json`
    );
  };

  return (
    <div className="error-layer">
      <div className="title">抱歉！程序出现错误</div>
      <div className="sub-title">不过不用担心，您的地图没有丢失</div>
      <div className="recover-from-cache error-btn" onClick={resetErrorBoundary}>
        <RecoverIcon />
        <span>从缓存中恢复错误发生前的地图</span>
      </div>
      <div
        className="export-from-cache error-btn"
        onClick={() => exportFile("last")}
      >
        <ExportIcon />
        <span>导出错误发生前的地图文件</span>
      </div>
      <div className="export-error">
        <div className="or">
          或者您可以
          <span
            className="export-error-file"
            onClick={() => exportFile("current")}
          >
            导出当前包含错误的地图文件...
          </span>
        </div>
        <div className="for">以便发送给作者分析错误原因。</div>
      </div>
    </div>
  );
};
