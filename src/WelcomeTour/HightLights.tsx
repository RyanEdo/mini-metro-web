import React from "react";
import Infinity from "../Resource/Icon/infinity";
import AirWaveIcon from "../Resource/Icon/airwave";
import PageViewIcon from "../Resource/Icon/pageview";
import BoltIcon from "../Resource/Icon/bolt";
import TouchIcon from "../Resource/Icon/touch";
import AutoIcon from "../Resource/Icon/auto";
import ExportIcon from "../Resource/Icon/export";
import {t} from 'i18next';
export const hightLights = [
  {
    id:'common-operation',
    icon: <Infinity />,
    title: t('wu-xian-zi-chan'),
    subTitle: t('wu-xian-da-hua-bu'),
    introText: [
      [false, t('zhi-chi'), t('wu-xian-tiao-xian-lu')],
      [false, t('zhi-chi'), t('wu-xian-ge-zhan-dian')],
    ],
    more: t('le-jie-ji-ben-cao-zuo')
  },
  {
    id:'line-card',
    icon: <AirWaveIcon className="air"/>,
    title: t('ling-huo-zou-xian'),
    subTitle: t('yi-tiao-xian-lu-neng-duo-ci-chuan-guo-tong-yi-zhan'),
    introText: [
      [false, t('zhi-chi'), t('q-zi-zou-xian-yu-zou-xian')],
      [false, t('zhi-chi-she-zhi'), t('zhi-xian')],
    ],
    more: t('le-jie-xian-lu-she-zhi')
  },
  {
    id:'station-card',
    icon: <PageViewIcon />,
    title: t('fang-bian-cha-kan'),
    subTitle: t('ka-pian-hua-zhan-shi-zhan-dian-yu-xian-lu'),
    introText: [
      [false, t('zhan-dian-xian-lu-hu-xiang'), t('guan-lian')],
      [true, t('gao-liang'), t("zhan-shi-xuan-zhong-zhan-dian-yu-xian-lu"),]
    ],
    more: t('le-jie-zhan-dian-ka-pian')
  },
  {
    id:'quick-edit',
    icon: <BoltIcon />,
    title: t('gao-xiao-bian-ji'),
    subTitle: t('lian-xu-chuang-jian-zhan-dian-mo-shi'),
    introText: [
      [true, t('lian-xu-tian-jia-zhan-dian'), t('mo-shi')],
      [false, t('zhi-chi'), t('che-hui'), t('yu'), t('zhong-zuo')],
    ],
    more: t('le-jie-kuai-su-chuang-jian')
  },
  {
    id:'mobile',
    icon: <TouchIcon />,
    title: t('yi-dong-duan-zhi-chi'),
    subTitle: t('wan-zheng-de-chu-kong-shi-jian-zhi-chi'),
    introText: [
      [true, t('dan-zhi'), t('tuo-dong'), t('shuang-zhi'), t('suo-fang-di-tu')],
      [false, t('shi-bie-dong-zuo-yi-tu'), t('jian-shao-wu-cao-zuo')],
    ],
    more: t('zai-ping-ban-shang-ti-yan')
  },
  {
    id:'tag-setting',
    icon: <AutoIcon />,
    title: t('zi-dong-bi-rang'),
    subTitle: t('zi-dong-tian-jia-pian-yi-zhi'),
    introText: [
      [false, t('gong-xian-xian-lu'), t('bu-hui-zhong-die')],
      [false, t('zhan-dian-ming-cheng-zi-dong-xuan-ze-bai-fang-wei-zhi')],
    ],
    more: t('le-jie-biao-qian-she-zhi')
  },
  {
    id:'export',
    icon: <ExportIcon />,
    title: t('dao-ru-dao-chu'),
    subTitle: t('dao-chu-gao-fen-bian-shuai-tu-pian'),
    introText: [
      [false, t('dao-chu'), t('pngsvg-tu-pian')],
      [false, t('zhi-chi-cong-mo-ban-chuang-jian')],
    ],
    more: t('le-jie-dao-ru-dao-chu')
  },
];
