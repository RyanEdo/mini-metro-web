import { MouseEvent, WheelEventHandler } from "react";
import UAParser from "ua-parser-js";
import { TransformProps, UserDataType } from "../Data/UserData";

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
  const scrollY =
    ((scrollHeight - offsetHeight) / (childNodes.length - 1)) * index;
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
export const browserInfo = parser.getResult(); //{engine:{name:''}} //
export function generateRandomColor(): string {
  // Generate a random hexadecimal color
  const hex = Math.floor(Math.random() * 16777216).toString(16);
  // Ensure the color has sufficient contrast relative to white
  const luminance =
    (parseInt(hex, 16) >> 16) * 0.299 +
    ((parseInt(hex, 16) >> 8) & 0xff) * 0.587 +
    (parseInt(hex, 16) & 0xff) * 0.114;
  const isLightColor = luminance > 128; // Determine if the color is light
  // Adjust the color to be darker if it's light, or lighter if it's dark
  const adjustedHex = isLightColor
    ? (parseInt(hex, 16) - 0x333333).toString(16)
    : (parseInt(hex, 16) + 0x333333).toString(16);
  // Ensure the color is 6 digits long
  const finalHex = adjustedHex.padStart(6, "0");
  return `#${finalHex}`;
}

export async function base64ToFile(base64: string): Promise<File> {
  const res = await fetch(base64);
  const blob = await res.blob();
  return new File([blob], "image", { type: blob.type });
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
export function exportJson(content: string, filename: string) {
  const exportContent = (content: string) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(
      new Blob([content], { type: "application/json" })
    );
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  readFileFromIndexedDB("image")
    .then((file) => {
      fileToBase64(file!).then(
        (image) => {
          try {
            const data = JSON.parse(content);
            const dataWithImage = { ...data, image };
            const json = JSON.stringify(dataWithImage);
            exportContent(json);
          } catch (e) {
            exportContent(content);
          }
        },
        () => {
          exportContent(content);
        }
      );
    })
    .catch((e) => {
      console.error(e);
      exportContent(content);
    });
}

export function exportPNG(content: Blob, filename: string) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(content);
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportFile(content: string, filename: string, type: string) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([content], { type }));
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function importFromFile() {
  const input = document.createElement("input");
  const promise = parseSelectedFile(input);
  input.type = "file";
  input.accept = ".json";
  // document.body.appendChild(input);
  input.click();
  return promise.then((data) => {
    // document.body.removeChild(input);
    console.log(data);
    return data;
  });
}

function parseSelectedFile(input: HTMLInputElement): Promise<any> {
  return new Promise((resolve, reject) => {
    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const jsonContent = event.target?.result as string;
            resolve(jsonContent);
          } catch (error) {
            reject(error);
          }
        };
        reader.readAsText(file);
      } else {
        reject(new Error("No file selected."));
      }
    });
  });
}

export const stringifyData = (data: UserDataType) => {
  const {
    stations: stationsMap,
    lines: linesMap,
    title,
    backgroundColor,
    translateX,
    translateY,
    scale,
    opacity,
  } = data;
  const stations = mapToArr(stationsMap);
  const lines = mapToArr(linesMap);
  return JSON.stringify({
    stations,
    lines,
    title,
    backgroundColor,
    translateX,
    translateY,
    scale,
    opacity,
  });
};

export const setLocalStorage = (data: UserDataType, callback: Function) => {
  const last = localStorage.getItem("current");
  const current = localStorage.getItem("current");
  const latest = stringifyData(data);
  if (latest !== current) {
    if (current) {
      localStorage.setItem("last", current);
    }
    localStorage.setItem("current", latest);
    callback();
  }
};

export const getBoundary = (data: UserDataType) => {
  const { stations } = data;
  const allStationsList = mapToArr(stations);
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  allStationsList.forEach((station) => {
    const { position } = station;
    const [x, y] = position;
    minX = Math.min(x, minX);
    minY = Math.min(y, minY);
    maxX = Math.max(x, maxX);
    maxY = Math.max(y, maxY);
  });
  return { minX, minY, maxX, maxY };
};

