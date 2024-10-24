import { DriveStep, Driver } from "driver.js";
import {t} from 'i18next';
export const getSteps = (driver: Driver): DriveStep[] => [
  {
    element: ".title .click-panel",
    popover: {
      title: t('dian-ji-biao-ti'),
      description: t('dian-ji-biao-ti-da-kai-cai-dan-1'),
    },
  },
  {
    element: ".auto-hidden-btn",
    popover: {
      title: t('guan-bi-zi-dong-yin-cang'),
      description: t('zhan-dian-ming-hui-zai-di-tu-suo-fang-dao-xiao-chi-du-shi-zi-dong-yin-cang-guan-bi-zi-dong-yin-cang-yi-que-bao-ke-yi-yi-zhi-xian-shi-zhan-dian-ming-cheng'),
    },
  },
  {
    element: ".menu",
    popover: {
      title: t('dian-ji-ren-yi-kong-bai-qu-yu-tui-chu-cai-dan-0'),
      description: t('tui-chu-cai-dan-0'),
    },
  },
  {
    element: ".station-descend-31",
    popover: {
      title: t('dian-ji-zhan-dian'),
      description: t('yi-da-kai-zhan-dian-ka-pian-1'),
    },
  },
  {
    element: ".edit-tools",
    popover: { title: t('zai-zhe-li-xiang-xia-gun-dong-yi-xia'), description: t('zai-dian-ji-biao-qian-an-niu') },
  },
  {
    element: ".tag-detail",
    popover: { title: t('chang-shi-gai-bian-zhan-dian-ming-dao-you-xia-jiao'), description: t('dian-ji-you-xia-jiao-de-hui-se-fang-kuai') },
  },
  {
    element: ".station-name-descend-31",
    popover: { title: t('ke-yi-kan-dao-zhan-dian-ming-yi-jing-wei-yu-zhan-dian-you-xia-jiao-le'), description: t('ke-yi-yong-zhe-zhong-fang-fa-xiu-gai-zhan-dian-ming-wei-zhi'), showButtons:["next"],onNextClick:driver.moveNext },
  },
  {
    element: ".tag-item.center",
    popover: { title: t('dian-ji-zhong-jian-de-wen-zi-hui-fu-dao-zi-dong-xuan-ze-wei-zhi'), description: t('hui-fu-dao-zi-dong-xuan-ze-wei-zhi') },
  },
];
