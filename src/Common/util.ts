import { MouseEvent } from "react";

export const mapToArr = (map: Map<any, any>) => {
  const arr: any[] = [];
  map.forEach((x) => arr.push(x));
  return arr;
};

export const scrollOptimize = (e:MouseEvent)=>{
    const {currentTarget: editTool} = e;
    const editTools = editTool.parentElement;
    const {scrollHeight, childNodes, offsetHeight} = editTools!;
    let index = 0;
    childNodes.forEach((x,i)=>{
        if(x===editTool) index = i;
    })
    const scrollY = (scrollHeight - offsetHeight)/childNodes.length*index;
    editTools!.scrollTo({top:scrollY, behavior:'smooth'})
}