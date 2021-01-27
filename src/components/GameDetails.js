import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import axios from "../axios";

const API_KEY = process.env.REACT_APP_GAME_RAWG_API_KEY;

function GameDetails() {
  const { rawId } = useParams();
  const [primaryDetails, setPrimary] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
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
    <div>
      <h1>
        Games {primaryDetails && primaryDetails.name} {rawId}
      </h1>
    </div>
  );
}

export default GameDetails;
