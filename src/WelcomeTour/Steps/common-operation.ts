import { DriveStep, Driver } from "driver.js";

export const getSteps = (driver: Driver): DriveStep[] => [
  {
    element: ".ScaleLayer",
    onHighlighted:()=>{},
    popover: {
      title: "尝试缩放或者移动地图",
      description: window.ontouchend === null? "单指拖动地图，双指缩放地图": "按住鼠标左键拖动移动地图，滚动鼠标滚轮缩放地图",
      showButtons:['next'],
      onNextClick:driver.moveNext
    },
  },
  {
    element: ".title .click-panel",
    popover: {
      title: "点击标题",
      description: "点击标题打开菜单",
    },
  },
  {
    element: ".title",
    popover: {
      title: "再次点击标题",
      description: "可以修改标题",
    },
  },
  {
    element: ".menu",
    popover: {
      title: "点击任意空白区域退出菜单",
      description: "退出菜单",
    },
  },
  {
    element: ".station-descend-31",
    popover: {
      title: "点击站点",
      description: "以打开站点卡片",
    },
  },
  {
    element: ".station-card",
    popover: {
      title: "站点卡片",
      description: "可以在这里编辑站点的所有设置",
      showButtons:["next"],
      onNextClick:driver.moveNext
    },
  },
  {
    element: ".ScaleLayer",
    popover: {
      title: "尝试点击线路",
      description: "图中的彩色线条即为线路,如果无法选中可以尝试放大地图再点选",
    },
  },
  {
    element: ".line-card",
    popover: {
      title: "线路卡片",
      description: "可以在这里编辑线路的所有设置",
      showButtons:["next"],
      onNextClick:driver.moveNext
    },
  },
];
