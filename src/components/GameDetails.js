import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { CircularProgress, Divider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Stores from "./Stores";
import axios from "../axios";
import "../css/GameDetails.css";
import Gamemeta from "./Gamemeta";
import ScreenshotsSlider from "./ScreenshotsSlider";
import GamesList from "./GamesList";

const API_KEY = process.env.REACT_APP_GAME_RAWG_API_KEY;

function GameDetails() {
  const params = useParams();
  const { rawId } = params;
  const [primaryDetails, setPrimary] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [suggestedGames, setSuggestedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null);
  const [developer, setDeveloper] = useState("Not available");
  const [publisher, setPublisher] = useState("Not available");
  const [ageRating, setAgeRating] = useState("Not rated yet");
  const [metascore, setMetascore] = useState(null);
  const [website, setWebsite] = useState("");
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
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
                setScreenshots(response.data.results);
                axios
                  .get(`/games/${rawId}/suggested`, {
                    params: {
                      key: API_KEY,
                    },
                  })
                  .then((response) => {
                    setSuggestedGames(response.data.results);
                    console.log(response.data.results);
                    setLoading(false);
                  });
              });
          });
      }
    };
    fetchGameData();
  }, [params]);

  useEffect(() => {
    if (primaryDetails) {
      primaryDetails.rating && setRating(primaryDetails.rating);
      primaryDetails.released && setReleaseDate(primaryDetails.released);
      primaryDetails.developers.length > 0 &&
        setDeveloper(primaryDetails.developers[0].name);
      primaryDetails.publishers.length > 0 &&
        setPublisher(primaryDetails.publishers[0].name);
      primaryDetails.esrb_rating &&
        setAgeRating(primaryDetails.esrb_rating.name);
      primaryDetails.metacritic && setMetascore(primaryDetails.metacritic);
      primaryDetails.website && setWebsite(primaryDetails.website);
    }
  }, [primaryDetails]);

  useEffect(() => {
    setRating(null);
    setReleaseDate(null);
    setDeveloper("Not available");
    setPublisher("Not available");
    setAgeRating("Not available");
    setMetascore(null);
    setWebsite("");
  }, [params]);

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
      <div className="game_details_wrapper">
        <div className="game_title">
          <h1 style={{ fontWeight: "normal" }}>{primaryDetails.name}</h1>
        </div>
        <div className="game_details_screenshots">
          <ScreenshotsSlider screenshots={screenshots} />
        </div>
        <div className="game_details_right">
          <div className="game_details_main_image">
            <div className="main_image_container">
              <div className="main_image_wrapper">
                <img src={primaryDetails.background_image} alt="" />
              </div>
            </div>
          </div>

          <div>
            <Divider />
            <div
              style={{
                display: "flex",
                marginTop: "1em",
                padding: "0 1em 0 1em",
              }}
            >
              <p>Ratings:</p>
              <p style={{ marginLeft: "auto" }}>{`${
                rating ? `${rating}/5` : "Not rated yet"
              }`}</p>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                marginTop: "1em",
                padding: "0 1em 0 1em",
              }}
            >
              <p>Genres:</p>
              <div
                className="genres_wrapper"
                style={{ display: "flex", marginLeft: "auto" }}
              >
                {primaryDetails.genres.map((genre, index) => (
                  <p style={{ marginLeft: 4 }} key={index}>
                    {genre.name}
                    {index !== primaryDetails.genres.length - 1 && ","}
                  </p>
                ))}
              </div>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                marginTop: "1em",
                padding: "0 1em 0 1em",
              }}
            >
              <p>Release Date:</p>
              <p style={{ marginLeft: "auto" }}>
                {releaseDate
                  ? new Date(releaseDate).toDateString()
                  : "Unavailable"}
              </p>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                marginTop: "1em",
                padding: "0 1em 0 1em",
              }}
            >
              <p>Developer:</p>
              <p style={{ marginLeft: "auto" }}>{developer}</p>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                marginTop: "1em",
                padding: "0 1em 0 1em",
              }}
            >
              <p>Publisher:</p>
              <p style={{ marginLeft: "auto" }}>{publisher}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="game_details_info">
        <div className="game_details_main">
          {primaryDetails.description_raw && (
            <div className="game_details_description">
              {primaryDetails.description_raw
                .split("#")
                .map((section, index) => {
                  if (index > 0) {
                    return section.split("\n").map((text, i) => {
                      return i === 0 ? <h3>{text}</h3> : <p>{text}</p>;
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
          )}
        </div>
      </div>
      <div className="game_details_meta">
        <Gamemeta
          metaDetails={primaryDetails}
          metascore={metascore}
          releaseDate={releaseDate}
          publisher={publisher}
          website={website}
          ageRating={ageRating}
          developer={developer}
        />
        <Stores stores={primaryDetails.stores} />
      </div>
    </div>
  );
}

export default GameDetails;
