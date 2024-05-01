import { driver as Driver, Config } from "driver.js";
import { UserDataType } from "../Data/UserData";
export const showTour = (data: UserDataType) => {
  const driver = Driver();
  const onHighlightedForStation = (ele: Element|undefined)=>{
    const element = ele as HTMLElement;
    const moveToNext = () => {
      element.removeEventListener("click", moveToNext);
      setTimeout(() => {
        driver.moveNext();
      }, 100);
    };
    element.addEventListener("click", moveToNext);
  }
  const onNextClickForStation = (ele: Element|undefined, index: number)=>{
    const element = document.querySelector(
      `.station-trigger-descend-${index}`
    ) as HTMLElement;
    element.dispatchEvent(
      new Event("mousedown", { bubbles: true, cancelable: true })
    );
    setTimeout(() => {
      element.click();
    }, 100);
    setTimeout(() => {
      driver.moveNext();
    }, 200);
    setTimeout(() => {
      element.dispatchEvent(
        new Event("mouseup", { bubbles: true, cancelable: true })
      );
    }, 200);
  }
  const config: Config = {
    prevBtnText: "上一步",
    doneBtnText: "完成",
    nextBtnText: "下一步",
    progressText: "第{{current}}步，共{{total}}步",
    showProgress: true,
    allowClose: false,
    onHighlighted: (ele, step) => {
      if (ele) {
        const element = ele as HTMLElement;
        const moveToNext = () => {
          element.removeEventListener("click", moveToNext);
          driver.moveNext();
        };
        element.addEventListener("click", moveToNext);
      }
    },
    onNextClick: (ele) => {
      if (ele) {
        const element = ele as HTMLElement;
        element.click();
        element.dispatchEvent(
          new Event("click", { bubbles: true, cancelable: true })
        );
      }
    },
    steps: [
      {
        element: ".title .click-panel",
        popover: { title: "打开菜单", description: "点击标题打开菜单" },
      },
      {
        element: "#menu-add-station",
        popover: { title: "点击添加站点", description: "进入添加站点模式" },
      },
      {
        element: ".ScaleLayer",
        onHighlighted: () => {},
        popover: {
          title: "点击任意空白处添加站点",
          description: "添加好之后点击下一步",
          onNextClick: () => {
            driver.moveNext();
          },
        },
      },
      {
        element: "#add-station-finish-btn",
        popover: { title: "点击完成", description: "退出编辑模式" },
      },
      {
        element: ".station-descend-1",
        onHighlighted: onHighlightedForStation,
        popover: {
          title: "点击刚才创建的站点",
          description: "打开站点信息卡片",
          onNextClick: (ele) => {onNextClickForStation(ele,1)
          },
        },
      },
      {
        element: ".station-card-operation",
        onHighlighted: (ele) => {
          const element = ele as HTMLElement;
          const moveToNext = () => {
            element.removeEventListener("click", moveToNext);
            setTimeout(() => {
              driver.moveNext();
            }, 100);
          };
          element.addEventListener("click", moveToNext);
        },
        popover: { title: "点击操作选项卡", description: "我们来添加线路" },
      },
      {
        element: ".add-new-line-btn",
        popover: { title: "以此为起点新建线路", description: "进入添加线路模式" },
      },
      {
        element: ".station-descend-2",
        onHighlighted: onHighlightedForStation,
        popover: {
          title: "点击站点",
          description: "连接站点",
          onNextClick: (ele) => {onNextClickForStation(ele,2)
          },
        },
      },
      {
        element: ".station-descend-3",
        onHighlighted: onHighlightedForStation,
        popover: {
          title: "点击站点",
          description: "连接站点",
          onNextClick: (ele) => {onNextClickForStation(ele,3)
          },
        },
      },
      {
        element: "#add-line-finish-btn",
        popover: { title: "点击完成", description: "线路就创建好了" },
      },
    ],
  };
  driver.setConfig(config);

  driver.drive();
};
