import { DriveStep, Driver } from "driver.js";
import { browserInfo } from "../../Common/util";

export const getSteps = (driver: Driver): DriveStep[] => {
  const { engine } = browserInfo;
  const webkit = engine.name === "WebKit";
  return[
  {
    element: ".title .click-panel",
    popover: {
      title: "点击标题",
      description: "点击标题打开菜单",
    },
  },
  {
    element: ".existed-map-btn",
    popover: {
      title: "从模板新建",
      description: "在已有的地图上修改",
    },
  },
  {
    element: ".tools",
    onHighlighted:()=>{},
    popover: {
      title: "选择一个你喜欢的城市",
      description: "然后点击下一步",
      showButtons:["next"],
      onNextClick:()=>{
        driver.moveNext();
      }
    },
  },
  {
    element: ".confirm-add-from-existed-map-btn",
    popover: {
      title: "以此为模板新建",
      description: "确认新建前请确保已经保存了当前的地图",
    },
  },
  {
    element: ".title .click-panel",
    popover: {
      title: "打开菜单",
      description: "选择作为文件导出",
    },
  },
  {
    element: ".export-as-file-btn",
    popover: {
      title: "作为文件导出",
      description: "选择作为文件导出",
    },
  },
  {
    element: ".import-file-btn",
    onHighlighted:()=>{},
    popover: {
      title: "导入刚才导出文件",
      description: "下次点击导入文件可以继续编辑",
      showButtons:["next"],
      onNextClick:driver.moveNext
    },
  },
  {
    element: `.export-as${webkit?'-svg':''}-image-btn`,
    popover: {
      title: "导出图片",
      description: "点击导出图片。导出可能会导致卡顿几秒属于正常现象",
    },
  },
  {
    element: `.recover-btn`,
    popover: {
      title: "从缓存中恢复数据",
      description: "如果没保存的时候不小心刷新，可以点击这里恢复数据",
    },
  },
  {
    element: `.export-recover-btn`,
    popover: {
      title: "导出恢复数据",
      description: "如果某一步操作后导致报错或崩溃，点击这里导出最后一次正确的数据。（如果遇到这种情况，请反馈给作者）",
    },
  },
];
}