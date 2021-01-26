import React, { useState, useCallback, useEffect, useRef } from "react";
import { FaXbox, FaWindows, FaPlaystation } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";
import ReactPlayer from "react-player";
import debouce from "just-debounce-it";
import { months } from "../data/months";
import { platforms } from "../data/platforms";
import { Button } from "@material-ui/core";

function Gamecard({ game, index }) {
  const [show, setShow] = useState(false);
  const cardRef = useRef();

  const onChange = useCallback(
    debouce((entries, observer) => {
      const element = entries[0];
      if (element.isIntersecting) {
        setShow(true);
      } else {
        setShow(false);
      }
    }, 500),
    []
  );

  useEffect(function () {
    const observer = new IntersectionObserver(onChange, {
      rootMargin: "200px",
    });
    observer.observe(cardRef.current);

    return () => observer.disconnect();
  });

  const gameClip = game.clip;
  const [currentHover, setCurrentHover] = useState(-1);
  const [playVideo, setPlayVideo] = useState(false);
  const onHoverHandler = (value) => {
    setCurrentHover(value);
    value === -1 ? setPlayVideo(false) : setPlayVideo(true);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "block",
        height: index === currentHover && cardRef.current.clientHeight,
      }}
      key={index}
      ref={cardRef}
    >
      <div
        className={`game_card ${
          currentHover === index ? "show_more_container" : ""
        }`}
        onMouseEnter={() => onHoverHandler(index)}
        onMouseLeave={() => onHoverHandler(-1)}
      >
        <div>
          <div
            className="game_card_image_container"
            onClick={() => {
              setPlayVideo(!playVideo);
            }}
          >
            <div
              style={{
                height: "100%",
                position: "relative",
                paddingBottom: "56%",
              }}
            >
              <div
                className="video_player"
                style={{ position: "absolute", height: "100%" }}
              >
                <ReactPlayer
                  style={{
                    transition: "500ms",
                    borderTopLeftRadius: "1em",
                    borderTopRightRadius: "1em",
                  }}
                  width="100%"
                  height="auto"
                  loop
                  muted
                  playing={playVideo}
                  url={`${
                    currentHover === index &&
                    show &&
                    playVideo &&
                    gameClip !== null
                      ? gameClip.clip
                      : ""
                  }`}
                />
              </div>
              <div className="image_wrapper">
                {show ? <img src={game.background_image} alt="" /> : <></>}
              </div>
            </div>
          </div>
        </div>
        <div className="game_card_info">
          <div className="game_card_platforms">
            {game.parent_platforms.map((platform, index) => {
              const platformToShow = platform.platform.name.toLowerCase();
              return (
                <div className="game_card_platform_image" key={index}>
                  {platformToShow === "xbox" && <FaXbox />}
                  {platformToShow === "pc" && <FaWindows />}
                  {platformToShow === "playstation" && <FaPlaystation />}
                  {platformToShow === "nintendo" && <SiNintendoswitch />}
                </div>
              );
            })}
          </div>
          <div className="game_card_title_wrapper">
            <h3>{game.name}</h3>
          </div>

          {show && (
            <div className="game_card_more_container">
              <div
                className={`game_card_more_section ${
                  currentHover === index ? "show" : ""
                }`}
              >
                <div className="game_card_more_about_table">
                  <div className="game_card_table_row_container">
                    <div className="game_card_table_row">
                      <div className="row_title">Genres:</div>
                      {game.genres.map((genre, index) => (
                        <div className="row_element" key={index}>
                          {genre.name}
                          {index !== game.genres.length - 1 && ","}
                        </div>
                      ))}
                    </div>
                    {game.metacritic && (
                      <div className="game_card_table_row">
                        <div className="row_title">Metacritic:</div>
                        <div className="row_element">{game.metacritic} %</div>
                      </div>
                    )}

                    <div className="game_card_table_row">
                      <div className="row_title">Release Date:</div>
                      <div className="row_element">
                        {months[parseInt(game.released.split("-")[1]) - 1]}
                      </div>
                      <div className="row_element">
                        {game.released.split("-")[2]}
                      </div>
                      <div className="row_element">
                        ,{game.released.split("-")[0]}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  style={{ color: "white", marginTop: "0.5em" }}
                >
                  See More
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gamecard;
