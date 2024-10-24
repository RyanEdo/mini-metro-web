import { DriveStep, Driver } from "driver.js";
import {t} from 'i18next';
export const getSteps = (driver: Driver): DriveStep[] => [
  {
    element: ".station-descend-31",
    popover: {
      title: t('dian-ji-zhan-dian'),
      description: t('yi-da-kai-zhan-dian-ka-pian-0'),
    },
  },
  {
    element: ".station-card",
    popover: {
      title: t('zhan-dian-ka-pian'),
      description: t('ke-yi-zai-zhe-li-bian-ji-zhan-dian-de-suo-you-she-zhi'),
      showButtons:["next"],
      // onNextClick:driver.moveNext
    },
  },
  {
    element: ".name-detail",
    popover: {
      title: t('bian-ji-zhan-dian-wei-zhi'),
      description: t('dian-ji-zuo-biao-zhi-hou-shi-yong-shu-biao-gun-lun-ke-yi-jing-que-tiao-jie'),
      showButtons:["next"],
      // onNextClick:driver.moveNext
    },
  },
  {
    element: ".edit-tool.color",
    popover: { title: t('dian-ji-ci-chu-xiu-gai-zhan-dian-xing-zhuang'), description: t('xiu-gai-xing-zhuang') ,side:"right"},
  },
  {
    element: ".edit-tool.operation",
    popover: { title: t('dian-ji-ci-chu-shan-chu-zhan-dian-huo-xin-jian-xian-lu'), description: t('shan-chu-huo-xin-jian'),side:"right" },
  },
  {
    element: ".edit-tool.operation.tag",
    popover: { title: t('dian-ji-ci-chu-she-zhi-zhan-dian-ming-cheng-wei-zhi'), description: t('zhan-dian-ming-wei-zhi') },
  },
  {
    element: ".tag-detail",
    popover: { title: t('dian-ji-hui-se-de-fang-kuai-xuan-ze-fang-wei'), description: t('dian-ji-zhong-jian-de-wen-zi-hui-fu-zi-dong-wei-zhi'),showButtons:['next'],onNextClick:driver.moveNext },
  },
];
