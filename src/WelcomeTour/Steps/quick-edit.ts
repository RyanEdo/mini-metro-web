import { DriveStep, Driver } from "driver.js";

export const getSteps = (driver: Driver): DriveStep[] => [
  {
    element: ".title .click-panel",
    popover: {
      title: "打开菜单",
      description: "点击标题打开菜单",
    },
  },
  {
    element: "#menu-add-station",
    popover: {
      title: "点击添加站点",
      description: "进入添加站点模式",
    },
  },
  {
    element: ".ScaleLayer",
    onHighlighted: () => {},
    popover: {
      title: "点击任意空白处添加站点",
      description: "添加好之后点击下一步（建议您在屏幕左上角的空白区域添加三个站点）",
      showButtons: ["next"],
      onNextClick: () => {
        driver.moveNext();
      },
    },
  },
  {
    element: "#add-station-finish-btn",
    popover: { title: "点击完成", description: "退出编辑模式" },
  },
  {
    element: ".station-descend-1",
    popover: {
      title: "点击刚才创建的站点",
      description: "打开站点信息卡片",
    },
  },
  {
    element: ".station-card-operation",
    popover: { title: "点击操作选项卡", description: "我们来添加线路" },
  },
  {
    element: ".add-new-line-btn",
    popover: {
      title: "点击以此为起点新建线路",
      description: "进入添加线路模式",
    },
  },
  {
    element: ".station-descend-2",
    popover: {
      title: "点击站点",
      description: "连接站点",
    },
  },
  {
    element: ".station-descend-3",
    popover: {
      title: "点击站点",
      description: "连接站点",
    },
  },
  {
    element: "#add-line-finish-btn",
    popover: { title: "点击完成", description: "线路就创建好了" },
  },
];