export const mediateMap = (
  data: UserDataType,
  { setScale, setTranslateX, setTranslateY }: TransformProps
) => {
  const { minX, minY, maxX, maxY } = getBoundary(data);
  const width = maxX - minX;
  const height = maxY - minY;
  const { innerHeight, innerWidth } = window;
  let scale = 1,
    transformX = -minX,
    transformY = -minY;
  if (innerWidth > innerHeight) {
    const margin = innerWidth * 0.05;
    scale = (innerWidth - margin) / width;
    transformX = margin / 2 - minX * scale;
    transformY = (innerHeight - height * scale) / 2 - minY * scale;
  } else {
    const margin = innerHeight * 0.05;
    scale = (innerHeight - margin) / height;
    transformY = margin / 2 - minY * scale;
    transformX = (innerWidth - width * scale) / 2 - minX * scale;
  }

  // small size map
  if (scale > 1) {
    scale = 1;
    transformX = (innerWidth - width) / 2 - minX;
    transformY = (innerHeight - height) / 2 - minY;
  }
  setScale(scale);
  setTranslateX(transformX);
  setTranslateY(transformY);
};

export function importImage(): Promise<File | null> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        resolve(file);
      } else {
        resolve(null);
      }
    };
    input.click();
  });
}

interface TransformValues {
  translateX: number;
  translateY: number;
  scale: number;
}

export function calculateTransform(file: File): Promise<TransformValues> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    reader.onerror = (e) => {
      reject(e);
    };

    img.onload = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const imgWidth = img.width;
      const imgHeight = img.height;
      const imgAspectRatio = imgWidth / imgHeight;
      const screenAspectRatio = screenWidth / screenHeight;

      let scale: number;
      if (imgAspectRatio > screenAspectRatio) {
        // Image is wider than the screen
        scale = (screenWidth * 0.8) / imgWidth;
      } else {
        // Image is taller than the screen
        scale = (screenHeight * 0.8) / imgHeight;
      }

      const scaledWidth = imgWidth * scale;
      const scaledHeight = imgHeight * scale;

      const translateX = (screenWidth - scaledWidth) / 2;
      const translateY = (screenHeight - scaledHeight) / 2;

      resolve({ translateX, translateY, scale });
    };

    reader.readAsDataURL(file);
  });
}

export function storeFileInIndexedDB(
  file: File,
  customFileName: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("FileDatabase", 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("files")) {
        db.createObjectStore("files", { keyPath: "name" });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("files")) {
        db.close();
        indexedDB.deleteDatabase("FileDatabase").onsuccess = () => {
          storeFileInIndexedDB(file, customFileName).then(resolve).catch(reject);
        };
      } else {
        const transaction = db.transaction("files", "readwrite");
        const objectStore = transaction.objectStore("files");
        const fileRecord = {
          name: customFileName,
          content: file,
        };

        const addRequest = objectStore.put(fileRecord);

        addRequest.onsuccess = () => {
          resolve();
        };

        addRequest.onerror = (event) => {
          reject((event.target as IDBRequest).error);
        };
      }
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
}

export function readFileFromIndexedDB(fileName: string): Promise<File | null> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("FileDatabase", 1);

    request.onsuccess = (event) => {
      try {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction("files", "readonly");
        const objectStore = transaction.objectStore("files");
        const getRequest = objectStore.get(fileName);

        getRequest.onsuccess = (event) => {
          const result = (event.target as IDBRequest).result;
          if (result) {
            resolve(result.content);
          } else {
            resolve(null);
          }
        };

        getRequest.onerror = (event) => {
          reject((event.target as IDBRequest).error);
        };
      } catch (e) {
        console.error(e);
        reject(e);
      }
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
}

export function deleteFileFromIndexedDB(fileName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("FileDatabase", 1);

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("files", "readwrite");
      const objectStore = transaction.objectStore("files");
      const deleteRequest = objectStore.delete(fileName);

      deleteRequest.onsuccess = () => {
        resolve();
      };

      deleteRequest.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
}
