import { DriveStep, Driver } from "driver.js";

export const getSteps = (driver: Driver): DriveStep[] => [
  {
    element: ".title .click-panel",
    popover: {
      title: "点击标题",
      description: "点击标题打开菜单",
    },
  },
  {
    element: ".auto-hidden-btn",
    popover: {
      title: "关闭自动隐藏",
      description: "站点名会在地图缩放到小尺度时自动隐藏。关闭自动隐藏以确保可以一直显示站点名称",
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
    element: ".edit-tools",
    popover: { title: "在这里向下滚动一下", description: "再点击标签按钮" },
  },
  {
    element: ".tag-detail",
    popover: { title: "尝试改变站点名到右下角", description: "点击右下角的灰色方块" },
  },
  {
    element: ".station-name-descend-31",
    popover: { title: "可以看到站点名已经位于站点右下角了", description: "可以用这种方法修改站点名位置", showButtons:["next"],onNextClick:driver.moveNext },
  },
  {
    element: ".tag-item.center",
    popover: { title: "点击中间的文字恢复到自动选择位置", description: "恢复到自动选择位置" },
  },
];
