import { arrayToMap } from "./util";

export const colorSH = [
    {
        "line": "1号线",
        "color": "#EA0B2A",
        "color_name": "正红色",
        "rgb": [234, 11, 42]
    },
    {
        "line": "2号线",
        "color": "#94D40B",
        "color_name": "绿色",
        "rgb": [148, 212, 11]
    },
    {
        "line": "3号线",
        "color": "#F8D000",
        "color_name": "黄色",
        "rgb": [248, 208, 0]
    },
    {
        "line": "4号线",
        "color": "#60269E",
        "color_name": "紫色",
        "rgb": [96, 38, 158]
    },
    {
        "line": "5号线",
        "color": "#934C9A",
        "color_name": "紫红色",
        "rgb": [147, 76, 154]
    },
    {
        "line": "6号线",
        "color": "#D80169",
        "color_name": "品红色",
        "rgb": [216, 1, 105]
    },
    {
        "line": "7号线",
        "color": "#FE6B01",
        "color_name": "橙色",
        "rgb": [254, 107, 1]
    },
    {
        "line": "8号线",
        "color": "#00A0E8",
        "color_name": "蓝色",
        "rgb": [0, 160, 232]
    },
    {
        "line": "9号线",
        "color": "#6FC5E8",
        "color_name": "淡蓝色",
        "rgb": [111, 197, 232]
    },
    {
        "line": "10号线",
        "color": "#C3A5E1",
        "color_name": "淡紫色",
        "rgb": [195, 165, 225]
    },
    {
        "line": "11号线",
        "color": "#792330",
        "color_name": "棕色",
        "rgb": [121, 35, 48]
    },
    {
        "line": "12号线",
        "color": "#007A61",
        "color_name": "深绿色",
        "rgb": [0, 122, 97]
    },
    {
        "line": "13号线",
        "color": "#F095CE",
        "color_name": "粉色",
        "rgb": [240, 149, 206]
    },
    {
        "line": "14号线",
        "color": "#827805",
        "color_name": "橄榄绿色",
        "rgb": [130, 120, 5]
    },
    {
        "line": "15号线",
        "color": "#BDA686",
        "color_name": "香槟金色",
        "rgb": [189, 166, 134]
    },
    {
        "line": "16号线",
        "color": "#2AD2C5",
        "color_name": "水绿色",
        "rgb": [42, 210, 197]
    }
];

export const colorSHMap = arrayToMap("color",colorSH);