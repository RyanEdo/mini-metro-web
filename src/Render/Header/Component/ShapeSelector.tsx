import React, {
  useState,
  useRef,
  useEffect,
  CSSProperties,
  useLayoutEffect,
  SetStateAction,
  Dispatch,
} from "react";
import "./ShapeSelector.scss";
import classNames from "classnames";
import { browserInfo } from "../../../Common/util";
import shapes from "../../../Resource/Shape/shape";
import { Shape } from "../../../Data/Shape";
interface OpacityControlProps {
  defaultShape: string;
  setDefaultShape: Dispatch<SetStateAction<string>>;
}

const ShapeSelector: React.FC<OpacityControlProps> = ({
  defaultShape,
  setDefaultShape,
}) => {
  const [showSlider, setShowSlider] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const toolRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowSlider(!showSlider);
  };

  useEffect(() => {
    if (showSlider && sliderRef.current && toolRef.current) {
      const toolRect = toolRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      if (toolRect.left + 230 > viewportWidth) {
        sliderRef.current.style.left = "unset";
        sliderRef.current.style.right = "0";
        (sliderRef.current.style as any)["--deg"] = "-25deg";
        sliderRef.current.style.transformOrigin = "100% 50%";
        toolRef.current.style.perspectiveOrigin = "100% 50%";
      } else {
        sliderRef.current.style.left = "0";
        sliderRef.current.style.transformOrigin = "0 50%";
        toolRef.current.style.perspectiveOrigin = "0 50%";
        (sliderRef.current.style as any)["--deg"] = "25deg";
      }
    }
  }, [showSlider]);
  useLayoutEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = "0.3s ease-in-out";
    }
  }, [showSlider]);
  useEffect(() => {
    const handleClickCapture = (event: TouchEvent | MouseEvent) => {
      if (!toolRef.current?.contains(event.target as Node)) {
        console.log("focusout");
        setShowSlider(false);
      }
    };
    const resize = () => setShowSlider(false);
    document.addEventListener("touchstart", handleClickCapture, true);
    document.addEventListener("click", handleClickCapture, true);
    document.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("touchstart", handleClickCapture, true);
      document.addEventListener("click", handleClickCapture, true);
      document.removeEventListener("resize", resize);
    };
  }, []);
  const { engine } = browserInfo;
  const safari = engine.name === "WebKit";
  const column = 4;
  const row = 3;
  const grid = new Array(column * row).fill(0);
  Object.keys(shapes).forEach((shape, index) => (grid[index] = shape));
  return (
    <div className="tool" onClick={handleClick} ref={toolRef}>
      {
        //@ts-ignore
        Shape[defaultShape]
      }
      {
        <div
          className={classNames({ "shape-selector-container": 1, show: showSlider })}
          ref={sliderRef}
          onClick={(e) => e.stopPropagation()}
          style={{} as CSSProperties}
          onTransitionEnd={() => {
            if (showSlider && sliderRef.current) {
              sliderRef.current.style.transition = "none";
            }
          }}
        >
          <div className="color-detail">
            <div className="color-detail-choosing">
              {grid.map((shape, index) => {
                const left = index % column === 0;
                const bottom = Math.floor(index / column) === row - 1;
                // console.log({ shape });
                return (
                  <div
                    className={classNames({
                      "shape-container": 1,
                      left,
                      bottom,
                    })}
                    onClick={() => {
                      if (shape) setDefaultShape(shape);
                    }}
                  >
                    <div
                      className={classNames({
                        "shape-preview": 1,
                        "shape-selected": shape === defaultShape,
                        [shape]: 1,
                      })}
                    >
                      {
                        //@ts-ignore
                        shapes[shape]
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ShapeSelector;
