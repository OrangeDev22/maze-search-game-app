import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import Stores from "../components/Stores";
import axios from "../axios";
import "../css/GameDetails.css";
import Gamemeta from "../components/Gamemeta";
import ScreenshotsSlider from "../components/ScreenshotsSlider";
import GameAbout from "../components/GameAbout";
import GameDetailsCard from "../components/GameDetailsCard";

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
  const isMounted = useRef(null);
  const history = useHistory();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });

  useEffect(() => {
    setLoading(true);
    const fetchGameData = () => {
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
                })
                .finally(() => {
                  if (isMounted.current) {
                    setLoading(false);
                  }
                });
            });
        })
        .catch(() => history.push("/"));
    };
    fetchGameData();
    return () => {
      setRating(null);
      setReleaseDate(null);
      setDeveloper("Not available");
      setPublisher("Not available");
      setAgeRating("Not available");
      setMetascore(null);
      setWebsite("");
      setSuggestedGames(null);
    };
  }, [rawId, history]);

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

  if (loading) return <Loading />;
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
      <GameAbout about={primaryDetails.description_raw} />
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
        <Stores stores={primaryDetails.stores} gameId={rawId} />
      </div>
      {/* API End point only available for payed users */}
      {/* <div className="game_details_suggested_games">
        <div style={{ textAlign: "center", margin: "1em 0 1em 0" }}>
          <h2>Similar titles</h2>
        </div>
        {console.log("--suggestedGames", suggestedGames)}
        {suggestedGames && (
          <GamesList games={suggestedGames} disableFetchMore={true} />
        )}
      </div> */}
    </div>
  );
}

export default GameDetails;
