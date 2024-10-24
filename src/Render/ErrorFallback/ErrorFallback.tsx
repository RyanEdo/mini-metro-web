import React from "react";
import "./ErrorFallback.scss";
import { ReactComponent as RecoverIcon } from "../../Resource/Icon/clock.arrow.circlepath.svg";
import { ReactComponent as ExportIcon } from "../../Resource/Icon/export.svg";
import { exportFile, exportJson } from "../../Common/util";
import moment from "moment";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <div className="error-layer">
      <div className="title">{t('error.metError')}</div>
      <div className="sub-title">{t('error.dontWorry')}</div>
      <div className="recover-from-cache error-btn" onClick={resetErrorBoundary}>
        <RecoverIcon />
        <span>{t('error.recoverFromCache')}</span>
      </div>
      <div
        className="export-from-cache error-btn"
        onClick={() => exportFile("last")}
      >
        <ExportIcon />
        <span>{t('error.exportNoErrorFile')}</span>
      </div>
      <div className="export-error">
        <div className="or">
          {t('error.orYouCould')}
          <span
            className="export-error-file"
            onClick={() => exportFile("current")}
          >
            {t('error.exportError')}
          </span>
        </div>
        <div className="for">{t('error.sendAuthor')}</div>
      </div>
    </div>
  );
};
