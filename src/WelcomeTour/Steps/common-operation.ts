import { DriveStep, Driver } from "driver.js";
import {t} from 'i18next';

export const getSteps = (driver: Driver): DriveStep[] => [
  {
    element: ".ScaleLayer",
    onHighlighted:()=>{},
    popover: {
      title: t('tour.tryScale'),
      description: window.ontouchend === null? t('tour.touchScale'): t('tour.mouseScale'),
      showButtons:['next'],
      onNextClick:driver.moveNext
    },
  },
  {
    element: ".title .click-panel",
    popover: {
      title: t('tour.clickTile'),
      description: t('tour.clickOpenMenu'),
    },
  },
  {
    element: ".title",
    popover: {
      title: t('zai-ci-dian-ji-biao-ti'),
      description: t('ke-yi-xiu-gai-biao-ti'),
    },
  },
  {
    element: ".menu",
    popover: {
      title: t('dian-ji-ren-yi-kong-bai-qu-yu-tui-chu-cai-dan'),
      description: t('tui-chu-cai-dan'),
    },
  },
  {
    element: ".station-descend-31",
    popover: {
      title: t('dian-ji-zhan-dian'),
      description: t('yi-da-kai-zhan-dian-ka-pian'),
    },
  },
  {
    element: ".station-card",
    popover: {
      title: t('zhan-dian-ka-pian'),
      description: t('ke-yi-zai-zhe-li-bian-ji-zhan-dian-de-suo-you-she-zhi'),
      showButtons:["next"],
    //   onNextClick:driver.moveNext
    },
  },
  {
    element: ".ScaleLayer",
    popover: {
      title: t('chang-shi-dian-ji-xian-lu'),
      description: t('tu-zhong-de-cai-se-xian-tiao-ji-wei-xian-lu-ru-guo-wu-fa-xuan-zhong-ke-yi-chang-shi-fang-da-di-tu-zai-dian-xuan'),
    },
  },
  {
    element: ".line-card",
    popover: {
      title: t('xian-lu-ka-pian'),
      description: t('ke-yi-zai-zhe-li-bian-ji-xian-lu-de-suo-you-she-zhi'),
      showButtons:["next"],
    //   onNextClick:driver.moveNext
    },
  },
];
