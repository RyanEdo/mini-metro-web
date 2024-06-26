import { DriveStep, Driver } from "driver.js";

export const getSteps = (driver: Driver): DriveStep[] => [
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
      // onNextClick:driver.moveNext
    },
  },
  {
    element: ".name-detail",
    popover: {
      title: "编辑站点位置",
      description: "点击坐标之后使用鼠标滚轮可以精确调节",
      showButtons:["next"],
      // onNextClick:driver.moveNext
    },
  },
  {
    element: ".edit-tool.color",
    popover: { title: "点击此处修改站点形状", description: "修改形状" ,side:"right"},
  },
  {
    element: ".edit-tool.operation",
    popover: { title: "点击此处删除站点或新建线路", description: "删除或新建",side:"right" },
  },
  {
    element: ".edit-tool.operation.tag",
    popover: { title: "点击此处设置站点名称位置", description: "站点名位置" },
  },
  {
    element: ".tag-detail",
    popover: { title: "点击灰色的方块选择方位", description: "点击中间的文字恢复自动位置",showButtons:['next'],onNextClick:driver.moveNext },
  },
];
