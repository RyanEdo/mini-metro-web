import classNames from "classnames";
import React, {
  CSSProperties,
  Dispatch,
  SetStateAction,
  StyleHTMLAttributes,
  useEffect,
  useState,
} from "react";
import "./AutoGrowthInput.scss";
export function AutoGrowthInput({
  value,
  onInput,
  className = "",
  type = "",
  disabled = false,
  style = {},
  onClick,
}: {
  value?: number | string;
  onInput?: (x: any) => void;
  className?: string;
  type?: string;
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: (x: any) => void;
}) {
  return (
    <div
      onClick={onClick}
      className={classNames({
        "auto-growth-container": 1,
        [className]: className,
        // disabled,
      })}
    >
      <span className="auto-growth-span" style={style}>
        {value}
      </span>
      <input
        style={style}
        className="auto-growth-input"
        value={value}
        onInput={onInput}
        type={type}
        readOnly={disabled}
        onWheel={(e) => {
          if (document.activeElement === e.currentTarget) e.stopPropagation();
        }}
      ></input>
    </div>
  );
}
