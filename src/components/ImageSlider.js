import React, { useState, useCallback } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../css/Slider.css";
import { IconButton } from "@material-ui/core";
import { FaXbox, FaWindows, FaPlaystation } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";

const useStyles = makeStyles((theme) => ({
  selectedThumb: {
    background: theme.palette.secondary.main,
  },
}));

const ImageSlider = ({ games }) => {
  const [current, setCurrent] = useState(0);
  const classes = useStyles();

  const nextSlide = useCallback(() => {
    setCurrent(current === games.length - 1 ? 0 : current + 1);
  }, [current, games.length]);

  const prevSlide = useCallback(() => {
    setCurrent(current === 0 ? games.length - 1 : current - 1);
  }, [current, games.length]);

  return (
    <div className="slider" key="slider">
      <div className="slider_wrapper">
        <IconButton color="secondary" size="medium" onClick={prevSlide}>
          <ArrowBackIosIcon fontSize="large" />
        </IconButton>

        {games &&
          games.map((game, index) => (
            <Link
              to={`/games/${game.id}/${game.name}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div
                className={`slider_image_container ${
                  index === current && "active"
                } ${index !== current ? "hide" : ""}`}
                key={index}
              >
                <img
                  className={`slider_image`}
                  src={game.background_image}
                  alt=""
                />
                <div className="game_details_header">
                  <h2 className="game_title" style={{ marginBottom: "0.5em" }}>
                    {game.name}
                  </h2>
                  <div className="platforms_container">
                    {game.parent_platforms.map((platform) => {
                      const platformToShow = platform.platform.name.toLowerCase();
                      return (
                        <div className="platform_image">
                          {platformToShow === "xbox" && <FaXbox size={32} />}
                          {platformToShow === "pc" && <FaWindows size={32} />}
                          {platformToShow === "playstation" && (
                            <FaPlaystation size={32} />
                          )}
                          {platformToShow === "nintendo" && (
                            <SiNintendoswitch size={32} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        <IconButton color="secondary" size="medium" onClick={nextSlide}>
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      </div>
      <div className="slider_thumbs">
        {games.map((game, index) => (
          <div
            key={index}
            className={`slider_thumb ${
              index === current && classes.selectedThumb
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ImageSlider);
