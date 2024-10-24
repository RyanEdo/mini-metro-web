import { DriveStep, Driver } from "driver.js";
import {t} from 'i18next';
export const getSteps = (driver: Driver): DriveStep[] => [
  {
    element: ".title .click-panel",
    popover: {
      title: t('da-kai-cai-dan-0'),
      description: t('dian-ji-biao-ti-da-kai-cai-dan-0'),
    },
  },
  {
    element: "#menu-add-station",
    popover: {
      title: t('dian-ji-tian-jia-zhan-dian'),
      description: t('jin-ru-tian-jia-zhan-dian-mo-shi'),
    },
  },
  {
    element: ".ScaleLayer",
    onHighlighted: () => {},
    popover: {
      title: t('dian-ji-ren-yi-kong-bai-chu-tian-jia-zhan-dian'),
      description: t('tian-jia-hao-zhi-hou-dian-ji-xia-yi-bu-jian-yi-nin-zai-ping-mu-zuo-shang-jiao-de-kong-bai-qu-yu-tian-jia-san-ge-zhan-dian'),
      showButtons: ["next"],
      onNextClick: () => {
        driver.moveNext();
      },
    },
  },
  {
    element: "#add-station-finish-btn",
    popover: { title: t('dian-ji-wan-cheng'), description: t('tui-chu-bian-ji-mo-shi') },
  },
  {
    element: ".station-descend-1",
    popover: {
      title: t('dian-ji-gang-cai-chuang-jian-de-zhan-dian'),
      description: t('da-kai-zhan-dian-xin-xi-ka-pian'),
    },
  },
  {
    element: ".station-card-operation",
    popover: { title: t('dian-ji-cao-zuo-xuan-xiang-ka'), description: t('wo-men-lai-tian-jia-xian-lu') },
  },
  {
    element: ".add-new-line-btn",
    popover: {
      title: t('dian-ji-yi-ci-wei-qi-dian-xin-jian-xian-lu'),
      description: t('jin-ru-tian-jia-xian-lu-mo-shi'),
    },
  },
  {
    element: ".station-descend-2",
    popover: {
      title: t('dian-ji-zhan-dian-0'),
      description: t('lian-jie-zhan-dian'),
    },
  },
  {
    element: ".station-descend-3",
    popover: {
      title: {t('dian-ji-zhan-dian')},
      description: "连接站点",
    },
  },
  {
    element: "#add-line-finish-btn",
    popover: { title: "点击完成", description: "线路就创建好了" },
  },
];
