import React, { useEffect, useState } from "react";
import axios from "../axios";
import ImageSLider from "./ImageSlider";
import GamesList from "./GamesList";

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
        });
    }

    fetchData();
  }, []);

  return (
    <main>
      <ImageSLider games={trendingGames.slice(0, 7)} />
      <GamesList games={trendingGames} />
    </main>
  );
}

export default MainPage;
