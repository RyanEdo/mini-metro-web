import classNames from "classnames";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import './AutoGrowthInput.scss'
export function AutoGrowthInput({
  value,
  onInput,
  className = "",
  type = "",
  disabled = false,
}: {
  value: number|string;
  onInput: (x: any) => void;
  className?: string;
  type?: string;
  disabled?: boolean
}) {
  return (
    <div className={classNames({"auto-growth-container":1,[className]: className, disabled})}>
      <span className="auto-growth-span">{value}</span>
      <input
        className="auto-growth-input"
        value={value}
        onInput={onInput}
        type={type}
      ></input>
    </div>
  );
}
