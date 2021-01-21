import React, { useEffect, useState } from "react";
import axios from "../axios";
import ImageSLider from "./ImageSlider";

const API_KEY = process.env.REACT_APP_GAME_RAWG_API_KEY;

function MainPage() {
  const [trendingGames, setTrendingGames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      axios
        .get("/games/lists/main", {
          params: {
            ordering: "-relevance",
            discover: true,
            page_size: 12,
            key: API_KEY,
          },
        })
        .then((res) => {
          setTrendingGames(res.data.results);
          console.log(res);
        });
    }

    fetchData();
  }, []);

  return <ImageSLider games={trendingGames.slice(0, 7)} />;
}

export default MainPage;
