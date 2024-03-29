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
}: {
  value: number | string;
  onInput?: (x: any) => void;
  className?: string;
  type?: string;
  disabled?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
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
        disabled={disabled}
        onWheel={e=>{
          if(document.activeElement === e.currentTarget)
          e.stopPropagation();
        }}
      ></input>
    </div>
  );
}
