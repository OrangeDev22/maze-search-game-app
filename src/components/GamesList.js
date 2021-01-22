import React, { useState } from "react";
import { FaXbox, FaWindows, FaPlaystation } from "react-icons/fa";
import { IoThumbsUpSharp, IoThumbsDownSharp } from "react-icons/io5";
import { SiNintendoswitch } from "react-icons/si";
import { months } from "../data/months";
import { Button } from "@material-ui/core";
import "../css/GamesList.css";

function GamesList({ games }) {
  const [currentHover, setCurrentHover] = useState(-1);

  if (games.length === 0) {
    return <div></div>;
  }

  return (
    <div className="games_list">
      <div className="games_list_container">
        <div className="game_card">
          <div className="game_card_image_container">
            <img src={games[0].background_image} alt="" />
          </div>
          <div className="game_card_info">
            <div className="game_card_platforms">
              <div className="game_card_platform_image">
                <FaXbox />
              </div>
              <div className="game_card_platform_image">
                <FaWindows />{" "}
              </div>
              <div className="game_card_platform_image">
                <FaPlaystation />
              </div>
            </div>
            <div className="game_card_title_wrapper">
              <h3>{games[0].name}</h3>
            </div>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div
            className={`game_card ${
              currentHover === 1 ? "show_more_container" : ""
            }`}
            onMouseEnter={() => {
              setCurrentHover(1);
            }}
            onMouseLeave={() => {
              setCurrentHover(-1);
            }}
          >
            <div className="game_card_image_container">
              <img src={games[1].background_image} alt="" />
            </div>
            <div className="game_card_info">
              <div className="game_card_platforms">
                <div className="game_card_platform_image">
                  <FaXbox />
                </div>
                <div className="game_card_platform_image">
                  <FaWindows />{" "}
                </div>
                <div className="game_card_platform_image">
                  <FaPlaystation />
                </div>
              </div>
              <div className="game_card_title_wrapper">
                <h3>{games[1].name}</h3>
              </div>
              <br></br>
              <div className="game_card_more_container">
                <div
                  className={`game_card_more_section ${
                    currentHover === 1 ? "show" : ""
                  }`}
                >
                  <div className="game_card_more_about_table">
                    <div className="game_card_table_row_container">
                      <div className="game_card_table_row">
                        <div className="row_title">Genres:</div>
                        {games[1].genres.map((genre, index) => (
                          <div className="row_element" key={index}>
                            {genre.name}
                            {index !== games[1].genres.length - 1 && ","}
                          </div>
                        ))}
                      </div>
                      <div className="game_card_table_row">
                        <div className="row_title">Ratings:</div>

                        <div className="row_element">
                          <div className="ratings_positive">
                            <div className="positive_icon">
                              <IoThumbsUpSharp />
                            </div>
                            <div className="positive_percent">
                              {Math.round(
                                games[1].ratings[0].percent +
                                  games[1].ratings[1].percent
                              )}
                              %
                            </div>
                          </div>
                          <div className="ratings_negative">
                            <div className="negative_icon">
                              <IoThumbsDownSharp />
                            </div>
                            <div className="negative_percent">
                              {Math.round(
                                games[1].ratings[2].percent +
                                  games[1].ratings[3].percent
                              )}
                              %
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="game_card_table_row">
                        <div className="row_title">Release Date:</div>
                        <div className="row_element">
                          {
                            months[
                              parseInt(games[1].released.split("-")[1]) - 1
                            ]
                          }
                        </div>
                        <div className="row_element">
                          {games[1].released.split("-")[2]}
                        </div>
                        <div className="row_element">
                          ,{games[1].released.split("-")[0]}
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

        <div className="game_card">
          <div className="game_card_image_container">
            <img src={games[2].background_image} alt="" />
          </div>
          <div className="game_card_info">
            <div className="game_card_platforms">
              <div className="game_card_platform_image">
                <FaXbox />
              </div>
              <div className="game_card_platform_image">
                <FaWindows />{" "}
              </div>
              <div className="game_card_platform_image">
                <FaPlaystation />
              </div>
            </div>
            <div className="game_card_title_wrapper">
              <h3>{games[2].name}</h3>
            </div>
          </div>
        </div>

        <div className="game_card">
          <div className="game_card_image_container">
            <img src={games[3].background_image} alt="" />
          </div>
          <div className="game_card_info">
            <div className="game_card_platforms">
              <div className="game_card_platform_image">
                <FaXbox />
              </div>
              <div className="game_card_platform_image">
                <FaWindows />{" "}
              </div>
              <div className="game_card_platform_image">
                <FaPlaystation />
              </div>
            </div>
            <div className="game_card_title_wrapper">
              <h3>{games[3].name}</h3>
            </div>
          </div>
        </div>
        <div className="game_card">
          <div className="game_card_image_container">
            <img src={games[4].background_image} alt="" />
          </div>
          <div className="game_card_info">
            <div className="game_card_platforms">
              <div className="game_card_platform_image">
                <FaXbox />
              </div>
              <div className="game_card_platform_image">
                <FaWindows />{" "}
              </div>
              <div className="game_card_platform_image">
                <FaPlaystation />
              </div>
            </div>
            <div className="game_card_title_wrapper">
              <h3>{games[4].name}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamesList;
