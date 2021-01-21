import React, { useState } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/Slider.css";
import { IconButton } from "@material-ui/core";
import { platforms } from "../data/platforms";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FaXbox, FaWindows, FaPlaystation } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";

const ImageSlider = React.memo(({ games }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === games.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? games.length - 1 : current - 1);
  };

  console.log(games);

  return (
    <div className="slider">
      <div className="slider_wrapper">
        <IconButton color="primary" size="medium" onClick={prevSlide}>
          <ArrowBackIosIcon fontSize="large" />
        </IconButton>

        {games &&
          games.map((game, index) => (
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
                    console.log("PLATFORM NAME", platform.platform.name);
                    let foundPlatform = platforms.find(
                      (element) =>
                        element === platform.platform.name.toLowerCase()
                    );

                    return (
                      foundPlatform && (
                        <div className="platform_image">
                          {foundPlatform === "xbox" && <FaXbox size={32} />}
                          {foundPlatform === "pc" && <FaWindows size={32} />}
                          {foundPlatform === "playstation" && (
                            <FaPlaystation size={32} />
                          )}
                          {foundPlatform === "nintendo" && (
                            <SiNintendoswitch size={32} />
                          )}
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        <IconButton color="primary" size="medium" onClick={nextSlide}>
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      </div>
      <div className="slider_thumbs">
        {games.map((game, index) => (
          <div
            className={`slider_thumb ${index === current && "thumb_selected"}`}
          ></div>
        ))}
      </div>
    </div>
  );
});

export default ImageSlider;
