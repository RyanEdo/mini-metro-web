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
  sign!: string;
  order!: number;
  bendFirst!: boolean[];
}

export type ChangeSteps = {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  stationId: number;
};

export type InsertInfo = {insertIndex: number, line: LineProps};

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
      lineIds: [1, 2, 3],
    },
    {
      stationId: 2,
      stationName: "蒙德站",
      position: [300, 500],
      shape: "square",
      lineIds: [1, 3],
    },
    {
      stationId: 3,
      stationName: "达达乌帕谷",
      position: [500, 600],
      shape: "square",
      lineIds: [2, 3],
    },
    {
      stationId: 4,
      stationName: "望风山地",
      position: [400, 300],
      shape: "square",
      lineIds: [2, 3],
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
      bendFirst: [1, 0],
    },
    {
      lineId: 2,
      lineName: "2号线",
      color: "#94D40B",
      stationIds: [1, 3, 4],
      sign: "2",
      order: 2,
      bendFirst: [1, 0, 1],
    },
    {
      lineId: 3,
      lineName: "3号线",
      color: "#F8D000",
      stationIds: [1, 4, 2, 3, 4],
      sign: "3",
      order: 3,
      bendFirst: [1, 0, 0, 0, 0],
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
export const deleteStation = (
  data: UserDataType,
  setData: Dispatch<SetStateAction<UserDataType>>,
  stationId: number
) => {
  const { stations, lines } = data;
  const station = stations.get(stationId);
  const { lineIds } = station!;
  //detele stations in line
  lineIds.forEach((lineId) => {
    const newStationIds: number[] = [];
    const newBendFirst: boolean[] = [];
    const line = lines.get(lineId);
    const { stationIds, bendFirst } = line!;
    stationIds.forEach((id, index) => {
      if (stationId !== id) {
        newStationIds.push(id);
        newBendFirst.push(bendFirst[index]);
      }
    });
    lines.set(lineId, {
      ...line!,
      stationIds: newStationIds,
      bendFirst: newBendFirst,
    });
  });
  // delete station
  stations.delete(stationId);
  setData({ ...data });
};

export const dataProcessor = (
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
        station!.position = [x, y].map((x) =>
          Number.isNaN(x) ? 0 : Math.round(x)
        );
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
    getLineById: (lineId: string | number) => {
      return lines.get(lineId);
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
    getBendFirst: (stationIndex: number) => {
      const line = lines.get(id);
      return line?.bendFirst[stationIndex];
    },
    setBendFirst: (stationIndex: number, bendFirst: boolean) => {
      setData((state) => {
        const line = lines.get(id);
        line!.bendFirst[stationIndex] = bendFirst;
        return { ...state };
      });
    },
    deleteStation: () => deleteStation(state, setData, id),
    addStationToLine: (stationId: number, stationIndex: number)=>{
      setData((state) => {
        const line = lines.get(id);
        const {stationIds, bendFirst} = line!;
        stationIds.splice(stationIndex,0,stationId);
        bendFirst.splice(stationIndex,0,true);
        return { ...state };
      });
    }
  };
};

export const addNewStation = (
  data: UserDataType,
  setData: Dispatch<SetStateAction<UserDataType>>,
  x: number,
  y: number,
  record: StationProps[],
  setRecord: React.Dispatch<
    React.SetStateAction<StationProps[] | ChangeSteps[]>
  >,
  currentRecordIndex: number,
  setCurrentRecordIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  const { stations } = data;
  let max = -Infinity;
  stations.forEach((station) => {
    max = Math.max(station.stationId, max);
  });
  const newStation = {
    stationId: max + 1,
    stationName: `新增站点 ${max + 1}`,
    position: [x, y].map(Math.round),
    shape: "square",
    lineIds: [],
  };
  const newRecord = record.slice(0, currentRecordIndex + 1);
  setRecord(newRecord.concat([newStation]));
  setCurrentRecordIndex(currentRecordIndex + 1);
  stations.set(max + 1, newStation);
  setData({ ...data });
};

export const addStationFromRecord = (
  data: UserDataType,
  setData: Dispatch<SetStateAction<UserDataType>>,
  station: StationProps
) => {
  const { stations } = data;
  let max = -Infinity;
  stations.forEach((station) => {
    max = Math.max(station.stationId, max);
  });
  const newStation = { ...station, stationId: max + 1 };
  stations.set(max + 1, newStation);
  setData({ ...data });
};

