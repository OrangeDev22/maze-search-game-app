import React, { useState, useCallback, useEffect } from "react";
import "../css/Screenshots.css";

const ScreenshotsSlider = ({ screenshots }) => {
  const [current, setCurrent] = useState(0);
  const [sliderTimeout, setSliderTimeout] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent(current === screenshots.length - 1 ? 0 : current + 1);
  }, [current, screenshots.length]);

  useEffect(() => {
    setSliderTimeout(
      setTimeout(function () {
        nextSlide();
      }, 5000)
    );

    return () => {
      clearTimeout(sliderTimeout);
      setSliderTimeout(null);
    };
  }, [current]);

  return (
    <div className="screenshot_slider" key="slider">
      <div className="screenshot_slider_wrapper">
        {screenshots &&
          screenshots.map((screenshot, index) => (
            <div
              className={`screenshot_slider_image_container ${
                index === current && "screenshot_active"
              } ${index !== current ? "hide" : ""}`}
              key={index}
            >
              <div className="screenshot_holder">
                <img
                  className={`screenshot_slider_image`}
                  src={screenshot.image}
                  alt=""
                />
              </div>
            </div>
          ))}
      </div>
      <div className="screenshots_preview_container">
        {screenshots.map((screenshot, index) => (
          <div
            className={`screenshot_preview_wrapper ${
              current === index ? "selected" : "unselected"
            }`}
            key={`screenshot_preview_${index}`}
            onClick={() => setCurrent(index)}
          >
            <img key={index} src={screenshot.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ScreenshotsSlider);
