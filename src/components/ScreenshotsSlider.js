import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core";
import "../css/Screenshots.css";

const useStyles = makeStyles((theme) => ({
  selectedThumb: {
    background: theme.palette.secondary.main,
  },
}));

const ScreenshotsSlider = ({ screenshots }) => {
  const [current, setCurrent] = useState(0);
  const classes = useStyles();

  const nextSlide = useCallback(() => {
    setCurrent(current === screenshots.length - 1 ? 0 : current + 1);
  }, [current, screenshots.length]);

  const prevSlide = useCallback(() => {
    setCurrent(current === 0 ? screenshots.length - 1 : current - 1);
  }, [current, screenshots.length]);

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
