import React, { useState } from "react";
import { FaXbox, FaWindows, FaPlaystation } from "react-icons/fa";
import { IoThumbsUpSharp, IoThumbsDownSharp } from "react-icons/io5";
import { SiNintendoswitch } from "react-icons/si";
import { months } from "../data/months";
import { platforms } from "../data/platforms";
import { Button } from "@material-ui/core";
import ReactPlayer from "react-player";
import "../css/GamesList.css";
import { GamepadRounded } from "@material-ui/icons";

function GamesList({ games }) {
  console.log(games);
  const [currentHover, setCurrentHover] = useState(-1);
  const [playVideo, setPlayVideo] = useState(false);

  const onHoverHandler = (value) => {
    setCurrentHover(value);
    value === -1 ? setPlayVideo(false) : setPlayVideo(true);
  };

  if (games.length === 0) {
    return <div></div>;
  }

  return (
    <div className="games_list">
      <div className="games_list_container">
        {games.map((game, index) => {
          console.log("game", game);
          return (
            <div style={{ position: "relative" }}>
              <div
                className={`game_card ${
                  currentHover === index ? "show_more_container" : ""
                }`}
                onMouseEnter={() => onHoverHandler(index)}
                onMouseLeave={() => onHoverHandler(-1)}
              >
                <div
                  className="game_card_image_container"
                  onClick={() => {
                    setPlayVideo(!playVideo);
                  }}
                >
                  <div
                    className="video_player"
                    style={{ position: "relative" }}
                  >
                    <ReactPlayer
                      style={{
                        position: "absolute",
                        transition: "500ms",
                        borderTopLeftRadius: "1em",
                        borderTopRightRadius: "1em",
                      }}
                      width="100%"
                      height="auto"
                      loop
                      muted
                      fallback
                      playing={playVideo}
                      url={`${
                        currentHover === index && playVideo && game.clip.clip
                      }`}
                    />
                  </div>
                  <img src={game.background_image} alt="" />
                </div>
                <div className="game_card_info">
                  <div className="game_card_platforms">
                    {game.parent_platforms.map((platform) => {
                      let foundPlatform = platforms.find(
                        (element) =>
                          element === platform.platform.name.toLowerCase()
                      );

                      return (
                        foundPlatform && (
                          <div className="game_card_platform_image">
                            {foundPlatform === "xbox" && <FaXbox />}
                            {foundPlatform === "pc" && <FaWindows />}
                            {foundPlatform === "playstation" && (
                              <FaPlaystation />
                            )}
                            {foundPlatform === "nintendo" && (
                              <SiNintendoswitch />
                            )}
                          </div>
                        )
                      );
                    })}
                  </div>
                  <div className="game_card_title_wrapper">
                    <h3>{game.name}</h3>
                  </div>
                  <br></br>
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
                              <div className="row_element">
                                {game.metacritic} %
                              </div>
                            </div>
                          )}

                          <div className="game_card_table_row">
                            <div className="row_title">Release Date:</div>
                            <div className="row_element">
                              {
                                months[
                                  parseInt(game.released.split("-")[1]) - 1
                                ]
                              }
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GamesList;
