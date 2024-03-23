export const mapToArr = (map: Map<any, any>) => {
  const arr: any[] = [];
  map.forEach((x) => arr.push(x));
  return arr;
};
