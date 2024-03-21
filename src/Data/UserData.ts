import { Dispatch, SetStateAction } from "react";
export class StationProps {
  stationId!: number;
  stationName!: string;
  position!: number[];
  shape!: string;
  lineIds!: number[];
}
export class LineProps {
  lineId!: number;
  lineName!: string;
  color!: string;
  stationIds!: number[];
}
export class UserDataType {
  stations!: StationProps[];
  lines!: LineProps[];
}
const initDataMock: UserDataType = {
  stations: [
    {
      stationId: 1,
      stationName: "风起地站",
      position: [200, 300],
      shape: "cicle",
      lineIds: [1, 2],
    },
    {
      stationId: 2,
      stationName: "蒙德站",
      position: [300, 500],
      shape: "square",
      lineIds: [1],
    },
    {
      stationId: 3,
      stationName: "达达乌帕谷",
      position: [500, 600],
      shape: "square",
      lineIds: [2],
    },
    {
      stationId: 4,
      stationName: "望风山地",
      position: [400, 300],
      shape: "square",
      lineIds: [2],
    },
  ],
  lines: [
    {
      lineId: 1,
      lineName: "1号线",
      color: "EA0B2A",
      stationIds: [1, 2],
    },
    {
      lineId: 2,
      lineName: "2号线",
      color: "94D40B",
      stationIds: [1, 3, 4],
    },
  ],
};

export const initData = {
  // stations: [],
  // lines: [],
  ...initDataMock,
};

export const useData = (id: number, setData: Dispatch<SetStateAction<UserDataType>>) => {
  return {
    setStationName: (name: string) => {
      setData((state) => {
        const { stations } = state;
        const station = stations.find((x) => (x.stationId === id));
        station!.stationName = name;
        return { ...state };
      });
    },
    setStationPosition: (x: number, y: number) => {
        setData((state) => {
          const { stations } = state;
          const station = stations.find((x) => (x.stationId === id));
          station!.position = [x,y];
          return { ...state };
        });
      },
      setStationShape: (shape: string) => {
        setData((state) => {
          const { stations } = state;
          const station = stations.find((x) => (x.stationId === id));
          station!.shape = shape;
          return { ...state };
        });
      },
  };
};
