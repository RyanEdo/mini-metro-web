import { DriveStep, Driver } from "driver.js";

export const getSteps = (driver: Driver): DriveStep[] => [
  {
    element: ".title .click-panel",
    // onHighlighted:()=>{},
    popover: {
      title: "下次可以点这里再次打开教程",
      description: "点击标题打开菜单",
      showButtons:["next"],
      // onNextClick:driver.moveNext
    },
  },
  {
    element: ".tour-btn",
    onHighlighted:()=>{},
    popover: {
      title: "使用教程",
      description: "点这里再次打开",
      showButtons:["next"],
      onNextClick: driver.moveNext,
    },
  },
];
