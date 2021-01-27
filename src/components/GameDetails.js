import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import ReactPlayer from "react-player";
import axios from "../axios";
import "../css/GameDetails.css";
import ScreenshotsSlider from "./ScreenshotsSlider";

const API_KEY = process.env.REACT_APP_GAME_RAWG_API_KEY;

function GameDetails() {
  const { rawId } = useParams();
  const [primaryDetails, setPrimary] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [currentScreenshot, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchGameData = () => {
      if (rawId) {
        axios
          .get(`/games/${rawId}`, {
            params: {
              key: API_KEY,
            },
          })
          .then((response) => {
            response.status === 200 && setPrimary(response.data);
            axios
              .get(`/games/${rawId}/screenshots`, {
                params: {
                  key: API_KEY,
                },
              })
              .then((response) => {
                setLoading(false);
                setScreenshots(response.data.results);
              });
          });
      }
    };
    fetchGameData();
  }, []);

  if (loading)
    return (
      <div
        className="circular_progress_wrapper"
        style={{ width: 77, height: 77, margin: "auto", marginTop: "2em" }}
      >
        <CircularProgress
          style={{ width: "100%", height: "100%", color: grey[700] }}
        />
      </div>
    );

  return (
    <div className="game_details">
      <div className="game_title">
        <h1>{primaryDetails.name}</h1>
      </div>
      <div className="game_media_wrapper">
        <div className="game_details_screenshots">
          <ScreenshotsSlider screenshots={screenshots} />
        </div>
      </div>

      <div className="game_details_scr">
        {/* <ReactPlayer width="100%"
        height="auto" loop muted>

        </ReactPlayer> */}
      </div>
      <div className="game_details_main">
        <div className="game_details_main_image">
          <div className="main_image_container">
            <div className="main_image_wrapper">
              <img src={primaryDetails.background_image} alt="" />
            </div>
          </div>
        </div>
        <div className="game_details_description">
          {primaryDetails.description_raw.split("###").map((section, index) => {
            if (index > 0) {
              return section.split("\n").map((text, index) => {
                return index === 0 ? <h3>{text}</h3> : <p>{text}</p>;
              });
            } else {
              return (
                <div className="game_details_about">
                  <h3>About</h3>
                  <p>{section}</p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
