import React, { useState, useCallback, useEffect, useRef } from "react";
import { FaXbox, FaWindows, FaPlaystation } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";
import ReactPlayer from "react-player";
import debouce from "just-debounce-it";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useGames } from "../contexts/GamesProvider";
import { useApp } from "../contexts/AppProvider";

function Gamecard({ game, index }) {
  const [show, setShow] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const cardRef = useRef();
  const gameClip = game.clip;
  const { setGames, setPage } = useGames();
  const [currentHover, setCurrentHover] = useState(-1);
  const [playVideo, setPlayVideo] = useState(false);
  const isMounted = useRef(null);
  const history = useHistory();
  const { screenWidth } = useApp();

  const onChange = useCallback(
    debouce((entries) => {
      const element = entries[0];
      if (element.isIntersecting && isMounted.current) {
        setShow(true);
      } else {
        setShow(false);
      }
    }, 500),
    []
  );

  const onHoverHandler = (value) => {
    if (screenWidth > 979) {
      setCurrentHover(value);
      value === -1 ? setPlayVideo(false) : setPlayVideo(true);
    }
  };

  useEffect(() => {
    screenWidth > 970 && setShowMore(false);
  }, [screenWidth]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });

  useEffect(function () {
    const observer = new IntersectionObserver(onChange, {
      rootMargin: "200px",
    });
    observer.observe(cardRef.current);

    return () => observer.disconnect();
  });

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
                  width="100%"
                  height="auto"
                  loop
                  muted
                  playing={playVideo}
                  url={`${playVideo && gameClip !== null ? gameClip.clip : ""}`}
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
          {showMore || screenWidth > 979 || (
            <div>
              <Button onClick={() => setShowMore(true)} size="small" fullWidth>
                View more
              </Button>
            </div>
          )}
          <div className="game_card_more_container">
            <div
              className={`game_card_more_section ${
                currentHover === index || showMore ? "show" : ""
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
                      <div className="row_element">
                        {game.metacritic
                          ? `${game.metacritic}%`
                          : "Not rated yet"}{" "}
                      </div>
                    </div>
                  )}

                  <div className="game_card_table_row">
                    <div className="row_title">Release Date:</div>
                    <div className="row_element">
                      {game.released
                        ? new Date(game.released).toDateString()
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
              {showMore && screenWidth < 980 && (
                <div>
                  <Button
                    onClick={() => setShowMore(false)}
                    size="small"
                    fullWidth
                  >
                    View less
                  </Button>
                </div>
              )}
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  setGames([]);
                  setPage(1);
                  history.push(`/games/${game.id}/${game.name}`);
                }}
                color="primary"
                style={{ color: "white", marginTop: "0.5em" }}
              >
                See More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gamecard;
