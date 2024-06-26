import React from "react";
import Infinity from "../Resource/Icon/infinity";
import AirWaveIcon from "../Resource/Icon/airwave";
import PageViewIcon from "../Resource/Icon/pageview";
import BoltIcon from "../Resource/Icon/bolt";
import TouchIcon from "../Resource/Icon/touch";
import AutoIcon from "../Resource/Icon/auto";
import ExportIcon from "../Resource/Icon/export";

export const hightLights = [
  {
    id:'common-operation',
    icon: <Infinity />,
    title: "无限资产",
    subTitle: "无限大画布",
    introText: [
      [false, "支持", "无限条线路"],
      [false, "支持", "无限个站点"],
    ],
    more: "了解基本操作"
  },
  {
    id:'line-card',
    icon: <AirWaveIcon className="air"/>,
    title: "灵活走线",
    subTitle: "一条线路能多次穿过同一站",
    introText: [
      [false, "支持", "Q字走线与α走线"],
      [false, "支持设置", "支线"],
    ],
    more: "了解线路设置"
  },
  {
    id:'station-card',
    icon: <PageViewIcon />,
    title: "方便查看",
    subTitle: "卡片化展示站点与线路",
    introText: [
      [false, "站点线路互相", "关联"],
      [true, "高亮", "展示选中站点与线路"],
    ],
    more: "了解站点卡片"
  },
  {
    id:'quick-edit',
    icon: <BoltIcon />,
    title: "高效编辑",
    subTitle: "连续创建站点模式",
    introText: [
      [true, "连续添加站点", "模式"],
      [false, "支持", "撤回", "与", "重做"],
    ],
    more: "了解快速创建"
  },
  {
    id:'mobile',
    icon: <TouchIcon />,
    title: "移动端支持",
    subTitle: "完整的触控事件支持",
    introText: [
      [true, "单指", "拖动", "双指", "缩放地图"],
      [false, "识别动作意图", "减少误操作"],
    ],
    more: "在平板上体验"
  },
  {
    id:'tag-setting',
    icon: <AutoIcon />,
    title: "自动避让",
    subTitle: "自动添加偏移值",
    introText: [
      [false, "共线线路", "不会重叠"],
      [false, "站点名称自动选择摆放位置"],
    ],
    more: "了解标签设置"
  },
  {
    id:'export',
    icon: <ExportIcon />,
    title: "导入导出",
    subTitle: "导出高分辨率图片",
    introText: [
      [false, "导出", "PNG/SVG图片"],
      [false, "支持从模版创建"],
    ],
    more: "了解导入导出"
  },
];
