import { DriveStep, Driver } from "driver.js";

export const getSteps = (driver: Driver): DriveStep[] => [
  {
    element: ".ScaleLayer",
    popover: {
      title: "点击任意线路",
      description: "图中彩色曲线表示地铁线路",
    },
  },
  {
    element: ".line-card",
    popover: {
      title: "线路卡片",
      description: "可以在这里编辑线路的所有设置",
      showButtons:["next"],
    },
  },
  {
    element: ".bend-first",
    popover: {
      title: "点击此处控制线路在两站之间的走向",
      description: "站点区间连线只有两种方式，斜线与直线",
    },
  },
  {
    element: ".expand",
    popover: { title: "放大按钮", description: "可以拓宽线路卡片" },
  },
];
