import { DriveStep, Driver } from "driver.js";
import {t} from 'i18next';
export const getSteps = (driver: Driver): DriveStep[] => [
  {
    element: ".ScaleLayer",
    popover: {
      title: t('dian-ji-ren-yi-xian-lu'),
      description: t('tu-zhong-cai-se-qu-xian-biao-shi-di-tie-xian-lu'),
    },
  },
  {
    element: ".line-card",
    popover: {
      title: t('xian-lu-ka-pian-0'),
      description: t('ke-yi-zai-zhe-li-bian-ji-xian-lu-de-suo-you-she-zhi-0'),
      showButtons:["next"],
      // onNextClick:driver.moveNext
    },
  },
  {
    element: ".bend-first",
    popover: {
      title: t('dian-ji-ci-chu-kong-zhi-xian-lu-zai-liang-zhan-zhi-jian-de-zou-xiang'),
      description: t('zhan-dian-qu-jian-lian-xian-zhi-you-liang-zhong-fang-shi-xie-xian-yu-zhi-xian'),
    },
  },
  {
    element: ".expand",
    popover: { title: t('fang-da-an-niu'), description: t('ke-yi-tuo-kuan-xian-lu-ka-pian') },
  },
  {
    element: ".shrink",
    popover: { title: t('suo-xiao-an-niu'), description: t('zai-suo-xiao-zhuang-tai-ke-yi-dian-ji-geng-duo-she-zhi') },
  },
  {
    element: ".edit",
    popover: { title: t('bian-ji-an-niu'), description: t('jin-ru-geng-duo-she-zhi-mian-ban') },
  },
  {
    element: ".name-detail",
    popover: { title: t('ci-chu-xiu-gai-xian-lu-ming-cheng-yu-biao-shi'), description: t('pai-xu-ke-yi-kong-zhi-xian-lu-jian-de-zhe-dang-guan-xi') ,showButtons:["next"],onNextClick:driver.moveNext},
  },
  {
    element: ".edit-tool.color",
    popover: { title: t('dian-ji-ci-chu-xiu-gai-xian-lu-biao-shi-se'), description: t('zuo-xia-jiao-de-yan-se-xuan-ze-qi-ke-yi-qu-se') ,side:"right"},
  },
  {
    element: ".edit-tool.operation",
    popover: { title: t('dian-ji-ci-chu-shan-chu-xian-lu-huo-zhe-she-zhi-zhi-xian'), description: t('she-zhi-zhi-xian-hou-xian-lu-hui-yi-xu-xian-xian-shi-qie-lian-jie-chu-bu-zai-xian-shi-ba-shou'),side:"right" },
  },
  {
    element: ".done",
    popover: { title: t('dian-ji-ci-chu-wan-cheng-she-zhi'), description: t('hui-dao-zhan-dian-ye') },
  },
  {
    element: ".stations-count",
    popover: { title: t('xian-shi-tu-jing-zhan-dian-ka-pian'), description: t('dian-ji-ci-chu-suo-yi-tu-jing-de-zhan-dian-ka-pian') },
  },
];
