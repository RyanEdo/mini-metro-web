import React, {
  useState,
  useRef,
  useEffect,
  CSSProperties,
  useLayoutEffect,
} from "react";
import "./OpacityControl.scss";
import classNames from "classnames";
import { browserInfo } from "../../../Common/util";
interface OpacityControlProps {
  opacity: number;
  setOpacity: (value: number) => void;
}


const OpacityControl: React.FC<OpacityControlProps> = ({
  opacity,
  setOpacity,
}) => {
  const [showSlider, setShowSlider] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toolRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowSlider(!showSlider);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(Number(event.target.value));
  };

  useEffect(() => {
    if (showSlider && sliderRef.current && toolRef.current) {
      const toolRect =
      toolRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      if (toolRect.left + 230 > viewportWidth) {
        sliderRef.current.style.left = "unset";
        sliderRef.current.style.right = "0";
        (sliderRef.current.style as any)['--deg'] = "-25deg";
        sliderRef.current.style.transformOrigin = "100% 50%";
        toolRef.current.style.perspectiveOrigin = "100% 50%";
      } else {
        sliderRef.current.style.left = "0";
        sliderRef.current.style.transformOrigin = "0 50%";
        toolRef.current.style.perspectiveOrigin = "0 50%";
        (sliderRef.current.style as any)['--deg'] = "25deg";
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
      if (event.target !== inputRef.current && event.target !== toolRef.current) {
        console.log("focusout");
        setShowSlider(false);
      }
    };
    const resize = () => setShowSlider(false);
    document.addEventListener("touchstart", handleClickCapture, true);
    document.addEventListener("click", handleClickCapture, true);
    document.addEventListener("resize",resize);
    return () => {
      document.removeEventListener("touchstart", handleClickCapture, true);
      document.addEventListener("click", handleClickCapture, true);
      document.removeEventListener("resize",resize);
    };
  }, []);
  const { engine } = browserInfo;
  const safari = engine.name === "WebKit";
  return (
    <div className="tool" onClick={handleClick} ref={toolRef}>
      透明度
      {
        <div
          className={classNames({ "slider-container": 1, show: showSlider })}
          ref={sliderRef}
          onClick={(e) => e.stopPropagation()}
          style={{ "--value": opacity } as CSSProperties}
          onTransitionEnd={() => {
            if (showSlider && sliderRef.current) {
              sliderRef.current.style.transition = "none";
            }
          }}
        >
          <span
            className="opacity-text"
            style={{ "--value": opacity } as CSSProperties}
          >
            {Math.floor(opacity * 100)}
            <span>%</span>
          </span>
          <input
            ref={inputRef}
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={opacity}
            onChange={handleSliderChange}
            className="slider"
            onClick={(e) => e.stopPropagation()}
            style={{ "--value": opacity , "--safari": safari} as CSSProperties}
            onBlur={() => setShowSlider(false)}
          />
        </div>
      }
    </div>
  );
};

export default OpacityControl;
