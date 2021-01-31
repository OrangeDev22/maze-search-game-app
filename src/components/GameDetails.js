import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Stores from "./Stores";
import axios from "../axios";
import "../css/GameDetails.css";
import Gamemeta from "./Gamemeta";
import ScreenshotsSlider from "./ScreenshotsSlider";
import GamesList from "./GamesList";
import GameDetailsCard from "./GameDetailsCard";

const API_KEY = process.env.REACT_APP_GAME_RAWG_API_KEY;

function GameDetails() {
  const { rawId } = useParams();
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
                      page_size: 8,
                    },
                  })
                  .then((response) => {
                    setSuggestedGames(response.data.results);
                    setLoading(false);
                  });
              });
          });
      }
    };
    fetchGameData();
  }, [rawId]);

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
  }, [rawId]);

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
        <GameDetailsCard
          background_image={primaryDetails.background_image}
          rating={rating}
          genres={primaryDetails.genres}
          releaseDate={releaseDate}
          developer={developer}
          publisher={publisher}
        />
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
                      return i === 0 ? (
                        <h3 key={`game_details_about_title_${i}`}>{text}</h3>
                      ) : (
                        <p key={`game_details_about_text_${i}`}>{text}</p>
                      );
                    });
                  } else {
                    return (
                      <div
                        className="game_details_about"
                        key={`game_details_about_title_header_${index}`}
                      >
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
      <div className="game_details_suggested_games">
        <div style={{ textAlign: "center", margin: "1em 0 1em 0" }}>
          <h2>Similar titles</h2>
        </div>
        {suggestedGames && (
          <GamesList games={suggestedGames} inDetails={true} />
        )}
      </div>
    </div>
  );
}

export default GameDetails;
