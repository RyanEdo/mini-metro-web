import { MouseEvent, WheelEventHandler } from "react";
import UAParser from 'ua-parser-js';

export const mapToArr = <K, V>(map: Map<K, V>) => {
  const arr: V[] = [];
  map.forEach((x) => arr.push(x));
  return arr;
};

export const scrollOptimize = (e: MouseEvent) => {
  const { currentTarget: editTool } = e;
  const editTools = editTool.parentElement;
  const { scrollHeight, childNodes, offsetHeight } = editTools!;
  let index = 0;
  childNodes.forEach((x, i) => {
    if (x === editTool) index = i;
  });
  const scrollY = ((scrollHeight - offsetHeight) / childNodes.length) * index;
  editTools!.scrollTo({ top: scrollY, behavior: "smooth" });
};

export const arrayToMap = <T>(
  keyName: keyof T,
  arr: T[]
): Map<T[keyof T], T> => {
  const resultMap = new Map<T[keyof T], T>();
  for (const item of arr) {
    const keyValue = item[keyName];
    if (keyValue !== undefined) {
      resultMap.set(keyValue, item);
    }
  }
  return resultMap;
};

export const onWheelX: WheelEventHandler = (event) => {
  event.stopPropagation();
  event.preventDefault();
  const { currentTarget, deltaY } = event;
  currentTarget.scrollBy({
    top: 0,
    left: deltaY,
    behavior: "auto",
  });
};

export const onWheelY: WheelEventHandler = (event) => {
  const { currentTarget, deltaY } = event;

  const { scrollHeight, clientHeight, scrollTop } = currentTarget;
  const deltaHeight = scrollHeight - clientHeight;
  const scrollMax =
    scrollTop > deltaHeight - 1 && scrollTop < deltaHeight + 1 && deltaY > 0;
  const scrollMin = scrollTop === 0 && deltaY < 0;
  // console.log(deltaY, scrollTop, scrollHeight - clientHeight);
  if (!(scrollMax || scrollMin)) {
    currentTarget.scrollBy({
      top: deltaY,
      left: 0,
      behavior: "auto",
    });
    event.stopPropagation();
    event.preventDefault();
  }
};


const parser = new UAParser(navigator.userAgent); 
export const browserInfo = parser.getResult();