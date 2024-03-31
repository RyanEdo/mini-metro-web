import classNames from "classnames";
import React, {
  CSSProperties,
  Dispatch,
  LegacyRef,
  RefAttributes,
  RefObject,
  SetStateAction,
  StyleHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from "react";
import "./AutoGrowthInput.scss";
type InputProps = {
  value?: number | string;
  onInput?: (x: any) => void;
  className?: string;
  type?: string;
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: (x: any) => void;
}
export const AutoGrowthInput = forwardRef<HTMLInputElement, InputProps>(function ({
  value,
  onInput,
  className = "",
  type = "",
  disabled = false,
  style = {},
  onClick,
}, ref) {
  return (
    <div
      // onClick={onClick}
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

      ref={ref}
        style={style}
        className="auto-growth-input"
        value={value}
        onInput={onInput}
        type={type}
        disabled={disabled}
        onClick={onClick}
        onWheel={(e) => {
          if (document.activeElement === e.currentTarget) e.stopPropagation();
        }}
        onBlur={(e)=>{
          if(type === "number")
          setTimeout(()=>{
            //@ts-ignore
            e.target.value = value
          })
        }}
      ></input>
      {disabled?<div className="click-panel" onClick={onClick}></div>:<></>}
    </div>
  );
}) 
