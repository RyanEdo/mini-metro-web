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
      // onNextClick:driver.moveNext
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
  {
    element: ".shrink",
    popover: { title: "缩小按钮", description: "在缩小状态可以点击更多设置" },
  },
  {
    element: ".edit",
    popover: { title: "编辑按钮", description: "进入更多设置面板" },
  },
  {
    element: ".name-detail",
    popover: { title: "此处修改线路名称与标识", description: "排序可以控制线路间的遮挡关系" ,showButtons:["next"],onNextClick:driver.moveNext},
  },
  {
    element: ".edit-tool.color",
    popover: { title: "点击此处修改线路标识色", description: "左下角的颜色选择器可以取色" ,side:"right"},
  },
  {
    element: ".edit-tool.operation",
    popover: { title: "点击此处删除线路或者设置支线", description: "设置支线后线路会以虚线显示，且连接处不再显示把手",side:"right" },
  },
  {
    element: ".done",
    popover: { title: "点击此处完成设置", description: "回到站点页" },
  },
  {
    element: ".stations-count",
    popover: { title: "显示途径站点卡片", description: "点击此处所以途径的站点卡片" },
  },
];
