import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import './OpacityControl.scss';
interface OpacityControlProps {
    opacity: number;
    setOpacity: (value: number) => void;
}

const OpacityControl: React.FC<OpacityControlProps> = ({ opacity, setOpacity }) => {
    const [showSlider, setShowSlider] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        setShowSlider(!showSlider);
    };

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOpacity(Number(event.target.value));
    };

    useEffect(() => {
        if (showSlider && sliderRef.current) {
            const sliderRect = sliderRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

            if (sliderRect.right > viewportWidth) {
               sliderRef.current.style.left = 'unset';
               sliderRef.current.style.right = '0';
               sliderRef.current.style.transformOrigin='100% 0'
            } else {
                sliderRef.current.style.left = '0';
                sliderRef.current.style.transformOrigin='0 0'
            }
        }
    }, [showSlider]);
    useEffect(() => {
        const handleClickCapture = (event: TouchEvent) => {
            if(event.target!==inputRef.current){
                console.log('focusout');
                setShowSlider(false);
            }
        };
        document.addEventListener('touchstart', handleClickCapture, true);
        return () => {
            document.removeEventListener('touchstart', handleClickCapture, true);
        };
    }, []);
    return (
        <div className="tool" onClick={handleClick}>
            透明度
            {showSlider && (
                <div className="slider-container" ref={sliderRef} onClick={e=>e.stopPropagation()} style={{'--value': opacity} as CSSProperties}>
                    <span className='opacity-text'  style={{'--value': opacity} as CSSProperties}>{Math.floor(opacity*100)}<span>%</span></span>
                    <input
                        ref={inputRef}
                        type="range"
                        min="0"
                        max="1"
                        step="0.001"
                        value={opacity}
                        onChange={handleSliderChange}
                        className="slider"
                        onClick={e=>e.stopPropagation()}
                        style={{'--value': opacity} as CSSProperties}
                        onBlur={()=>setShowSlider(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default OpacityControl;
