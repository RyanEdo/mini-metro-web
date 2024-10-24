import { DriveStep, Driver } from "driver.js";
import { browserInfo } from "../../Common/util";
import {t} from 'i18next';
export const getSteps = (driver: Driver): DriveStep[] => {
  const { engine } = browserInfo;
  const webkit = engine.name === "WebKit";
  return[
  {
    element: ".title .click-panel",
    popover: {
      title: t('dian-ji-biao-ti'),
      description: t('dian-ji-biao-ti-da-kai-cai-dan'),
    },
  },
  {
    element: ".existed-map-btn",
    popover: {
      title: t('cong-mo-ban-xin-jian'),
      description: t('zai-yi-you-de-di-tu-shang-xiu-gai'),
    },
  },
  {
    element: ".tools",
    onHighlighted:()=>{},
    popover: {
      title: t('xuan-ze-yi-ge-ni-xi-huan-de-cheng-shi'),
      description: t('ran-hou-dian-ji-xia-yi-bu'),
      showButtons:["next"],
      onNextClick:()=>{
        driver.moveNext();
      }
    },
  },
  {
    element: ".confirm-add-from-existed-map-btn",
    popover: {
      title: t('yi-ci-wei-mo-ban-xin-jian'),
      description: t('que-ren-xin-jian-qian-qing-que-bao-yi-jing-bao-cun-le-dang-qian-de-di-tu'),
    },
  },
  {
    element: ".title .click-panel",
    popover: {
      title: t('da-kai-cai-dan'),
      description: t('xuan-ze-zuo-wei-wen-jian-dao-chu'),
    },
  },
  {
    element: ".export-as-file-btn",
    popover: {
      title: t('zuo-wei-wen-jian-dao-chu'),
      description: t('xuan-ze-zuo-wei-wen-jian-dao-chu-0'),
    },
  },
  {
    element: ".import-file-btn",
    onHighlighted:()=>{},
    popover: {
      title: t('dao-ru-gang-cai-dao-chu-wen-jian'),
      description: t('xia-ci-dian-ji-dao-ru-wen-jian-ke-yi-ji-xu-bian-ji'),
      showButtons:["next"],
      onNextClick:driver.moveNext
    },
  },
  {
    element: `.export-as${webkit?'-svg':''}-image-btn`,
    popover: {
      title: t('dao-chu-tu-pian'),
      description: t('dian-ji-dao-chu-tu-pian-dao-chu-ke-neng-hui-dao-zhi-ka-dun-ji-miao-shu-yu-zheng-chang-xian-xiang'),
    },
  },
  {
    element: `.recover-btn`,
    popover: {
      title: t('cong-huan-cun-zhong-hui-fu-shu-ju'),
      description: t('ru-guo-mei-bao-cun-de-shi-hou-bu-xiao-xin-shua-xin-ke-yi-dian-ji-zhe-li-hui-fu-shu-ju'),
    },
  },
  {
    element: `.export-recover-btn`,
    popover: {
      title: t('dao-chu-hui-fu-shu-ju'),
      description: t('ru-guo-mou-yi-bu-cao-zuo-hou-dao-zhi-bao-cuo-huo-beng-kui-dian-ji-zhe-li-dao-chu-zui-hou-yi-ci-zheng-que-de-shu-ju-ru-guo-yu-dao-zhe-zhong-qing-kuang-qing-fan-kui-gei-zuo-zhe'),
    },
  },
];
}