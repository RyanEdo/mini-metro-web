import { driver as Driver, Config } from "driver.js";
export const showTour = async (id: string, callback: Function) => {
  const driver = Driver();
  const { getSteps } = await import(`./Steps/${id}`);
  const eventListeners: EventListenerOrEventListenerObject[] = [];
  const config: Config = {
    prevBtnText: "上一步",
    doneBtnText: "完成",
    nextBtnText: "下一步",
    progressText: "第{{current}}步，共{{total}}步",
    showProgress: true,
    allowClose: false,
    showButtons: ["close"],
    // onPrevClick:(ele)=>{
    //   if(ele){
    //     const element = ele as HTMLElement;
    //     eventListeners.forEach(listener=>{
    //       element.removeEventListener('click',listener);
    //     })
    //     driver.movePrevious();
    //   }
    // },
    onHighlighted: (ele, step, opt) => {
      const steps = opt.config.steps!;
      const last = step === steps[steps.length - 1];
      const next = steps[opt.state.activeIndex! + 1];
      const touch = window.ontouchend === null;
      const eventName = touch? "touchend": "click";
      if (ele) {
        const element = ele as HTMLElement;
        const moveToNext = () => {
          setTimeout(() => {
            if (!next || document.querySelector(next.element as string)) {
              element.removeEventListener(eventName, moveToNext);
              // element.removeEventListener("touchend",moveToNext);
              driver.moveNext();
            }
          }, 100);
        };
        eventListeners.push(moveToNext);
        element.addEventListener(eventName, moveToNext);
        // element.addEventListener("touchend", moveToNext);
      }
    },
    onNextClick: (ele) => {
      if (ele) {
        const element = ele as HTMLElement;
        element.dispatchEvent(
          new Event("click", { bubbles: true, cancelable: true })
        );
      }
    },
    steps: getSteps(driver),
    onDestroyed: (ele) => {
      if (ele) {
        const element = ele as HTMLElement;
        element.dispatchEvent(
          new Event("click", { bubbles: true, cancelable: true })
        );
      }
      callback()
    },
  };
  driver.setConfig(config);

  driver.drive();
};
