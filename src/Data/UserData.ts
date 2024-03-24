import { Dispatch, SetStateAction } from "react";
export class StationProps {
  stationId!: number;
  stationName!: string;
  position!: number[];
  shape!: string;
  lineIds!: number[];
  bendFirst!: boolean;
}
export class LineProps {
  lineId!: number;
  lineName!: string;
  color!: string;
  stationIds!: number[];
  sign!: string;
  order!: number;
}
export class UserDataType {
  stations!: Map<number | string, StationProps>;
  lines!: Map<number | string, LineProps>;
}
const initDataMock: UserDataType = {
  stations: [
    {
      stationId: 1,
      stationName: "风起地站",
      position: [200, 300],
      shape: "cicle",
      lineIds: [1, 2],
      bendFirst: true,
    },
    {
      stationId: 2,
      stationName: "蒙德站",
      position: [300, 500],
      shape: "square",
      lineIds: [1],
      bendFirst: false,
    },
    {
      stationId: 3,
      stationName: "达达乌帕谷",
      position: [500, 600],
      shape: "square",
      lineIds: [2],
      bendFirst: false,
    },
    {
      stationId: 4,
      stationName: "望风山地",
      position: [400, 300],
      shape: "square",
      lineIds: [2],
      bendFirst: true,
    },
  ].reduce((map, cur) => {
    map.set(cur.stationId, cur);
    return map;
  }, new Map()),
  lines: [
    {
      lineId: 1,
      lineName: "1号线",
      color: "#EA0B2A",
      stationIds: [1, 2],
      sign: "1",
      order: 1,
    },
    {
      lineId: 2,
      lineName: "2号线",
      color: "#94D40B",
      stationIds: [1, 3, 4],
      sign: "2",
      order: 2,
    },
  ].reduce((map, cur) => {
    map.set(cur.lineId, cur);
    return map;
  }, new Map()),
};

export const initData = {
  // stations: [],
  // lines: [],
  ...initDataMock,
};

export const useData = (
  id: number,
  setData: Dispatch<SetStateAction<UserDataType>>,
  state: UserDataType
) => {
  const { stations, lines } = state;
  return {
    setStationName: (name: string) => {
      setData((state) => {
        const station = stations.get(id);
        station!.stationName = name;
        return { ...state };
      });
    },
    setStationPosition: (x: number, y: number) => {
      setData((state) => {
        const station = stations.get(id);
        station!.position = [x, y];
        return { ...state };
      });
    },
    setStationShape: (shape: string) => {
      setData((state) => {
        const station = stations.get(id);
        station!.shape = shape;
        return { ...state };
      });
    },
    getStationById: (stationId: string | number) => {
      return stations.get(stationId);
    },
    getStationsInThisLine: () => {
      return lines.get(id)!.stationIds.map((x) => stations.get(x));
    },
    setLineName: (name: string) => {
      setData((state) => {
        const line = lines.get(id);
        line!.lineName = name;
        return { ...state };
      });
    },
    setSign: (sign: string) => {
      setData((state) => {
        const line = lines.get(id);
        line!.sign = sign;
        return { ...state };
      });
    },
    setOrder: (order: number) => {
        setData((state) => {
          const line = lines.get(id);
          line!.order = order;
          return { ...state };
        });
      },
      setColor: (color: string) => {
        setData((state) => {
          const line = lines.get(id);
          line!.color = color;
          return { ...state };
        });
      },
  };
};
